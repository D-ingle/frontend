"use client";

import React from "react";
import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || "", // 발급받은 JavaScript 키
  });

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
      center={{ lat: 37.5545, lng: 127.0112 }} // 약수역 부근 좌표
      style={{ width: "100%", height: "100%" }}
      level={3}
    >
      {/* 마커나 인포윈도우 등 추가 컴포넌트를 여기에 넣을 수 있습니다. */}
    </Map>
  );
};

export default KakaoMap;
