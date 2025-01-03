"use client";

import { Clamp } from "@/lib/utils/math";
import { maxTime } from "date-fns/constants";
import { useCallback, useEffect, useState } from "react";

interface SmartStateOptions<T> {
  /**
   * Implicitly pass in the state's value
   * Setting and updating this will override the set function
   */
  value?: T;

  /**
   * The value to set the state to after a set time has passed
   * @requires resetTimer to be set to function
   * @requires value to NOT be set to function
   */
  resetValue?: T;

  /**
   * The time to wait before resetting the value
   * @requires resetValue to be set to function
   * @requires value to NOT be set to function
   */
  resetTimer?: number;

  onValueChange?: (newValue: T) => void;
  onValueReset?: (resetValue: T) => void;
}

export function useSmartState<T>(
  defaultValue: T,
  options: SmartStateOptions<T> = {}
): [T, (value: T) => void] {
  const { onValueChange, onValueReset, resetValue, resetTimer, value } =
    options;
  const [currentValue, setInternalValue] = useState<T>(defaultValue);

  const setValue = useCallback(
    (_value: T) => {
      if (value) return;
      setInternalValue(_value);
    },
    [value]
  );

  useEffect(() => {
    if (value && value !== currentValue) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    onValueChange?.(currentValue);
    if (!resetValue || !resetTimer || value) return;
    if (currentValue !== resetValue) {
      const timeout = setTimeout(() => {
        setValue(resetValue);
        onValueReset?.(resetValue);
      }, Clamp(resetTimer, 1, maxTime));

      return () => clearTimeout(timeout);
    }
  }, [currentValue]);

  return [currentValue, setValue];
}
