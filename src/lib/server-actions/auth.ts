"use server";

import * as bcrypt from "bcrypt";
import {
  emailRegisterFormValues,
  emailRegisterSchema,
  emailSchema,
  usernameSchema,
} from "@/types/schemas/auth";
import { z } from "zod";
import { serverSession } from "../auth";
import {
  getUserFromEmail,
  getUserFromUsername,
  isUsernameOnCooldown,
} from "../database/user";
import { serverActionError } from "../utils/misc";
import { db } from "../db";
import { generateNewOTP } from "../database/otp-token";
import OTPType from "../enums/otp-type";

export async function sa_isUsernameAvailable({
  rawUsername,
}: {
  rawUsername: string;
}) {
  try {
    const username = usernameSchema.parse(rawUsername);

    // Check user table, include names on cooldown
    const u = await getUserFromUsername(username);
    if (u !== null) return { code: 200, data: { isAvailable: false } };

    const onCooldown = await isUsernameOnCooldown(username);
    return { code: 200, data: { isAvailable: !onCooldown } };
  } catch (ex) {
    if (ex instanceof z.ZodError) {
      console.log(ex);
      return {
        code: 400,
        error: "Bad request, username does not meet requirements",
      };
    }
    console.error(ex);
    return { code: 500, error: "Internal server error" };
  }
}

export async function sa_isEmailAvailable({ rawEmail }: { rawEmail: string }) {
  try {
    const email = emailSchema.parse(rawEmail);

    // Check user table, include names on cooldown
    const u = await getUserFromEmail(email);

    return { code: 200, data: { isAvailable: u === null } };
  } catch (ex) {
    if (ex instanceof z.ZodError) {
      console.log(ex);
      return {
        code: 400,
        error: "Bad request, email does not meet requirements",
      };
    }
    console.error(ex);
    return { code: 500, error: "Internal server error" };
  }
}

export async function sa_registerAccountWithEmail(
  values: emailRegisterFormValues
) {
  try {
    const session = await serverSession();
    if (session) throw serverActionError("Forbidden", 403);

    const { username, email, dob, password, confirmPassword } =
      emailRegisterSchema.parse(values);

    // Check the email and username for existing
    // TODO - check username cooldown list
    const usernameUser = await getUserFromUsername(username);
    const emailUser = await getUserFromEmail(email);
    if (usernameUser !== null)
      throw serverActionError("Bad Request: username already exists", 400);
    if (emailUser !== null)
      throw serverActionError("Bad Request: email already exists", 400);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        dob,
      },
    });

    // Set Password into database for the user
    await db.userProvider.create({
      data: {
        providerType: "PASSWORD",
        providerToken: await bcrypt.hash(password, 10),
        userid: newUser.id,
      },
    });

    // Generate OTP to verify email
    const OTPTokens = await generateNewOTP(
      newUser.id,
      OTPType.EMAIL_VALIDATION
    );
  } catch (ex) {
    if (ex instanceof z.ZodError)
      throw serverActionError("Bad Request: values did not match schema", 400);
    console.error(ex);
    throw serverActionError("Internal server error", 500);
  }
}
