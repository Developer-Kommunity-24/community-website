"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Time } from "@internationalized/date";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimeInput } from "@/components/ui/time-input";
import type { TimeValue } from "react-aria-components";

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({
  value,
  onChange,
  minDate,
}: DateTimePickerProps & { minDate?: Date }) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [time, setTime] = React.useState<TimeValue>(
    new Time(value.getHours(), value.getMinutes()),
  );

  React.useEffect(() => {
    if (value) {
      setDate(value);
      setTime(new Time(value.getHours(), value.getMinutes()));
    }
  }, [value]);

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    const newDateTime = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
      time.hour,
      time.minute,
    );
    setDate(newDateTime);
    onChange(newDateTime);
  };

  const handleTimeChange = (newTime: TimeValue | null) => {
    if (!newTime) return;
    setTime(newTime);
    if (!date) return;
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      newTime.hour,
      newTime.minute,
    );
    setDate(newDate);
    onChange(newDate);
  };

  const minValue = React.useMemo(() => {
    if (minDate && date && date.toDateString() === minDate.toDateString()) {
      return new Time(minDate.getHours(), minDate.getMinutes());
    }
    return undefined;
  }, [minDate, date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          disabled={minDate ? { before: minDate } : undefined}
        />
        <div className="p-3 border-t border-border">
          <TimeInput
            value={time}
            onChange={handleTimeChange}
            hourCycle={12}
            minValue={minValue}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
