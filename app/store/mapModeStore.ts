import { create } from "zustand";
import { PropertyScore } from "@/shared/api/generated/model/propertyScore";
import { FacilityItem } from "@/shared/api/generated/model/facilityItem";

interface SelectedProperty {
  id: number;
  lat: number;
  lng: number;
  title: string;
  price?: string;
  dealType?: string;
  propertyScores?: PropertyScore;
}

interface MapModeState {
  isMapMode: boolean;
  setMapMode: (isMapMode: boolean) => void;
  selectedProperty: SelectedProperty | null;
  setSelectedProperty: (property: SelectedProperty) => void;
  clearSelectedProperty: () => void;
  propertiesOnMap: (SelectedProperty & { id: number })[];
  setPropertiesOnMap: (
    properties: (SelectedProperty & { id: number })[],
  ) => void;
  clearPropertiesOnMap: () => void;
  convenienceInfras: FacilityItem[];
  setConvenienceInfras: (infras: FacilityItem[]) => void;
  clearConvenienceInfras: () => void;
  selectedInfra: FacilityItem | null;
  setSelectedInfra: (infra: FacilityItem | null) => void;
  clearSelectedInfra: () => void;
}

export const useMapModeStore = create<MapModeState>((set) => ({
  isMapMode: false,
  setMapMode: (isMapMode: boolean) => set({ isMapMode }),
  selectedProperty: null,
  setSelectedProperty: (selectedProperty: SelectedProperty) =>
    set({ selectedProperty }),
  clearSelectedProperty: () => set({ selectedProperty: null }),
  propertiesOnMap: [],
  setPropertiesOnMap: (properties: (SelectedProperty & { id: number })[]) =>
    set({ propertiesOnMap: properties }),
  clearPropertiesOnMap: () => set({ propertiesOnMap: [] }),
  convenienceInfras: [],
  setConvenienceInfras: (infras: FacilityItem[]) =>
    set({ convenienceInfras: infras }),
  clearConvenienceInfras: () => set({ convenienceInfras: [] }),
  selectedInfra: null,
  setSelectedInfra: (infra: FacilityItem | null) =>
    set({ selectedInfra: infra }),
  clearSelectedInfra: () => set({ selectedInfra: null }),
}));
