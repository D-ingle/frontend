"use client";
import Image from "next/image";
import InfoBadge from "./InfoBadge";
import MainVisual from "./MainVisual";

export default function LandingContainer() {
  return (
    <div className="relative w-full h-screen bg-white overflow-hidden mx-auto max-w-[1920px]">
      <div className="absolute left-1/2 -translate-x-1/2 top-[180px] w-[588px] h-[588px] bg-[#30CEA1]/5 blur-[100px] rounded-[16777200px] z-0 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-10 flex items-start justify-center">
        <div className="relative">
          <Image
            src="/images/landingpagebg.svg"
            alt="Landing Page Background"
            width={983}
            height={662.5}
            priority
          />
        </div>
      </div>

      {/* 메인 콘텐츠 영역 (수평/수직 정렬 최적화) */}
      <div className="relative z-40 flex flex-col items-center justify-start h-full pt-[160px]">
        <MainVisual />
      </div>

      {/* 정보 배지들 (디자인 좌표에서 수직 이동 반영 -80px) */}
      {/* 접근성 정보 (3120:11886) */}
      <InfoBadge
        label="접근성 정보"
        icon="/icons/module/accessibility/whitetrain.svg"
        bgColor="#7CB7CD"
        style={{ left: "calc(16.67% + 196px)", top: "318px" }}
        width={12.667}
        height={15.833}
      />
      {/* 소음 정보 (3120:11868) */}
      <InfoBadge
        label="소음 정보"
        icon="/icons/module/noise/whitenoise.svg"
        bgColor="#FBBA78"
        style={{ left: "calc(25% + 157px)", top: "453px" }}
        width={17.529}
        height={15.75}
      />
      {/* 환경 정보 (3120:11893) */}
      <InfoBadge
        label="환경 정보"
        icon="/icons/module/environment/whitetree.svg"
        bgColor="#82AA82"
        style={{ left: "calc(16.67% + 227px)", top: "630px" }}
        width={14.853}
        height={18.567}
      />
      {/* 편의 정보 (3120:11880) */}
      <InfoBadge
        label="편의 정보"
        icon="/icons/module/convenience/whiteapt.svg"
        bgColor="#AB9FD5"
        style={{ left: "calc(66.67% - 88px)", top: "371px" }}
        width={17.063}
        height={16.188}
      />
      {/* 안전 정보 (3120:11874) */}
      <InfoBadge
        label="안전 정보"
        icon="/icons/module/safety/white_cctv.svg"
        bgColor="#F48787"
        style={{ left: "calc(66.67% - 39px)", top: "561px" }}
        width={17.437}
        height={17.5}
      />
    </div>
  );
}
