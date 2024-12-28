"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/misc";
import { SelectMonth } from "./date/select-month";

export interface DatePickerInputProps {
  date: Date;
  onDateUpdate: (date: Date | undefined) => void;
  buttonProps?: Omit<ButtonProps, "children" | "variant" | "value">;
  dateProps?: Omit<CalendarProps, "selected" | "onSelect" | "mode">;
}

export function DatePickerInput({
  date,
  onDateUpdate,
  buttonProps,
  dateProps,
}: DatePickerInputProps) {
  const [month, setViewMonth] = React.useState<Date>(date);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          {...buttonProps}
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            buttonProps?.className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto px-0 py-2" side="bottom">
        {/* <div className="flex items-center gap-x-1 px-4">
          <SelectMonth />
        </div> */}
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={onDateUpdate}
          month={month}
          onMonthChange={setViewMonth}
          {...dateProps}
        />
      </PopoverContent>
    </Popover>
  );
}
