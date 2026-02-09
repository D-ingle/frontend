import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentViewState {
  viewedIds: number[];
  addViewedId: (id: number) => void;
  clearViewedIds: () => void;
}

export const useRecentViewStore = create<RecentViewState>()(
  persist(
    (set) => ({
      viewedIds: [],
      addViewedId: (id: number) =>
        set((state) => {
          // Remove if already exists to move it to the front
          const filtered = state.viewedIds.filter((vId) => vId !== id);
          // Add to the front and limit to 12
          const nextIds = [id, ...filtered].slice(0, 12);
          return { viewedIds: nextIds };
        }),
      clearViewedIds: () => set({ viewedIds: [] }),
    }),
    {
      name: "recent-view-storage",
    },
  ),
);
