import { create } from "zustand";

interface SelectedProperty {
  lat: number;
  lng: number;
  title: string;
}

interface MapModeState {
  isMapMode: boolean;
  setMapMode: (isMapMode: boolean) => void;
  selectedProperty: SelectedProperty | null;
  setSelectedProperty: (property: SelectedProperty) => void;
  clearSelectedProperty: () => void;
}

export const useMapModeStore = create<MapModeState>((set) => ({
  isMapMode: false,
  setMapMode: (isMapMode) => set({ isMapMode }),
  selectedProperty: null,
  setSelectedProperty: (selectedProperty) => set({ selectedProperty }),
  clearSelectedProperty: () => set({ selectedProperty: null }),
}));
