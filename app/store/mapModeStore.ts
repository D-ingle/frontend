import { create } from "zustand";
import { PropertyScore } from "@/shared/api/generated/model/propertyScore";
import { FacilityItem } from "@/shared/api/generated/model/facilityItem";
import { PointDTO } from "@/shared/api/generated/model/pointDTO";
import { MapItem } from "../components/map/MapOverlays";
import { NearbyNoiseItem } from "../types/nearby-noise";
import { PoliceModalResponse } from "@/shared/api/generated/model/policeModalResponse";

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
  environmentInfras: MapItem[];
  setEnvironmentInfras: (infras: MapItem[]) => void;
  clearEnvironmentInfras: () => void;
  selectedEnvironment: MapItem | null;
  setSelectedEnvironment: (item: MapItem | null) => void;
  clearSelectedEnvironment: () => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  debouncedTime: number;
  setDebouncedTime: (time: number) => void;
  noiseInfras: MapItem[];
  setNoiseInfras: (infras: MapItem[]) => void;
  clearNoiseInfras: () => void;
  populationInfras: MapItem[];
  setPopulationInfras: (infras: MapItem[]) => void;
  clearPopulationInfras: () => void;
  districtAvgNoise: number;
  setDistrictAvgNoise: (avg: number) => void;
  districtAvgPopulation: number;
  setDistrictAvgPopulation: (avg: number) => void;
  selectedNoise: MapItem | null;
  setSelectedNoise: (item: MapItem | null) => void;
  clearSelectedNoise: () => void;
  selectedPopulation: MapItem | null;
  setSelectedPopulation: (item: MapItem | null) => void;
  clearSelectedPopulation: () => void;

  // 소음 발생 예상 구간 정보
  nearbyNoiseInfras: NearbyNoiseItem[];
  setNearbyNoiseInfras: (items: NearbyNoiseItem[]) => void;
  clearNearbyNoiseInfras: () => void;
  selectedNearbyNoise: NearbyNoiseItem | null;
  setSelectedNearbyNoise: (item: NearbyNoiseItem) => void;
  clearSelectedNearbyNoise: () => void;

  // 경찰서 정보
  policeInfras: PoliceModalResponse[];
  setPoliceInfras: (infras: PoliceModalResponse[]) => void;
  clearPoliceInfras: () => void;
  selectedPolice: PoliceModalResponse | null;
  setSelectedPolice: (police: PoliceModalResponse | null) => void;
  clearSelectedPolice: () => void;

  // 안전 경로 및 설비 정보
  safetyPath: PointDTO[];
  safetyCctvs: PointDTO[];
  safetyLights: PointDTO[];
  setSafetyRoute: (
    path: PointDTO[],
    cctvs: PointDTO[],
    lights: PointDTO[],
  ) => void;
  clearSafetyRoute: () => void;
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
  setEnvironmentInfras: (infras: MapItem[]) =>
    set({ environmentInfras: infras }),
  clearEnvironmentInfras: () => set({ environmentInfras: [] }),
  selectedEnvironment: null,
  setSelectedEnvironment: (item: MapItem | null) =>
    set({ selectedEnvironment: item }),
  clearSelectedEnvironment: () => set({ selectedEnvironment: null }),
  currentTime: 12,
  setCurrentTime: (currentTime: number) => set({ currentTime }),
  debouncedTime: 12,
  setDebouncedTime: (debouncedTime: number) => set({ debouncedTime }),
  noiseInfras: [],
  setNoiseInfras: (infras: MapItem[]) => set({ noiseInfras: infras }),
  clearNoiseInfras: () => set({ noiseInfras: [] }),
  populationInfras: [],
  setPopulationInfras: (infras: MapItem[]) => set({ populationInfras: infras }),
  clearPopulationInfras: () => set({ populationInfras: [] }),
  districtAvgNoise: 0,
  setDistrictAvgNoise: (districtAvgNoise: number) => set({ districtAvgNoise }),
  districtAvgPopulation: 0,
  setDistrictAvgPopulation: (districtAvgPopulation: number) =>
    set({ districtAvgPopulation }),
  selectedNoise: null,
  setSelectedNoise: (selectedNoise: MapItem | null) => set({ selectedNoise }),
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

  policeInfras: [],
  setPoliceInfras: (infras) => set({ policeInfras: infras }),
  clearPoliceInfras: () => set({ policeInfras: [] }),
  selectedPolice: null,
  setSelectedPolice: (police) => set({ selectedPolice: police }),
  clearSelectedPolice: () => set({ selectedPolice: null }),

  // 안전 경로 및 설비 정보 초기값
  safetyPath: [],
  safetyCctvs: [],
  safetyLights: [],
  setSafetyRoute: (path, cctvs, lights) =>
    set({ safetyPath: path, safetyCctvs: cctvs, safetyLights: lights }),
  clearSafetyRoute: () =>
    set({ safetyPath: [], safetyCctvs: [], safetyLights: [] }),
}));
