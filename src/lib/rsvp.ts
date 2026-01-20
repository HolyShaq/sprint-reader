import { stripTrailing } from "./utils";

export const getORPIndexFromLength = (wordLength: number) => {
  if (wordLength <= 1) return 0;
  if (wordLength <= 5) return 1;
  if (wordLength <= 9) return 2;
  if (wordLength <= 13) return 3;
  return 4;
};

const ABBREVIATIONS = new Set([
  "dr.",
  "mr.",
  "mrs.",
  "ms.",
  "prof.",
  "sr.",
  "jr.",
  "st.",
  "vs.",
  "etc.",
  "i.e.",
]);

export const getDelayMultiplier = (word: string) => {
  if (ABBREVIATIONS.has(word.toLowerCase())) return 1;

  const softStopMultiplier = 1.5;
  const softStops = [",", ";"];

  const hardStopMultiplier = 2.5;
  const hardStops = [".", "!", "?"];

  const strippedWord = stripTrailing(word);
  const lastChar = strippedWord[strippedWord.length - 1];
  if (softStops.includes(lastChar)) return softStopMultiplier;
  if (hardStops.includes(lastChar)) return hardStopMultiplier;

  return 1;
};
