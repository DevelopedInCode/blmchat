import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Clamp } from "./math";
import { format, getYear, startOfDay } from "date-fns";

let MonthsInYear: string[] | undefined;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Delay(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), Clamp(time, 0, 99999999));
  });
}

export function serverActionError(
  msg: string,
  status: number,
  contentType: string = "text/plain"
) {
  return new Response(msg, {
    status,
    headers: {
      "Content-Type": contentType,
    },
  });
}

export function GetMonthsInYear() {
  const year = getYear(new Date());
  if (!MonthsInYear) {
    MonthsInYear = [];

    for (let i = 0; i <= 11; i++) {
      const somDate = new Date(year, i, 1);
      MonthsInYear[i] = format(somDate, "MMMM");
    }
  }
  return MonthsInYear;
}

export function startOfDayDate() {
  const d = new Date();
  return startOfDay(d);
}
