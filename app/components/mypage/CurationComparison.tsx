"use client";

import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { cn } from "@/app/lib/utils";
import CompareTag, { TagType } from "./CompareTag";
import AILoading from "../ui/AILoading";

interface CurationData {
  summary: string;
  tags: TagType[];
  isAiLoading?: boolean;
  scores: {
    소음: number;
    환경: number;
    안전: number;
    편의: number;
    접근성: number;
  };
}

interface CurationComparisonProps {
  data: (CurationData | null)[]; // Up to 3
}

const ScoreBar = ({
  label,
  scores,
}: {
  label: TagType;
  scores: (number | undefined)[];
}) => {
  const iconPaths = {
    소음: "/icons/priority/ativate/noise.svg",
    환경: "/icons/priority/ativate/environment.svg",
    안전: "/icons/priority/ativate/safety.svg",
    편의: "/icons/priority/ativate/convenience.svg",
    접근성: "/icons/priority/ativate/accessibility.svg",
  };

  // Calculate the maximum score among all selected properties (ignoring undefined)
  const validScores = scores.filter((s): s is number => s !== undefined);
  const maxScore = validScores.length > 0 ? Math.max(...validScores) : -1;

  return (
    <div className="flex flex-col gap-[12px] w-full">
      {/* Category Header */}
      <div className="border-[#e5e5e5] border-b border-solid h-[30px] relative shrink-0 w-full">
        <div className="absolute content-stretch flex gap-[9px] items-end left-0 top-0">
          <div className="relative shrink-0 size-[21px]">
            <Image
              src={iconPaths[label]}
              alt={label}
              fill
              className="object-contain"
            />
          </div>
          <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#063152] text-[16px] tracking-[0.55px] uppercase">
            {label}
          </p>
        </div>
      </div>

      {/* Bars Grid */}
      <div className="flex gap-[35px] items-start w-full">
        {scores.map((score, i) => {
          // Highlight only if it's the maximum score and greater than -1
          const isWinner =
            score !== undefined && score === maxScore && maxScore !== -1;

          return (
            <div key={i} className="flex-1">
              {score !== undefined ? (
                <div className="h-[44px] relative w-full">
                  <div className="absolute h-[20px] left-0 top-0 w-full flex items-center">
                    <p
                      className={cn(
                        "font-['Pretendard_Variable:Bold',sans-serif] text-[14px] tracking-[-0.15px]",
                        isWinner
                          ? "text-[#2ea98c] font-bold"
                          : "text-[#7b7b7b] font-semibold",
                      )}
                    >
                      {score}점
                    </p>
                  </div>
                  <div className="absolute bg-[#eaeeef] content-stretch flex flex-col h-[16px] items-start left-0 overflow-clip rounded-[100px] top-[28px] w-full">
                    <div
                      className={cn(
                        "h-full rounded-[16777200px] transition-all duration-1000",
                        isWinner ? "bg-[#30cea1]" : "bg-[#8298a8]",
                      )}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white content-stretch flex h-[62px] items-center justify-center px-[18px] py-[21px] relative rounded-[10px] w-full">
                  <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-[#9d9d9d] tracking-[0.55px] uppercase">
                    비교 결과가 없습니다
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CurationComparison = ({ data }: CurationComparisonProps) => {
  return (
    <div className="flex flex-col gap-[60px] w-full">
      {/* AI Summary Reports */}
      <div className="flex gap-[35px] w-full">
        {data.map((item, i) => (
          <div key={i} className="flex-1">
            {item ? (
              <div className="bg-white border-[#30cea1] border-[1.5px] border-solid rounded-[12px] p-[20px] pb-[19px] flex flex-col gap-[10px] h-full min-h-[172px]">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <div className="size-[24px] relative">
                    <Image
                      src="/icons/feature/list/curation.svg"
                      alt="logo"
                      width={18}
                      height={18}
                    />
                  </div>
                  <p className="font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-[#262626] tracking-[-0.6px]">
                    AI 요약 리포트
                  </p>
                </div>
                <div className="font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[1.4] text-[16px] text-[#7b7b7b] uppercase flex-1 flex flex-col items-center justify-center">
                  {item.isAiLoading ? (
                    <div className="scale-75 origin-center">
                      <AILoading />
                    </div>
                  ) : (
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold text-[#2EA98C]">
                            {children}
                          </strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-2">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="ml-1">{children}</li>
                        ),
                        div: ({ children }) => <div>{children}</div>,
                      }}
                    >
                      {item.summary}
                    </ReactMarkdown>
                  )}
                </div>
                <div className="flex gap-[6px] mt-auto">
                  {item.tags.map((tag) => (
                    <CompareTag key={tag} type={tag} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border-[#D9D9D9] border border-solid rounded-[10px] p-[20px] h-full min-h-[172px] flex items-center justify-center">
                <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold leading-[20px] text-[16px] text-[#9d9d9d] tracking-[0.55px] uppercase">
                  요약 결과가 없습니다
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Score Bars */}
      <div className="flex flex-col gap-[28px] w-full">
        <ScoreBar label="소음" scores={data.map((d) => d?.scores.소음)} />
        <ScoreBar label="환경" scores={data.map((d) => d?.scores.환경)} />
        <ScoreBar label="안전" scores={data.map((d) => d?.scores.안전)} />
        <ScoreBar label="편의" scores={data.map((d) => d?.scores.편의)} />
        <ScoreBar label="접근성" scores={data.map((d) => d?.scores.접근성)} />
      </div>
    </div>
  );
};

export default CurationComparison;
