"use client";

import React, { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { useMapModeStore } from "../../store/mapModeStore";

const KakaoMap = () => {
  const { selectedProperty } = useMapModeStore();
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 기본 중심값: 약수역
  const defaultCenter = { lat: 37.5545, lng: 127.0112 };

  // 선택된 매물이 있으면 해당 좌표를, 없으면 기본 좌표를 사용
  const mapCenter = selectedProperty
    ? { lat: selectedProperty.lat, lng: selectedProperty.lng }
    : defaultCenter;

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || "",
  });

  // 매물이 선택되었을 때 오프셋 적용 (왼쪽 800px 패널 고려)
  useEffect(() => {
    if (map && selectedProperty) {
      // 1. 먼저 해당 좌표로 중심 이동
      const moveLatLng = new kakao.maps.LatLng(
        selectedProperty.lat,
        selectedProperty.lng,
      );
      map.setCenter(moveLatLng);

      // 2. 우측 가시 영역 중앙으로 오게 하기 위해 왼쪽(이미지상 좌측이동 = 지도뷰 우측이동)으로 -400px 패닝
      // Sidebar(800px) / 2 = 400px 만큼 우측으로 밀어줌
      map.panBy(-400, 0);
    }
  }, [map, selectedProperty]);

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
    >
      {selectedProperty && (
        <MapMarker
          position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
          title={selectedProperty.title}
        />
      )}
    </Map>
  );
};

export default KakaoMap;
