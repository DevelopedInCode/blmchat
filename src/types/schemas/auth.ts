import { sub } from "date-fns";
import { z } from "zod";

export const USERNAME_REGEX = /^[a-zA-Z0-9_!$-]+$/;
export const UPPERCASE_REGEX = /^(?=.*[A-Z]).{1,}$/;
export const LOWERCASE_REGEX = /^(?=.*[a-z]).{1,}$/;
export const NUMBER_REGEX = /^(?=.*[\d]).{1,}$/;
export const SPECIAL_REGEX = /^(?=.*[@$!%*?&]).{1,}$/;
export const PASSWORD_ALLOWED_REGEX = /[A-Za-z\d@$!%*?&]{8,120}/;

export function ValidatePasswordRequirements(password: string) {
  return {
    hasUpper: UPPERCASE_REGEX.test(password),
    hasLower: LOWERCASE_REGEX.test(password),
    hasNumber: NUMBER_REGEX.test(password),
    hasSpecial: SPECIAL_REGEX.test(password),
    validLengthAndChars: PASSWORD_ALLOWED_REGEX.test(password),
  };
}

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(64, "Username cannot be longer than 64 characters")
  .refine((val) => USERNAME_REGEX.test(val), {
    message: "Usernames can only contain letters, numbers and _!$-",
  });

export const emailSchema = z.string().email("You must enter a valid email");

export const dateOfBirthSchema = z
  .date()
  .min(sub(new Date(), { years: 200 }))
  .max(sub(new Date(), { years: 13, days: 1 }));

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(120, "Password cannot be longer than 120 characters");

export const emailRegisterSchema = z
  .object({
    username: usernameSchema,
    email: emailSchema,
    dob: dateOfBirthSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    const vals = ValidatePasswordRequirements(password);

    if (!vals.hasUpper)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain an uppercase letter",
      });

    if (!vals.hasLower)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain a lowercase letter",
      });

    if (!vals.hasNumber)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain a number",
      });

    if (!vals.hasSpecial)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must contain a special character: @$!%*?&",
      });

    if (!vals.validLengthAndChars)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message:
          "Password must use letters, numbers, or special characters @$!%*?&",
      });

    if (password !== confirmPassword)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Both passwords must match!",
      });
  });
export type emailRegisterFormValues = z.infer<typeof emailRegisterSchema>;
