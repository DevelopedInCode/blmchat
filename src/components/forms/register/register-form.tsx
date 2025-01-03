"use client";

import { useState } from "react";
import { RegisterEmailForm } from "./register-email-form";
import { VerifyUsernameInput } from "./verify-username";

export function RegisterForm() {
  const [usernameSelected, onUsernameUpdate] = useState<string | null>(null);

  return (
    <>
      <VerifyUsernameInput
        currentUsernameCache={usernameSelected}
        updateUsername={onUsernameUpdate}
      />
      <RegisterEmailForm validUsername={usernameSelected} />
    </>
  );
}
