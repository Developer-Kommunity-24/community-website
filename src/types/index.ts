import type { iconsMap } from "@/constants";

export type TEventColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
}

export interface IEvent {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  time: string;
  location: string;
  description: string;
  registrationLink: string;
  joinLink: string;
  icon: keyof typeof iconsMap;
  highlight: boolean;
  youtubeLink?: string;
  color?: TEventColor;
  organizationName?: string;
  posterUrl?: string;
  tags?: string[];
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}

export type TCalendarView = "day" | "week" | "month" | "year" | "agenda";

export type TBadgeVariant = "dot" | "colored" | "mixed";
export type TWorkingHours = { [key: number]: { from: number; to: number } };
export type TVisibleHours = { from: number; to: number };

export interface CommunityRepresentative {
  name: string;
  role?: string;
  email?: string;
}

export interface Community {
  id: number;
  name: string;
  college: string;
  description?: string;
  logo?: string;
  pocs?: CommunityRepresentative[];
  representatives?: CommunityRepresentative[];
  website?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Event {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  time: string;
  location: string;
  description: string;
  registrationLink: string;
  joinLink: string;
  icon: keyof typeof iconsMap;
  highlight: boolean;
  youtubeLink?: string;
  color?: TEventColor;
}
