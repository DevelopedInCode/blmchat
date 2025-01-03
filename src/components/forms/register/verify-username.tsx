"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VerifyTextInput } from "@/components/ui/verify-text-input";
import { useDebounceCallback } from "@/hooks/debounce";
import { sa_isUsernameAvailable } from "@/lib/server-actions/auth";
import { preventEnterAction } from "@/lib/utils/form";
import { Delay } from "@/lib/utils/misc";
import { USERNAME_REGEX, usernameSchema } from "@/types/schemas/auth";
import { Ban, CircleCheckBig, CircleX, Loader } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

enum UState {
  PENDING = "pending",
  TAKEN = "taken",
  VALID = "valid",
}

interface VerifyUsernameInput {
  currentUsernameCache: string | null;
  updateUsername?: (username: string | null) => void;
}

export function VerifyUsernameInput({
  currentUsernameCache,
  updateUsername,
}: VerifyUsernameInput) {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const verifyUsername = useCallback(async (newUsername: string) => {
    try {
      const username = usernameSchema.parse(newUsername);

      const result = await sa_isUsernameAvailable({ rawUsername: username });

      if (result.code === 200 && result.data) {
        setIsAvailable(result.data.isAvailable);
        if (result.data.isAvailable) {
          updateUsername?.(username);
        } else {
          updateUsername?.(null);
        }
        return result.data.isAvailable;
      }
      console.error(result);
      updateUsername?.(null);
      setIsAvailable(false);
      return false;
    } catch (ex) {
      if (ex instanceof z.ZodError) {
        setIsAvailable(false);
        updateUsername?.(null);
        return false;
      }
      console.error(ex);
      setIsAvailable(false);
      updateUsername?.(null);
      return false;
    }
  }, []);

  return (
    <div className="col-span-full pb-4 border-b-2 border-b-accent">
      <Label htmlFor="register-form-username">Find a username:</Label>
      <VerifyTextInput
        type="text"
        id="register-form-username"
        placeholder="your_next_awesome_name"
        disableEnter
        verify={verifyUsername}
      />
      {!isAvailable && currentUsernameCache !== null && (
        <p className="mt-1 font-primary-desc text-xs text-center text-red-500">
          Username is unavailable
        </p>
      )}
    </div>
  );
}
