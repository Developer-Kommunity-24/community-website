export type TCalendarView = "day" | "week" | "month" | "year" | "agenda";

export type TBadgeVariant = "dot" | "colored" | "mixed";
export type TWorkingHours = { [key: number]: { from: number; to: number } };
export type TVisibleHours = { from: number; to: number };
