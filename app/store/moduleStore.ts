import { create } from "zustand";

/**
 * 모듈 ID 타입 정의
 */
export type ModuleId =
  | "noise"
  | "environment"
  | "safety"
  | "accessibility"
  | "convenience";

/**
 * 기본 모듈 순서 (ID 매핑 기준)
 * 1: Noise, 2: Environment, 3: Safety, 4: Accessibility, 5: Convenience
 */
const DEFAULT_ORDER: ModuleId[] = [
  "noise",
  "environment",
  "safety",
  "accessibility",
  "convenience",
];

interface ModuleState {
  activeModules: ModuleId[]; // 활성화된 모듈 ID 리스트 (최신순)
  toastMessage: string | null;

  toggleModule: (id: ModuleId) => void;
  resetModules: (ids?: ModuleId[]) => void;
  setToastMessage: (message: string | null) => void;
  getDisplayOrder: () => ModuleId[]; // 렌더링 순서 계산 (활성 모듈 우선 + 미활성 모듈)
}

export const useModuleStore = create<ModuleState>((set, get) => ({
  activeModules: [],
  toastMessage: null,

  toggleModule: (id) => {
    const { activeModules } = get();
    const isActive = activeModules.includes(id);

    if (isActive) {
      // 끄는 경우: 리스트에서 제거
      set({
        activeModules: activeModules.filter((m) => m !== id),
      });
    } else {
      // 켜는 경우: 맨 앞에 추가
      const newActiveModules = [id, ...activeModules];

      // 정책: 4번째 정보를 켤 시 토스트 알림
      if (newActiveModules.length === 4) {
        set({
          toastMessage:
            "필요한 정보에 집중할 수 있도록 정보는 최대 3개 선택을 권장합니다.",
        });
      }

      set({ activeModules: newActiveModules });
    }
  },

  resetModules: (ids = []) => set({ activeModules: ids }),

  setToastMessage: (message) => set({ toastMessage: message }),

  getDisplayOrder: () => {
    const { activeModules } = get();
    // 활성화된 모듈 우선 + 나머지는 기본 순서 유지
    const inactiveModules = DEFAULT_ORDER.filter(
      (id) => !activeModules.includes(id),
    );
    return [...activeModules, ...inactiveModules];
  },
}));
