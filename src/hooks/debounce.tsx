"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useDebounceValue<T>(defaultValue: T, delay: number = 500) {
  const [currentValue, setCurrentValue] = useState<T>(defaultValue);
  const [cachedValue, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentValue(cachedValue);
    }, delay);

    return () => clearTimeout(timeout);
  }, [cachedValue, delay]);

  return [currentValue, setValue];
}

export function useDebounceCallback<
  T extends (...args: any[]) => void | Promise<void>
>(handler: T, delay: number = 500) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        handler(...args);
        timerRef.current = null;
      }, delay);
    },
    [handler, delay]
  );

  return debouncedFunction;
}
