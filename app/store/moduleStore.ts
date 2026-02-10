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
      // 켜는 경우: 이미 3개인 경우 추가 차단
      if (activeModules.length >= 3) {
        set({
          toastMessage: "필요한 정보는 최대 3개까지만 선택할 수 있습니다.",
        });
        return;
      }
      // 3개 미만인 경우만 추가
      set({ activeModules: [id, ...activeModules] });
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
