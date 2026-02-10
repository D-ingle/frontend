"use client";

import React, { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  Polyline,
  useKakaoLoader,
} from "react-kakao-maps-sdk";
import { useMapModeStore } from "../../store/mapModeStore";
import { cn } from "@/app/lib/utils";
import { FacilityItemInfraType } from "@/shared/api/generated/model/facilityItemInfraType";
import { FacilityItem } from "@/shared/api/generated/model/facilityItem";
import { NearbyNoiseItem } from "@/app/types/nearby-noise";
import {
  MapItem,
  FacilityOverlay,
  EnvironmentOverlay,
  NoiseOverlay,
  PopulationOverlay,
  NearbyNoiseOverlay,
  PoliceOverlay,
  AccessibilityOverlay,
} from "./MapOverlays";

const CustomMarker = ({
  lat,
  lng,
  dealType,
  price,
  isSelected,
  zoomLevel,
}: {
  lat: number;
  lng: number;
  dealType?: string;
  price?: string;
  isSelected: boolean;
  zoomLevel: number;
}) => {
  const getScaledSize = (size: number, level: number) => {
    if (level <= 2) return size * 1.5;
    if (level === 3) return size * 1.2;
    if (level === 4) return size * 1.0;
    return size * 0.8;
  };

  const baseSize = isSelected ? 80 : 70;
  const size = getScaledSize(baseSize, zoomLevel) + 5;
  const iconSrc = isSelected
    ? "/map_marker/normal_marker.svg"
    : "/map_marker/clicked_marker.svg";

  return (
    <CustomOverlayMap position={{ lat, lng }}>
      <div
        className="relative flex flex-col items-center justify-center transition-all duration-300"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `url(${iconSrc})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center -mt-2">
          <span
            className={cn(
              "text-[10px] font-bold leading-none mb-0.5 text-white",
            )}
          >
            {dealType}
          </span>
          <span
            className={cn(
              "text-[12px] font-extrabold leading-tight text-white",
            )}
          >
            {price}
          </span>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

const KakaoMap = () => {
  const {
    isMapMode,
    selectedProperty,
    propertiesOnMap,
    convenienceInfras,
    selectedInfra,
    setSelectedInfra,
    clearSelectedInfra,
    environmentInfras,
    selectedEnvironment,
    setSelectedEnvironment,
    clearSelectedEnvironment,
    noiseInfras,
    populationInfras,
    districtAvgNoise,
    districtAvgPopulation,
    selectedNoise,
    setSelectedNoise,
    clearSelectedNoise,
    selectedPopulation,
    setSelectedPopulation,
    clearSelectedPopulation,
    nearbyNoiseInfras,
    selectedNearbyNoise,
    setSelectedNearbyNoise,
    clearSelectedNearbyNoise,
    policeInfras,
    selectedPolice,
    setSelectedPolice,
    clearSelectedPolice,
    safetyPath,
    safetyCctvs,
    safetyLights,
    accessibilitySubways,
    accessibilityBuses,
    selectedAccessibility,
    setSelectedAccessibility,
    clearSelectedAccessibility,
  } = useMapModeStore();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState(selectedProperty ? 2 : 3);

  // 편의 시설 마커 아이콘 매핑
  const infraIconMap: Record<string, string> = {
    [FacilityItemInfraType.HOSPITAL]:
      "/map_marker/convenience/hospital_marker.svg",
    [FacilityItemInfraType.EMERGENCY_MEDICAL_CENTER]:
      "/map_marker/convenience/hospital_marker.svg",
    [FacilityItemInfraType.MARKET]: "/map_marker/convenience/mart_marker.svg",
    [FacilityItemInfraType.CONVENIENCE_STORE]:
      "/map_marker/convenience/store_marker.svg",
  };

  const envIconMap: Record<string, string> = {
    WALK: "/map_marker/environment/mountain_marker.svg",
    PARK: "/map_marker/environment/park_marker.svg",
  };

  const noiseMarkerIcon = "/map_marker/noise/noise_marker.svg";
  const populationMarkerIcon = "/map_marker/noise/population_marker.svg";

  const nearbyNoiseIconMap: Record<string, string> = {
    FIRE_STATION: "/map_marker/noise/firestation_marker.svg",
    EMERGENCY_CENTER: "/map_marker/noise/hospital_marker.svg",
    CONSTRUCTION: "/map_marker/noise/construction_marker.svg",
  };

  const getScaledSize = (size: number, level: number) => {
    if (level <= 2) return size * 1.2 + 5;
    if (level === 3) return size + 5;
    if (level === 4) return size * 0.8 + 5;
    return size * 0.6 + 5;
  };

  // 기본 중심값: 구일역
  const defaultCenter = { lat: 37.4971, lng: 126.8715 };

  // 선택된 매물이 있으면 해당 좌표를, 없으면 기본 좌표를 사용
  const mapCenter = selectedProperty
    ? { lat: selectedProperty.lat, lng: selectedProperty.lng }
    : defaultCenter;

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || "",
  });

  // 매물이 선택되었을 때 오프셋 적용
  useEffect(() => {
    if (map && selectedProperty) {
      // 1. 먼저 해당 좌표로 중심 이동
      const moveLatLng = new kakao.maps.LatLng(
        selectedProperty.lat,
        selectedProperty.lng,
      );
      map.setCenter(moveLatLng);

      // 2. 일반 모드일 때만 우측 가시 영역 중앙으로 오게 하기 위해 왼쪽으로 -400px 패닝
      // 종합데이터 모드(isMapMode = true)에서는 사이드바가 없으므로 정중앙 유지
      if (!isMapMode) {
        map.panBy(-400, 0);
      }
    }
  }, [map, selectedProperty, isMapMode]);

  if (loading)
    return <div className="w-full h-full bg-gray-100 animate-pulse" />;
  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
        지도를 불러올 수 없습니다.
      </div>
    );

  return (
    <Map
      center={mapCenter}
      style={{ width: "100%", height: "100%" }}
      level={selectedProperty ? 2 : 3}
      onCreate={setMap}
      onZoomChanged={(map) => setZoomLevel(map.getLevel())}
      onClick={() => {
        clearSelectedInfra();
        clearSelectedEnvironment();
        clearSelectedNoise();
        clearSelectedPopulation();
        clearSelectedNearbyNoise();
        clearSelectedPolice();
      }}
    >
      {isMapMode ? (
        <>
          {/* 종합데이터 모드: 편의 시설 마커 */}
          {convenienceInfras.map((infra: FacilityItem) => {
            const iconSrc = infra.infraType
              ? infraIconMap[infra.infraType]
              : null;
            if (!iconSrc || !infra.latitude || !infra.longitude) return null;

            return (
              <React.Fragment key={`infra-group-${infra.id}`}>
                <MapMarker
                  position={{ lat: infra.latitude, lng: infra.longitude }}
                  image={{
                    src: iconSrc,
                    size: {
                      width: getScaledSize(44, zoomLevel),
                      height: getScaledSize(44, zoomLevel),
                    },
                    options: {
                      offset: {
                        x: getScaledSize(22, zoomLevel),
                        y: getScaledSize(44, zoomLevel),
                      },
                    },
                  }}
                  title={infra.name}
                  onClick={() => setSelectedInfra(infra)}
                />
              </React.Fragment>
            );
          })}

          {/* 편의 시설 커스텀 오버레이 */}
          {selectedInfra &&
            selectedInfra.latitude &&
            selectedInfra.longitude && (
              <CustomOverlayMap
                position={{
                  lat: selectedInfra.latitude,
                  lng: selectedInfra.longitude,
                }}
                yAnchor={1.2}
              >
                <FacilityOverlay
                  infra={selectedInfra}
                  onClose={() => clearSelectedInfra()}
                />
              </CustomOverlayMap>
            )}

          {/* 환경 정보 마커 */}
          {environmentInfras.map((item: MapItem) => {
            const iconSrc = item.natureType
              ? envIconMap[item.natureType]
              : null;
            if (!iconSrc || !item.latitude || !item.longitude) return null;

            return (
              <MapMarker
                key={`env-${item.id}`}
                position={{ lat: item.latitude, lng: item.longitude }}
                image={{
                  src: iconSrc,
                  size: {
                    width: getScaledSize(44, zoomLevel),
                    height: getScaledSize(44, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(22, zoomLevel),
                      y: getScaledSize(44, zoomLevel),
                    },
                  },
                }}
                onClick={() => setSelectedEnvironment(item)}
              />
            );
          })}

          {/* 환경 정보 커스텀 오버레이 */}
          {selectedEnvironment &&
            selectedEnvironment.latitude &&
            selectedEnvironment.longitude && (
              <CustomOverlayMap
                position={{
                  lat: selectedEnvironment.latitude,
                  lng: selectedEnvironment.longitude,
                }}
                yAnchor={1.2}
              >
                <EnvironmentOverlay
                  item={selectedEnvironment}
                  onClose={() => clearSelectedEnvironment()}
                />
              </CustomOverlayMap>
            )}

          {/* 종합데이터 모드: 선택된 매물만 map_marker.svg로 표시 */}
          {selectedProperty && (
            <MapMarker
              key={`selected-${selectedProperty.lat}-${selectedProperty.lng}`}
              position={{
                lat: selectedProperty.lat,
                lng: selectedProperty.lng,
              }}
              image={{
                src: "/map_marker/accessibility/map_mark.svg",
                size: {
                  width:
                    zoomLevel <= 2
                      ? 135
                      : zoomLevel === 3
                        ? 115
                        : zoomLevel === 4
                          ? 95
                          : 75,
                  height:
                    zoomLevel <= 2
                      ? 135
                      : zoomLevel === 3
                        ? 115
                        : zoomLevel === 4
                          ? 95
                          : 75,
                },
                options: {
                  offset: {
                    x:
                      (zoomLevel <= 2
                        ? 135
                        : zoomLevel === 3
                          ? 115
                          : zoomLevel === 4
                            ? 95
                            : 75) / 2,
                    y:
                      (zoomLevel <= 2
                        ? 135
                        : zoomLevel === 3
                          ? 115
                          : zoomLevel === 4
                            ? 95
                            : 75) / 2,
                  },
                },
              }}
              zIndex={999}
            />
          )}

          {noiseInfras.map((item: MapItem) => {
            if (!item.latitude || !item.longitude) return null;
            return (
              <MapMarker
                key={`noise-${item.id}`}
                position={{ lat: item.latitude, lng: item.longitude }}
                onClick={() => setSelectedNoise(item)}
                image={{
                  src: noiseMarkerIcon,
                  size: {
                    width: getScaledSize(300, zoomLevel),
                    height: getScaledSize(300, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(150, zoomLevel),
                      y: getScaledSize(150, zoomLevel),
                    },
                  },
                }}
              />
            );
          })}

          {selectedNoise &&
            selectedNoise.latitude &&
            selectedNoise.longitude && (
              <CustomOverlayMap
                position={{
                  lat: selectedNoise.latitude,
                  lng: selectedNoise.longitude,
                }}
                xAnchor={0.5}
                yAnchor={0.5}
              >
                <NoiseOverlay
                  item={selectedNoise}
                  districtAvg={districtAvgNoise}
                  onClose={clearSelectedNoise}
                />
              </CustomOverlayMap>
            )}

          {/* 유동인구 정보 마커 */}
          {populationInfras.map((item: MapItem) => {
            if (!item.latitude || !item.longitude) return null;
            return (
              <MapMarker
                key={`population-${item.id}`}
                position={{ lat: item.latitude, lng: item.longitude }}
                onClick={() => setSelectedPopulation(item)}
                image={{
                  src: populationMarkerIcon,
                  size: {
                    width: getScaledSize(300, zoomLevel),
                    height: getScaledSize(300, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(150, zoomLevel),
                      y: getScaledSize(150, zoomLevel),
                    },
                  },
                }}
              />
            );
          })}

          {selectedPopulation &&
            selectedPopulation.latitude &&
            selectedPopulation.longitude && (
              <CustomOverlayMap
                position={{
                  lat: selectedPopulation.latitude,
                  lng: selectedPopulation.longitude,
                }}
                xAnchor={0.5}
                yAnchor={0.5}
              >
                <PopulationOverlay
                  item={selectedPopulation}
                  districtAvg={districtAvgPopulation}
                  onClose={clearSelectedPopulation}
                />
              </CustomOverlayMap>
            )}

          {/* 소음 발생 예상 구간 마커 */}
          {nearbyNoiseInfras.map((item: NearbyNoiseItem) => {
            const iconSrc = nearbyNoiseIconMap[item.noiseType];
            if (!iconSrc) return null;

            return (
              <MapMarker
                key={`nearby-noise-${item.id}`}
                position={{ lat: item.latitude, lng: item.longitude }}
                onClick={() => setSelectedNearbyNoise(item)}
                image={{
                  src: iconSrc,
                  size: {
                    width: getScaledSize(44, zoomLevel),
                    height: getScaledSize(44, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(22, zoomLevel),
                      y: getScaledSize(44, zoomLevel),
                    },
                  },
                }}
              />
            );
          })}

          {selectedNearbyNoise && (
            <CustomOverlayMap
              position={{
                lat: selectedNearbyNoise.latitude,
                lng: selectedNearbyNoise.longitude,
              }}
              xAnchor={0.5}
              yAnchor={1.2}
            >
              <NearbyNoiseOverlay
                item={selectedNearbyNoise}
                onClose={clearSelectedNearbyNoise}
              />
            </CustomOverlayMap>
          )}

          {/* 인근 경찰서 마커 */}
          {policeInfras.map((station, idx) => (
            <MapMarker
              key={`police-${idx}-${station.latitude}`}
              position={{
                lat: station.latitude || 0,
                lng: station.longitude || 0,
              }}
              image={{
                src: "/map_marker/safety/police_marker.svg",
                size: {
                  width: getScaledSize(44, zoomLevel),
                  height: getScaledSize(44, zoomLevel),
                },
                options: {
                  offset: {
                    x: getScaledSize(22, zoomLevel),
                    y: getScaledSize(44, zoomLevel),
                  },
                },
              }}
              title={station.policeOfficeName}
              onClick={() => setSelectedPolice(station)}
            />
          ))}

          {/* 경찰서 커스텀 오버레이 */}
          {selectedPolice &&
            selectedPolice.latitude &&
            selectedPolice.longitude && (
              <CustomOverlayMap
                position={{
                  lat: selectedPolice.latitude,
                  lng: selectedPolice.longitude,
                }}
                yAnchor={1.2}
              >
                <PoliceOverlay
                  station={selectedPolice}
                  onClose={() => clearSelectedPolice()}
                />
              </CustomOverlayMap>
            )}

          {/* 안전 경로 표시 (Polyline) - 파란색 점선 디자인 */}
          {safetyPath.length > 0 && (
            <>
              {/* 바깥쪽 파란색 메인 라인 */}
              <Polyline
                path={safetyPath.map((p) => ({
                  lat: p.latitude || 0,
                  lng: p.longitude || 0,
                }))}
                strokeWeight={10}
                strokeColor="#2563EB"
                strokeOpacity={0.7}
                strokeStyle="solid"
              />
              {/* 가운데 흰색 점선 */}
              <Polyline
                path={safetyPath.map((p) => ({
                  lat: p.latitude || 0,
                  lng: p.longitude || 0,
                }))}
                strokeWeight={2}
                strokeColor="#FFFFFF"
                strokeOpacity={1}
                strokeStyle="dash"
              />
            </>
          )}

          {/* CCTV 마커 표시 */}
          {safetyCctvs
            .filter((cctv) => cctv.latitude && cctv.longitude)
            .map((cctv, idx) => (
              <MapMarker
                key={`cctv-${idx}-${cctv.latitude}-${cctv.longitude}`}
                position={{ lat: cctv.latitude!, lng: cctv.longitude! }}
                image={{
                  src: "/map_marker/safety/cctv_marker.svg",
                  size: {
                    width: getScaledSize(32, zoomLevel),
                    height: getScaledSize(32, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(16, zoomLevel),
                      y: getScaledSize(16, zoomLevel),
                    },
                  },
                }}
                title="CCTV"
              />
            ))}

          {/* 보안등 마커 표시 */}
          {safetyLights
            .filter((light) => light.latitude && light.longitude)
            .map((light, idx) => (
              <MapMarker
                key={`light-${idx}-${light.latitude}-${light.longitude}`}
                position={{ lat: light.latitude!, lng: light.longitude! }}
                image={{
                  src: "/map_marker/safety/light_marker.svg",
                  size: {
                    width: getScaledSize(32, zoomLevel),
                    height: getScaledSize(32, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(16, zoomLevel),
                      y: getScaledSize(16, zoomLevel),
                    },
                  },
                }}
                title="보안등"
              />
            ))}

          {/* 지하철역 마커 표시 */}
          {accessibilitySubways
            .filter((subway) => subway.latitude && subway.longitude)
            .map((subway, idx) => (
              <MapMarker
                key={`subway-${idx}-${subway.latitude}-${subway.longitude}`}
                position={{ lat: subway.latitude!, lng: subway.longitude! }}
                image={{
                  src: "/map_marker/accessibility/subway_marker.svg",
                  size: {
                    width: getScaledSize(44, zoomLevel),
                    height: getScaledSize(44, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(22, zoomLevel),
                      y: getScaledSize(44, zoomLevel),
                    },
                  },
                }}
                title={subway.name}
                onClick={() => setSelectedAccessibility(subway)}
              />
            ))}

          {/* 버스 정류장 마커 표시 */}
          {accessibilityBuses
            .filter((bus) => bus.latitude && bus.longitude)
            .map((bus, idx) => (
              <MapMarker
                key={`bus-${idx}-${bus.latitude}-${bus.longitude}`}
                position={{ lat: bus.latitude!, lng: bus.longitude! }}
                image={{
                  src: "/map_marker/accessibility/bus_marker.svg",
                  size: {
                    width: getScaledSize(44, zoomLevel),
                    height: getScaledSize(44, zoomLevel),
                  },
                  options: {
                    offset: {
                      x: getScaledSize(22, zoomLevel),
                      y: getScaledSize(44, zoomLevel),
                    },
                  },
                }}
                title={bus.name}
                onClick={() => setSelectedAccessibility(bus)}
              />
            ))}

          {/* 접근성 정보 커스텀 오버레이 */}
          {selectedAccessibility &&
            selectedAccessibility.latitude &&
            selectedAccessibility.longitude && (
              <CustomOverlayMap
                position={{
                  lat: selectedAccessibility.latitude,
                  lng: selectedAccessibility.longitude,
                }}
                yAnchor={1.2}
              >
                <AccessibilityOverlay
                  item={selectedAccessibility}
                  onClose={() => clearSelectedAccessibility()}
                />
              </CustomOverlayMap>
            )}
        </>
      ) : (
        <>
          {/* 일반 모드: 리스트상의 모든 매물 렌더링 */}
          {propertiesOnMap.map((prop) => {
            const isSelected =
              selectedProperty?.lat === prop.lat &&
              selectedProperty?.lng === prop.lng;
            return (
              <CustomMarker
                key={prop.id}
                lat={prop.lat}
                lng={prop.lng}
                dealType={prop.dealType}
                price={prop.price}
                isSelected={isSelected}
                zoomLevel={zoomLevel}
              />
            );
          })}

          {/* 선택된 매물이 리스트에 없을 수도 있으므로 별도 렌더링 */}
          {selectedProperty &&
            !propertiesOnMap.find(
              (p) =>
                p.lat === selectedProperty.lat &&
                p.lng === selectedProperty.lng,
            ) && (
              <CustomMarker
                lat={selectedProperty.lat}
                lng={selectedProperty.lng}
                dealType={selectedProperty.dealType}
                price={selectedProperty.price}
                isSelected={true}
                zoomLevel={zoomLevel}
              />
            )}
        </>
      )}
    </Map>
  );
};

export default KakaoMap;
