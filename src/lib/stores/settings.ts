import { persisted } from "svelte-persisted-store";

export type Settings = {
  fontStyle: string;
  fontSize: number;
  wordCenterOffset: number;
  progressBarVisible: boolean;
  progressTextVisible: boolean;
  guidelineVisible: boolean;
  verticalTicksVisible: boolean;
  centerOnOrp: boolean;
  orpHighlight: boolean;
  dynamicWordTiming: boolean;
  softStopMultiplier: number;
  hardStopMultiplier: number;
  wpm: number;
};

const defaultSettings = {
  fontStyle: "sans-serif",
  fontSize: 120,
  wordCenterOffset: -300,
  progressBarVisible: true,
  progressTextVisible: true,
  guidelineVisible: true,
  verticalTicksVisible: true,
  centerOnOrp: true,
  orpHighlight: true,
  dynamicWordTiming: true,
  softStopMultiplier: 1.5,
  hardStopMultiplier: 2.5,
  wpm: 300,
};

export const settings = persisted<Settings>("user-settings", defaultSettings);
