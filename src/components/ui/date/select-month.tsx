"use client";

import { GetMonthsInYear } from "@/lib/utils/misc";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useCallback, useEffect, useState } from "react";
import { getMonth } from "date-fns";
import { useSmartState } from "@/hooks/smart-state";

const months = GetMonthsInYear();

interface SelectMonthProps {
  value?: number;
  defaultValue?: number;
  onValueChange?: (newMonth: number, monthName: string) => void;
}

export function SelectMonth({
  value,
  defaultValue,
  onValueChange,
}: SelectMonthProps) {
  const [currentValue, setValue] = useSmartState<number>(
    defaultValue ?? getMonth(new Date()),
    { value, onValueChange: (id) => onValueChange?.(id, months[id]) }
  );

  useEffect(() => {
    if (value && value !== currentValue) {
      setValue(value);
    }
  }, [value]);

  const changeHandler = useCallback((index: string) => {
    setValue(parseInt(index));
  }, []);

  return (
    <Select value={`${currentValue}`} onValueChange={changeHandler}>
      <SelectTrigger>
        <SelectValue placeholder="Select Month" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(months).map((_id) => {
          const id = parseInt(_id);
          const mName = months[id];
          return (
            <SelectItem value={`${id}`} key={mName}>
              {mName}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
