import { isAfter as isDateAfter } from "date-fns";
import { db } from "../db";

type userIncludeType = Parameters<typeof db.user.findUnique>[0]["include"];

export async function getUserFromDBID(
  userId: string,
  include?: userIncludeType
) {
  return await db.user.findUnique({ where: { id: userId }, include });
}

export async function getUserFromUsername(
  username: string,
  include?: userIncludeType
) {
  return await db.user.findUnique({ where: { username }, include });
}

export async function getUserFromEmail(
  email: string,
  include?: userIncludeType
) {
  return await db.user.findUnique({ where: { email }, include });
}

export async function isUsernameOnCooldown(username: string) {
  const res = await db.usernameCooldown.findUnique({ where: { username } });

  if (res) {
    if (isDateAfter(new Date(), res.expiresAt)) {
      // Remove the expired cooldown
      await db.usernameCooldown.delete({ where: { id: res.id } });
      return false;
    } else {
      return true;
    }
  }
  return false;
}
