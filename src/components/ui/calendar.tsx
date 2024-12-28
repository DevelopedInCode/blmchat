"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  LucideIcon,
} from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils/misc";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months_dropdown: `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        years_dropdown: `flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        dropdown_root: "block first:flex-1",
        dropdowns: `flex items-center gap-x-4 w-full`,
        months: "flex flex-col gap-y-2",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        // month_caption: `flex justify-center w-full`,
        caption_label: cn(
          "text-sm font-medium",
          props.captionLayout !== "label" && "hidden"
        ),
        // caption_label: "hidden",
        nav: "space-x-1 flex items-center justify-between w-full",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          " h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          " h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        // nav_button_previous: "absolute left-1",
        // nav_button_next: "absolute right-1",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        range_start: "day-range-start",
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today:
          "bg-blue-300 text-white border border-gray-400 hover:bg-blue-200",
        outside:
          "day-outside text-muted-foreground/60 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) => {
          let Icon: LucideIcon | undefined;

          switch (orientation) {
            case "left":
              Icon = ChevronLeft;
              break;
            case "right":
              Icon = ChevronRight;
              break;
            case "down":
              Icon = ChevronDown;
              break;
            default:
              Icon = ChevronUp;
              break;
          }

          return <Icon className={cn("w-4 h-4", className)} />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
