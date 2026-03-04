import { type TrackingData } from "../types";

const MAX_LENGTH = 255;

const ALLOWED_PARAMS: (keyof TrackingData)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
];

export const sanitize = (value: string): string => {
  return value.replace(/[<>\\"']/g, "").trim();
};

export const normalize = (value: string): string => {
  return sanitize(value).toLowerCase();
};

export const extractTrackingFromURL = (): TrackingData | null => {
  const params = new URLSearchParams(window.location.search);
  const tracking: TrackingData = {};

  ALLOWED_PARAMS.forEach((key) => {
    const value = params.get(key);

    if (value && value.length <= MAX_LENGTH) {
      tracking[key] = normalize(value);
    }
  });

  return Object.keys(tracking).length > 0 ? tracking : null;
};
