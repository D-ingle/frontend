"use client";

import Curation from "./components/Curation";

export default function Home() {
  return (
    <main>
      <Curation
        content="반가워요!"
        description="몇 가지 질문에 대답해주시면 최적의 매물을 찾는데 도움을 드릴게요."
        buttonLabel="시작하기"
        buttonLink="/onboarding"
        isLoading={false}
      />
    </main>
  );
}
