import type { iconsMap } from "@/constants";
import type { TEventColor } from "@/types";

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
