import { useContext } from "react";
import { TrackingContext } from "../providers/TrackingContext";

export const useTrackingContext = () => {
  return useContext(TrackingContext);
};