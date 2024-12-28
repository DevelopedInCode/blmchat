"use client";

import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input } from "./input";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils/misc";
import { Check, CircleCheck, CircleX, Eye, EyeClosed, X } from "lucide-react";
import { add as addDate, isAfter as dateAfter, isAfter } from "date-fns";
import { ValidatePasswordRequirements } from "@/types/schemas/auth";

interface PasswordInputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "type"> {
  divClassName?: ClassValue;
  validatePassword?: boolean;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    { validatePassword = false, divClassName, onBlur, onChange, ...props },
    outerRef
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const cooldownDate = useRef<Date>(new Date());
    const [password, setPassword] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useImperativeHandle(outerRef, () => innerRef.current!, []);

    const togglePasswordView = useCallback(() => {
      if (!innerRef.current) return;
      const cursorPos = innerRef.current.selectionStart;
      const cursorPosEnd = innerRef.current.selectionEnd;
      setIsVisible((cur) => !cur);
      cooldownDate.current = addDate(new Date(), { seconds: 1 });
      setTimeout(() => {
        if (!innerRef.current) {
          console.log("No Ref on refocus");
          return;
        }
        innerRef.current.focus();
        innerRef.current.setSelectionRange(cursorPos, cursorPosEnd);
      }, 0);
    }, []);

    const passwordReqs = ValidatePasswordRequirements(password);
    const isPasswordValid =
      passwordReqs.hasUpper &&
      passwordReqs.hasLower &&
      passwordReqs.hasNumber &&
      passwordReqs.hasSpecial &&
      passwordReqs.validLengthAndChars;

    return (
      <div className={cn("relative w-full", divClassName)}>
        <Input
          {...props}
          ref={innerRef}
          type={isVisible ? "text" : "password"}
          onBlur={(e) => {
            if (!isAfter(new Date(), cooldownDate.current)) {
              e.preventDefault();
              e.stopPropagation();
              e.target.focus();
              return;
            }
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={(e) => setIsFocused(true)}
          onChange={(e) => {
            setPassword(e.target.value);
            onChange?.(e);
          }}
        />
        <span
          className="absolute right-6 top-0 translate-y-[75%] text-primary/30 hover:text-primary/50"
          onClick={(e) => {
            togglePasswordView();
          }}
        >
          {isVisible ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeClosed className="w-4 h-4" />
          )}
        </span>
        <div
          className={cn(
            "bg-accent my-2 p-2 shadow rounded space-y-2 transition-all duration-700 ease-in-out",
            !validatePassword && "hidden"
          )}
        >
          <div
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden",
              isFocused ? "max-h-[600px]" : "max-h-0"
            )}
          >
            <p className="text-center font-bold">Password criteria</p>
            <div className="w-fit mx-auto">
              <div className="flex items-center gap-x-2">
                {passwordReqs.hasUpper ? (
                  <Check className="w-4 h-4 text-green-700" />
                ) : (
                  <X className="w-4 h-4 text-red-700" />
                )}
                <p>Contain one uppercase letter</p>
              </div>
              <div className="flex items-center gap-x-2">
                {passwordReqs.hasLower ? (
                  <Check className="w-4 h-4 text-green-700" />
                ) : (
                  <X className="w-4 h-4 text-red-700" />
                )}
                <p>Contain one lowercase letter</p>
              </div>
              <div className="flex items-center gap-x-2">
                {passwordReqs.hasNumber ? (
                  <Check className="w-4 h-4 text-green-700" />
                ) : (
                  <X className="w-4 h-4 text-red-700" />
                )}
                <p>Contain one number</p>
              </div>
              <div className="flex items-center gap-x-2">
                {passwordReqs.hasSpecial ? (
                  <Check className="w-4 h-4 text-green-700" />
                ) : (
                  <X className="w-4 h-4 text-red-700" />
                )}
                <p>Contain one special character (@$!%*?&)</p>
              </div>
              <div className="flex items-center gap-x-2">
                {passwordReqs.validLengthAndChars ? (
                  <Check className="w-4 h-4 text-green-700" />
                ) : (
                  <X className="w-4 h-4 text-red-700" />
                )}
                <p>Between 8 and 120 characters</p>
              </div>
            </div>
          </div>
          <p
            className={cn(
              "flex items-center justify-center gap-x-2 text-xs text-center text-green-700",
              isPasswordValid && !isFocused ? "flex" : "hidden"
            )}
          >
            <CircleCheck className="w-4 h-4" />
            <span>Password meets criteria!</span>
          </p>
          <p
            className={cn(
              "flex items-center justify-center gap-x-2 text-xs text-center text-red-700",
              !isPasswordValid && !isFocused ? "flex" : "hidden"
            )}
          >
            <CircleX className="w-4 h-4" />
            <span>Password does not meets criteria!</span>
          </p>
        </div>
      </div>
    );
  }
);
