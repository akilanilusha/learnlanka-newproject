import type { IconType } from "react-icons";
import {
  PiBookOpen,
  PiCalculator,
  PiFlask,
  PiBookOpenText,
  PiGlobeHemisphereWest,
  PiMapTrifold,
  PiPalette,
  PiDesktop,
  PiMusicNotes,
} from "react-icons/pi";
import { subjectsCatalog } from "./textbooksData";

export type SubjectStyle = { icon: IconType; tile: string; color: string };

// Icons/colors per subject id; full class names so Tailwind can detect them.
const subjectStyles: Record<string, SubjectStyle> = {
  mathematics: { icon: PiCalculator, tile: "bg-rose-50", color: "text-rose-500" },
  english: { icon: PiBookOpenText, tile: "bg-blue-50", color: "text-blue-600" },
  science: { icon: PiFlask, tile: "bg-emerald-50", color: "text-emerald-600" },
  environment: { icon: PiGlobeHemisphereWest, tile: "bg-sky-50", color: "text-sky-600" },
  "social-studies": { icon: PiMapTrifold, tile: "bg-orange-50", color: "text-orange-500" },
  "art-craft": { icon: PiPalette, tile: "bg-violet-50", color: "text-violet-500" },
  "computer-skills": { icon: PiDesktop, tile: "bg-indigo-50", color: "text-indigo-500" },
  music: { icon: PiMusicNotes, tile: "bg-fuchsia-50", color: "text-fuchsia-500" },
};

const fallbackStyle: SubjectStyle = { icon: PiBookOpen, tile: "bg-slate-100", color: "text-slate-500" };

export function subjectStyle(subjectId: string): SubjectStyle {
  return subjectStyles[subjectId] ?? fallbackStyle;
}

export function subjectName(subjectId: string): string {
  return subjectsCatalog.find((s) => s.id === subjectId)?.name ?? subjectId;
}
