"use client";

import React from "react";
import Curation from "../components/curation/Curation";

export default function OnboardingStartPage() {
  return (
    <main
      className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #E2F6F6 0%, #FFF 100%), #FFF",
      }}
    >
      <Curation
        content="반가워요!"
        description="몇 가지 질문에 대답해주시면 최적의 매물을 찾는데 도움을 드릴게요."
        buttonLabel="시작하기"
        buttonLink="/onboarding/steps"
        isLoading={false}
        transparentBg={true}
      />
    </main>
  );
}
