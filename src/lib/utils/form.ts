import { KeyboardEvent } from "react";

export function preventEnterAction<T = HTMLInputElement>(action?: () => void) {
  return (e: KeyboardEvent<T>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      action?.();
    }
  };
}
