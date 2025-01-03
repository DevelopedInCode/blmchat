import bcrypt from "bcrypt";
import crypto from "crypto";
import OTPType from "../enums/otp-type";
import chalk from "chalk";
import { db } from "../db";
import { getUserFromDBID } from "./user";
import { serverActionError } from "../utils/misc";
import { Clamp } from "../utils/math";
import { serverSession } from "../auth";

interface OTPOptions {
  /**
   * The duration after creation that the OTP will remain active
   */
  duration: number;
  /**
   * The length to make the OTP token.
   * This token size has a min of 4 and max of 20 (Default 6)
   */
  otpLength: number;
  /**
   * A string to attach to the front of the OTP token (Default is unset)
   */
  prefix?: string;
}
type ExtraOTPOptions = Partial<OTPOptions>;
type OTPOptionName = keyof OTPOptions;

const DefaultOTPOptions: OTPOptions = {
  duration: 5,
  otpLength: 6,
};

/**
 * Generates a new OTP token with crypto
 * This function WILL NOT add the token to the database
 *
 * @param length The length to make the OTP codes (global min is 4, max is 20)
 * @returns List of various for to use the OTP
 */
function GenerateOTPToken(length: number = 6) {
  length = Clamp(length, 4, 20);

  const multiplier = 10 ** (length - 1);
  const minValue = multiplier;
  const maxValue = multiplier * 9;

  const NumberToken = crypto.randomInt(minValue, maxValue);

  const OTPTokenVariation = {
    token: NumberToken.toString(),
    numToken: NumberToken,
    formatted: formatOTPToken(NumberToken.toString()),
  };

  return OTPTokenVariation;
}

/**
 * Handles the generation of new OTP Tokens and saves them into the
 * database to cross-check later
 *
 * @param userId User database ID to generate the OTP token for
 * @param tokenType The type of action that will be performed as a result
 * @param options Optional options that override default functionality. Anything not set will inherit from default options
 */
export async function generateNewOTP(
  userId: string,
  tokenType: OTPType,
  options: ExtraOTPOptions = {}
) {
  // Check session and ensure those logged in are only creating OTPs for themselves
  const session = await serverSession();
  if (session !== null) {
    if (userId !== session.user.id)
      throw serverActionError(
        "Forbidden. You may not create OTP tokens for another user",
        403
      );
  }

  // Overrite unset settings passed with default settings
  const compiledOptions = {
    ...options,
    ...DefaultOTPOptions,
  };

  // Verify the userID passed from client is valid
  const user = await getUserFromDBID(userId);
  if (user === null)
    throw serverActionError("Bad Request: No user at passed user id", 400);

  // Generate the OTP using config settings
  const OTPTokenStyles = GenerateOTPToken(compiledOptions.otpLength);
  console.log(
    chalk.green(`:: OTP TOKEN GENERATED :: ${OTPTokenStyles.formatted}`)
  );

  // Disable any active OTPs of the same type
  await db.oTPCode.updateMany({
    where: { userid: userId, otpType: tokenType, isActive: true },
    data: { isActive: false },
  });

  // Store OTP token in the database
  await db.oTPCode.create({
    data: {
      otpType: tokenType,
      userid: userId,
      otpHash: await bcrypt.hash(OTPTokenStyles.token, 10),
      expiresAt: new Date(),
    },
  });

  // Return the token styles for further processing
  return OTPTokenStyles;
}

export function formatOTPToken(token: string, splitSize: number = 3) {
  return token.substring(0, 3) + "-" + token.substring(3);
}
