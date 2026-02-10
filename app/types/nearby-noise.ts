//DTO가 동기화되지 않음에 따라 임시 선언

export type NearbyNoiseType =
  | "FIRE_STATION"
  | "EMERGENCY_CENTER"
  | "CONSTRUCTION";

export interface NearbyNoiseItem {
  noiseType: NearbyNoiseType;
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distanceMeter: number;
  endDate: string | null;
}

export interface NearbyNoiseData {
  enabled: boolean;
  noiseScore: number;
  radiusMeters: number;
  items: NearbyNoiseItem[];
}
