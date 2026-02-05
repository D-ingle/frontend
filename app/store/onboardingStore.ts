import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * 온보딩 상태 인터페이스
 */
interface OnboardingState {
  preferredType: string;
  preferredDistricts: string[];
  preferredConditions: number[];
}

/**
 * 온보딩 액션 인터페이스
 */
interface OnboardingActions {
  setPreferredType: (type: string) => void;
  setPreferredDistricts: (districts: string[]) => void;
  setPreferredConditions: (conditions: number[]) => void;
  reset: () => void;
}

type OnboardingStore = OnboardingState & OnboardingActions;

/**
 * 온보딩 전용 스토어 (Zustand + Persist)
 * - 사용자가 온보딩 도중 이탈해도 데이터를 유지하기 위해 localStorage에 저장합니다.
 * - 온보딩 완료 시 reset()을 호출하여 데이터를 비워줍니다.
 */
export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      // 초기 상태
      preferredType: "",
      preferredDistricts: [],
      preferredConditions: [],

      // 액션들
      setPreferredType: (type) => set({ preferredType: type }),
      setPreferredDistricts: (districts) =>
        set({ preferredDistricts: districts }),
      setPreferredConditions: (conditions) =>
        set({ preferredConditions: conditions }),

      // 초기화
      reset: () =>
        set({
          preferredType: "",
          preferredDistricts: [],
          preferredConditions: [],
        }),
    }),
    {
      name: "dhome-onboarding-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
