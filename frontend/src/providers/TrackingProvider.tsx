import React, { useState } from "react";
import { TrackingContext } from "./TrackingContext";
import { extractTrackingFromURL } from "@utils/tracking.utils";
import type { StoredTracking, TrackingData } from "../types";

const STORAGE_KEY = "trackingData";

const initializeTracking = (): TrackingData | null => {
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);

    if (existing) {
      const parsed: StoredTracking = JSON.parse(existing);
      return parsed.tracking;
    }

    const extracted = extractTrackingFromURL();

    if (extracted) {
      const payload: StoredTracking = {
        tracking: extracted,
        firstSeenAt: Date.now(),
        landingPath: window.location.pathname,
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return extracted;
    }

    return null;
  } catch {
    return null;
  }
};

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tracking] = useState<TrackingData | null>(initializeTracking);

  return (
    <TrackingContext.Provider value={{ tracking }}>
      {children}
    </TrackingContext.Provider>
  );
};
