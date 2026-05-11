import { persisted } from "svelte-persisted-store";

export const FONT_STYLES = [
  // System Fonts
  { value: "arial", label: "Arial" },
  { value: "times-new-roman", label: "Times New Roman" },
  { value: "georgia", label: "Georgia" },

  // Imported Fonts
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "open-sans", label: "Open Sans" },
  { value: "merriweather", label: "Merriweather" },
  { value: "jetbrains-mono", label: "Jetbrains Mono" },
  { value: "raleway", label: "Raleway" },
];

export const FONT_SIZES = [
  36, 42, 48, 56, 64, 72, 84, 96, 112, 128, 144, 160, 180,
];
export type FontSizes = (typeof FONT_SIZES)[number];

export type Settings = {
  fontStyle: string;
  fontSize: FontSizes;
  wordCenterOffset: number;
  wordChunksVisible: boolean;
  wordChunkSize: number;
  progressBarVisible: boolean;
  progressTextVisible: boolean;
  guidelineVisible: boolean;
  verticalTicksVisible: boolean;
  controlPanelVisible: boolean;
  centerOnOrp: boolean;
  orpHighlight: boolean;
  chunkVisible: boolean;
  chunkSize: number;
  dynamicWordTiming: boolean;
  softStopMultiplier: number;
  hardStopMultiplier: number;
  wpm: number;
};

const defaultSettings = {
  fontStyle: "inter",
  fontSize: 128,
  wordCenterOffset: 0,
  wordChunksVisible: true,
  wordChunkSize: 5,
  progressBarVisible: true,
  progressTextVisible: true,
  guidelineVisible: true,
  verticalTicksVisible: true,
  controlPanelVisible: true,
  centerOnOrp: true,
  orpHighlight: true,
  chunkVisible: false,
  chunkSize: 5,
  dynamicWordTiming: true,
  softStopMultiplier: 1.5,
  hardStopMultiplier: 2.5,
  wpm: 300,
};

export const settings = persisted<Settings>("user-settings", defaultSettings);
