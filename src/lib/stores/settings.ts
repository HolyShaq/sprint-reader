import { persisted } from "svelte-persisted-store";

export type Settings = {
  wordCenterOffset: number;
  fontSize: number;
  guidelineVisible: boolean;
  verticalTicksVisible: boolean;
  progressBarVisible: boolean;
  progressTextVisible: boolean;
  uniformWordTiming: boolean;
  softStopMultiplier: number;
  hardStopMultiplier: number;
};

const defaultSettings = {
  wordCenterOffset: -300,
  fontSize: 120,
  guidelineVisible: true,
  verticalTicksVisible: true,
  progressBarVisible: true,
  progressTextVisible: true,
  uniformWordTiming: true,
  softStopMultiplier: 1.5,
  hardStopMultiplier: 2.5,
};

export const settings = persisted<Settings>("user-settings", defaultSettings);
