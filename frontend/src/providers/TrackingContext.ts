import { createContext } from "react";
import { type TrackingData } from "../types";

interface TrackingContextValue {
  tracking: TrackingData | null;
}

export const TrackingContext = createContext<TrackingContextValue>({
  tracking: null,
});