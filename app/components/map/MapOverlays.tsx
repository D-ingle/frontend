import React from "react";
import { FacilityItem } from "@/shared/api/generated/model/facilityItem";
import { NearbyNoiseItem } from "@/app/types/nearby-noise";
import { PoliceModalResponse } from "@/shared/api/generated/model/policeModalResponse";
import { Subway } from "@/shared/api/generated/model/subway";
import { Bus } from "@/shared/api/generated/model/bus";

export interface MapItem {
  natureType?: "WALK" | "PARK";
  distanceMeters?: number;
  id?: number;
  name?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  noise?: number;
}

export const FacilityOverlay = ({
  infra,
  onClose,
}: {
  infra: FacilityItem & { roadAddress?: string };
  onClose: () => void;
}) => {
  return (
    <div
      className="bg-[#FAF9FD] border border-[#745BCD] rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden min-w-40 w-fit cursor-pointer"
      onClick={onClose}
    >
      <div className="bg-[#745BCD] px-2.5 py-1.75 flex justify-between items-center whitespace-nowrap">
        <p className="font-semibold text-[14px] text-white">{infra.name}</p>
      </div>
      <div className="bg-[#FFFCF6] px-2.5 py-2">
        <p className="font-medium text-[12px] text-[#06302C] leading-tight break-words">
          {infra.roadAddress || "주소 정보가 없습니다."}
        </p>
      </div>
    </div>
  );
};

export const EnvironmentOverlay = ({
  item,
  onClose,
}: {
  item: MapItem;
  onClose: () => void;
}) => {
  return (
    <div
      className="bg-[#F7FAF7] border border-[#29AD29] rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden min-w-40 w-fit cursor-pointer"
      onClick={onClose}
    >
      <div className="bg-[#29AD29] px-2.5 py-1.75 flex justify-between items-center whitespace-nowrap">
        <p className="font-semibold text-[14px] text-white">{item.name}</p>
      </div>
      <div className="bg-white px-2.5 py-2 flex gap-1">
        <p className="font-bold text-[12px] text-[#06302C] leading-tight break-words">
          {item.distanceMeters &&
            `${(item.distanceMeters / 1000).toFixed(1)}km`}
        </p>
        <p className="text-[12px] text-[#06302C] leading-tight break-words">
          거리에 있습니다.
        </p>
      </div>
    </div>
  );
};

export const NoiseOverlay = ({
  item,
  districtAvg,
  onClose,
}: {
  item: MapItem;
  districtAvg: number;
  onClose: () => void;
}) => {
  return (
    <div
      className="bg-[#FFF9F2] border border-[#EA8B2B] rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden min-w-40 w-fit cursor-pointer"
      onClick={onClose}
    >
      <div className="bg-[#EA8B2B] px-2.5 py-1.75 flex justify-between items-center whitespace-nowrap">
        <p className="font-semibold text-[14px] text-white">현재 소음도:</p>
        <p className="font-semibold text-[14px] text-white ml-auto">
          {Math.round(item.noise || 0)}dB
        </p>
      </div>
      <div className="bg-white px-2.5 py-2.5 flex flex-col gap-1.5 whitespace-nowrap">
        <div className="flex justify-between items-center gap-4">
          <span className="text-[12px] text-black">평균 소음도</span>
          <span className="font-bold text-[12px] text-black">
            {Math.round(districtAvg)}dB
          </span>
        </div>
      </div>
    </div>
  );
};

export const PopulationOverlay = ({
  item,
  districtAvg,
  onClose,
}: {
  item: MapItem;
  districtAvg: number;
  onClose: () => void;
}) => {
  return (
    <div
      className="bg-[#F0F7FF] border border-[#EA8B2B] rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden min-w-40 w-fit cursor-pointer"
      onClick={onClose}
    >
      <div className="bg-[#EA8B2B] px-2.5 py-1.75 flex justify-between items-center whitespace-nowrap">
        <p className="font-semibold text-[14px] text-white">현재 유동인구:</p>
        <p className="font-semibold text-[14px] text-white ml-auto">
          {item.population?.toLocaleString()}명
        </p>
      </div>
      <div className="bg-white px-2.5 py-2.5 flex flex-col gap-1.5 whitespace-nowrap">
        <div className="flex justify-between items-center gap-4">
          <span className="text-[12px] text-black">평균 유동인구</span>
          <span className="font-bold text-[12px] text-black">
            {Math.round(districtAvg).toLocaleString()}명
          </span>
        </div>
      </div>
    </div>
  );
};

export const NearbyNoiseOverlay = ({
  item,
  onClose,
}: {
  item: NearbyNoiseItem;
  onClose: () => void;
}) => {
  const isConstruction = item.noiseType === "CONSTRUCTION";
  const headerColor = "#EA8B2B";

  return (
    <div
      className="bg-white border rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden min-w-40 w-fit cursor-pointer"
      style={{ borderColor: headerColor }}
      onClick={onClose}
    >
      <div
        className="px-2.5 py-1.75 flex justify-between items-center whitespace-nowrap"
        style={{ backgroundColor: headerColor }}
      >
        <p className="font-semibold text-[14px] text-white">{item.name}</p>
      </div>
      <div className="bg-white px-2.5 py-2.5 flex flex-col gap-1.5 whitespace-nowrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <p className="font-bold text-[12px] text-[#06302C] leading-tight break-words">
              {(item.distanceMeter / 1000).toFixed(1)}km
            </p>
            <p className="text-[12px] text-black">거리에 있습니다</p>
          </div>
          {isConstruction && item.endDate && (
            <p className="text-[12px] text-[#EA8B2B] font-medium">
              공사 종료 예정: {item.endDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const PoliceOverlay = ({
  station,
  onClose,
}: {
  station: PoliceModalResponse;
  onClose: () => void;
}) => {
  return (
    <div
      className="bg-white border-[1.5px] border-[#E05353] rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden min-w-32 w-fit cursor-pointer"
      onClick={onClose}
    >
      <div className="bg-[#E05353] px-2.5 py-1.75 flex justify-between items-center whitespace-nowrap">
        <p className="font-semibold text-[14px] text-white">
          {station.policeOfficeName}
        </p>
      </div>
    </div>
  );
};
export const AccessibilityOverlay = ({
  item,
  onClose,
  color = "#0192C8",
}: {
  item: Subway | Bus;
  onClose: () => void;
  color?: string;
}) => {
  return (
    <div
      className="bg-white border-[1.5px] rounded-sm shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] overflow-hidden min-w-32 w-fit cursor-pointer"
      style={{ borderColor: color }}
      onClick={onClose}
    >
      <div
        className="px-2.5 py-1.75 flex justify-between items-center whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        <p className="font-semibold text-[14px] text-white">{item.name}</p>
      </div>
    </div>
  );
};
