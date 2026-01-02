import ProjectData from "@/data/projects.json" with { type: "json" };
import { ProjectSchema } from "@/types/project";

import {
  Calendar,
  Code,
  Network,
  Rocket,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

export const iconsMap = {
  calendar: Calendar,
  users: Users,
  trophy: Trophy,
  rocket: Rocket,
  code: Code,
  network: Network,
  trendingUp: TrendingUp,
};

export const projects = ProjectSchema.array().parse(ProjectData);
