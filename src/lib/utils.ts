import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any }
  ? Omit<T, "children">
  : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};

// Custom
export const getORPIndexFromLength = (wordLength: number) => {
  if (wordLength <= 0) return 0;

  // ORP ≈ round(length * 0.4), capped at 8 (1-based)
  const orp1Based = Math.min(8, Math.round(wordLength * 0.4));

  // Convert to 0-based index
  return Math.max(0, orp1Based - 1);
};
