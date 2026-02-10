import { create } from "zustand";
import { PropertyScore } from "@/shared/api/generated/model/propertyScore";
import { FacilityItem } from "@/shared/api/generated/model/facilityItem";
import { Item } from "@/shared/api/generated/model/item";
import { NearbyNoiseItem } from "../types/nearby-noise";

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
  environmentInfras: Item[];
  setEnvironmentInfras: (infras: Item[]) => void;
  clearEnvironmentInfras: () => void;
  selectedEnvironment: Item | null;
  setSelectedEnvironment: (item: Item | null) => void;
  clearSelectedEnvironment: () => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  debouncedTime: number;
  setDebouncedTime: (time: number) => void;
  noiseInfras: Item[];
  setNoiseInfras: (infras: Item[]) => void;
  clearNoiseInfras: () => void;
  populationInfras: Item[];
  setPopulationInfras: (infras: Item[]) => void;
  clearPopulationInfras: () => void;
  districtAvgNoise: number;
  setDistrictAvgNoise: (avg: number) => void;
  districtAvgPopulation: number;
  setDistrictAvgPopulation: (avg: number) => void;
  selectedNoise: Item | null;
  setSelectedNoise: (item: Item | null) => void;
  clearSelectedNoise: () => void;
  selectedPopulation: Item | null;
  setSelectedPopulation: (item: Item | null) => void;
  clearSelectedPopulation: () => void;

  // 소음 발생 예상 구간 정보
  nearbyNoiseInfras: NearbyNoiseItem[];
  setNearbyNoiseInfras: (items: NearbyNoiseItem[]) => void;
  clearNearbyNoiseInfras: () => void;
  selectedNearbyNoise: NearbyNoiseItem | null;
  setSelectedNearbyNoise: (item: NearbyNoiseItem) => void;
  clearSelectedNearbyNoise: () => void;
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
  environmentInfras: [],
  setEnvironmentInfras: (infras: Item[]) => set({ environmentInfras: infras }),
  clearEnvironmentInfras: () => set({ environmentInfras: [] }),
  selectedEnvironment: null,
  setSelectedEnvironment: (item: Item | null) =>
    set({ selectedEnvironment: item }),
  clearSelectedEnvironment: () => set({ selectedEnvironment: null }),
  currentTime: 12,
  setCurrentTime: (currentTime: number) => set({ currentTime }),
  debouncedTime: 12,
  setDebouncedTime: (debouncedTime: number) => set({ debouncedTime }),
  noiseInfras: [],
  setNoiseInfras: (infras: Item[]) => set({ noiseInfras: infras }),
  clearNoiseInfras: () => set({ noiseInfras: [] }),
  populationInfras: [],
  setPopulationInfras: (infras: Item[]) => set({ populationInfras: infras }),
  clearPopulationInfras: () => set({ populationInfras: [] }),
  districtAvgNoise: 0,
  setDistrictAvgNoise: (districtAvgNoise: number) => set({ districtAvgNoise }),
  districtAvgPopulation: 0,
  setDistrictAvgPopulation: (districtAvgPopulation: number) =>
    set({ districtAvgPopulation }),
  selectedNoise: null,
  setSelectedNoise: (selectedNoise: Item | null) => set({ selectedNoise }),
  clearSelectedNoise: () => set({ selectedNoise: null }),
  selectedPopulation: null,
  setSelectedPopulation: (item) => set({ selectedPopulation: item }),
  clearSelectedPopulation: () => set({ selectedPopulation: null }),

  nearbyNoiseInfras: [],
  setNearbyNoiseInfras: (items) => set({ nearbyNoiseInfras: items }),
  clearNearbyNoiseInfras: () => set({ nearbyNoiseInfras: [] }),
  selectedNearbyNoise: null,
  setSelectedNearbyNoise: (item) => set({ selectedNearbyNoise: item }),
  clearSelectedNearbyNoise: () => set({ selectedNearbyNoise: null }),
}));
