import type { iconsMap } from "@/constants";

export type TEventColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";

export interface CommunityRepresentative {
  name: string;
  role: string;
  email: string;
}

export interface Community {
  id: number;
  name: string;
  college: string;
  description: string;
  logo: string;
  representatives: CommunityRepresentative[];
  website: string;
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
