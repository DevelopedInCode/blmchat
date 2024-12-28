import * as React from "react";

import { cn } from "@/lib/utils/misc";

export interface InputProps extends React.ComponentProps<"input"> {
  /**
   * Disables the default action of "Enter"
   */
  disableEnter?: boolean;
  /**
   * The formRef to submit when the user hits "Enter"
   * @requires disableEnter to be true, and the form will be submitted without triggering "onKeyDown"
   */
  formRef?: React.RefObject<HTMLFormElement> | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      autoComplete = "off",
      disableEnter = false,
      formRef,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const keyDownHandler = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disableEnter && e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          if (formRef && formRef.current) {
            formRef.current.requestSubmit();
          }
          return;
        }
        onKeyDown?.(e);
      },
      [disableEnter, formRef, onKeyDown]
    );
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        autoComplete={autoComplete}
        onKeyDown={keyDownHandler}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
