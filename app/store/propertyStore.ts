import { create } from "zustand";
import { GetMainPropertyPropertyType } from "@/shared/api/generated/model/getMainPropertyPropertyType";
import { useUserStore } from "./userStore";

interface PropertyState {
  // 기존 상태
  selectedPropertyType: GetMainPropertyPropertyType;
  setPropertyType: (type: GetMainPropertyPropertyType) => void;
  syncWithUserPreference: () => void;

  // 검색 및 필터 상태 추가
  keyword: string;
  setKeyword: (keyword: string) => void;

  selectedTypes: string[]; // ['월세', '전세', '매매']
  setSelectedTypes: (types: string[] | ((prev: string[]) => string[])) => void;

  depositRange: [number, number];
  setDepositRange: (
    range: [number, number] | ((prev: [number, number]) => [number, number]),
  ) => void;

  monthlyRentRange: [number, number];
  setMonthlyRentRange: (
    range: [number, number] | ((prev: [number, number]) => [number, number]),
  ) => void;

  salePriceRange: [number, number];
  setSalePriceRange: (
    range: [number, number] | ((prev: [number, number]) => [number, number]),
  ) => void;

  spaceRange: [number, number];
  setSpaceRange: (
    range: [number, number] | ((prev: [number, number]) => [number, number]),
  ) => void;

  resetFilters: () => void;
}

export const usePropertyStore = create<PropertyState>()((set) => ({
  selectedPropertyType: GetMainPropertyPropertyType.APT,
  setPropertyType: (type) => set({ selectedPropertyType: type }),
  syncWithUserPreference: () => {
    const user = useUserStore.getState().user;
    if (user?.preferredType) {
      set({
        selectedPropertyType: user.preferredType as GetMainPropertyPropertyType,
      });
    }
  },

  // 검색 및 필터 초기값
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),

  selectedTypes: [],
  setSelectedTypes: (payload) =>
    set((state) => ({
      selectedTypes:
        typeof payload === "function" ? payload(state.selectedTypes) : payload,
    })),

  depositRange: [0, 100000],
  setDepositRange: (payload) =>
    set((state) => ({
      depositRange:
        typeof payload === "function" ? payload(state.depositRange) : payload,
    })),

  monthlyRentRange: [0, 500],
  setMonthlyRentRange: (payload) =>
    set((state) => ({
      monthlyRentRange:
        typeof payload === "function"
          ? payload(state.monthlyRentRange)
          : payload,
    })),

  salePriceRange: [0, 1000000],
  setSalePriceRange: (payload) =>
    set((state) => ({
      salePriceRange:
        typeof payload === "function" ? payload(state.salePriceRange) : payload,
    })),

  spaceRange: [0, 60],
  setSpaceRange: (payload) =>
    set((state) => ({
      spaceRange:
        typeof payload === "function" ? payload(state.spaceRange) : payload,
    })),

  resetFilters: () =>
    set({
      keyword: "",
      selectedTypes: [],
      depositRange: [0, 100000],
      monthlyRentRange: [0, 500],
      salePriceRange: [0, 1000000],
      spaceRange: [0, 60],
    }),
}));
