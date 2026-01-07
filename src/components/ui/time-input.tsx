import { forwardRef } from "react";
import { DateInput, DateSegment, TimeField } from "react-aria-components";

import { cn } from "@/lib/utils";

import type { TimeFieldProps, TimeValue } from "react-aria-components";

// ================================== //

type TTimeInputRef = HTMLDivElement;
type TTimeInputProps = Omit<
  TimeFieldProps<TimeValue>,
  "isDisabled" | "isInvalid"
> & {
  readonly dateInputClassName?: string;
  readonly segmentClassName?: string;
  readonly disabled?: boolean;
  readonly "data-invalid"?: boolean;
};

const TimeInput = forwardRef<TTimeInputRef, TTimeInputProps>(
  (
    {
      className,
      dateInputClassName,
      segmentClassName,
      disabled,
      "data-invalid": dataInvalid,
      ...props
    },
    ref,
  ) => {
    return (
      <TimeField
        ref={ref}
        className={cn("relative", className)}
        isDisabled={disabled}
        isInvalid={dataInvalid}
        {...props}
        aria-label="Time"
        shouldForceLeadingZeros
      >
        <DateInput
          className={cn(
            "peer inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-md border bg-background px-3 py-2 text-sm shadow-black",
            "data-[focus-within]:outline-none data-[focus-within]:ring-1 data-[focus-within]:ring-ring",
            "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
            dateInputClassName,
          )}
        >
          {(segment) => (
            <DateSegment
              segment={segment}
              className={cn(
                "inline rounded p-0.5 caret-transparent outline outline-0",
                "data-[focused]:bg-foreground/10 data-[focused]:text-foreground",
                "data-[placeholder]:text-muted-foreground",
                "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
                segmentClassName,
              )}
            />
          )}
        </DateInput>
      </TimeField>
    );
  },
);

TimeInput.displayName = "TimeInput";

// ================================== //

export { TimeInput };
