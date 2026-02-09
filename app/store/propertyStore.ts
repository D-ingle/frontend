import { create } from "zustand";
import { GetMainPropertyPropertyType } from "@/shared/api/generated/model/getMainPropertyPropertyType";
import { useUserStore } from "./userStore";

interface PropertyState {
  selectedPropertyType: GetMainPropertyPropertyType;
  setPropertyType: (type: GetMainPropertyPropertyType) => void;
  syncWithUserPreference: () => void;
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
}));
