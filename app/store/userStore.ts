import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * 유저 정보 인터페이스
 * - username: 사용자 이름
 * - preferredType: 선호하는 주거 형태
 * - preferredConditions: 선호하는 주거 조건 (ID 배열)
 */
interface User {
  username: string;
  preferredType: string;
  preferredConditions: number[];
}

/**
 * Zustand 스토어 상태 인터페이스
 * - user: 현재 로그인한 유저 정보 (없으면 null)
 * - setUser: 유저 정보를 저장하는 함수
 * - clearUser: 유저 정보를 삭제(로그아웃)하는 함수
 */
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

/**
 * 전역 유저 스토어 (Zustand + Persist)
 * - persist 미들웨어를 사용하여 localStorage에 자동 저장됩니다.
 * - 새로고침해도 데이터가 유지됩니다.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "dhome-user-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 저장소로 localStorage 사용
    },
  ),
);
