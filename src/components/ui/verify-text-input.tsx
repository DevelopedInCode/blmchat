"use client";

import { useDebounceCallback } from "@/hooks/debounce";
import { Input, InputProps } from "./input";
import { ChangeEvent, useState } from "react";
import { CircleCheck, CircleX, Loader, LucideIcon } from "lucide-react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils/misc";

interface VerifyTextInputProps extends Omit<InputProps, "type"> {
  type: "text" | "email";
  /**
   * This function verifys the value and updates visual components from displaying.
   * This will not stop the form submitting if the user does not have a correct value.
   * @param newValue The value the user has in the input box
   * @returns if the text is valid
   */
  verify: (newValue: string) => boolean | Promise<boolean>;

  defaultVerified?: boolean;
  loadingIcon?: LucideIcon;
  loadingClassName?: ClassValue;
  invalidIcon?: LucideIcon;
  invalidClassName?: ClassValue;
  validIcon?: LucideIcon;
  validClassName?: ClassValue;

  parentClassName?: ClassValue;
}

export function VerifyTextInput({
  className,
  defaultVerified = false,
  invalidIcon: InvalidIcon = CircleX,
  invalidClassName,
  loadingIcon: LoadingIcon = Loader,
  loadingClassName,
  onChange,
  parentClassName,
  verify,
  validIcon: ValidIcon = CircleCheck,
  validClassName,
  ...props
}: VerifyTextInputProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(defaultVerified);

  const updateValue = useDebounceCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      const isVerified = await verify(e.target.value);
      setVerified(isVerified);
      setLoading(false);
    },
    500
  );

  return (
    <div className={cn("flex items-center gap-x-2", parentClassName)}>
      <Input
        {...props}
        onChange={(e) => {
          onChange?.(e);
          updateValue(e);
        }}
        className={cn("flex-1", className)}
      />
      {loading ? (
        <LoadingIcon
          className={cn(
            "w-4 h-4 animate-slowspin text-gray-400",
            loadingClassName
          )}
        />
      ) : verified ? (
        <ValidIcon className={cn("w-4 h-4 text-green-500", validClassName)} />
      ) : (
        <InvalidIcon className={cn("w-4 h-4 text-red-500", invalidClassName)} />
      )}
    </div>
  );
}
