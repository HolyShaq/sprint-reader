import { persisted } from "svelte-persisted-store";

export const FONT_SIZES = [
  36, 42, 48, 56, 64, 72, 84, 96, 112, 128, 144, 160, 180,
];
export type FontSizes = (typeof FONT_SIZES)[number];

export type Settings = {
  fontStyle: string;
  fontSize: FontSizes;
  wordCenterOffset: number;
  progressBarVisible: boolean;
  progressTextVisible: boolean;
  guidelineVisible: boolean;
  verticalTicksVisible: boolean;
  controlPanelVisible: boolean;
  centerOnOrp: boolean;
  orpHighlight: boolean;
  dynamicWordTiming: boolean;
  softStopMultiplier: number;
  hardStopMultiplier: number;
  wpm: number;
};

const defaultSettings = {
  fontStyle: "sans-serif",
  fontSize: 128,
  wordCenterOffset: 0,
  progressBarVisible: true,
  progressTextVisible: true,
  guidelineVisible: true,
  verticalTicksVisible: true,
  controlPanelVisible: true,
  centerOnOrp: true,
  orpHighlight: true,
  dynamicWordTiming: true,
  softStopMultiplier: 1.5,
  hardStopMultiplier: 2.5,
  wpm: 300,
};

export const settings = persisted<Settings>("user-settings", defaultSettings);
