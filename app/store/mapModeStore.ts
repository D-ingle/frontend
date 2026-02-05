import { create } from "zustand";

interface MapModeState {
  isMapMode: boolean;
  setMapMode: (isMapMode: boolean) => void;
}

export const useMapModeStore = create<MapModeState>((set) => ({
  isMapMode: false,
  setMapMode: (isMapMode) => set({ isMapMode }),
}));
