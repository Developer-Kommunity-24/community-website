import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeTag(value: unknown) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return s.replace(/[[\]'"]/g, "").trim();
}
