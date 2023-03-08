import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type RequisitionStore = {
  recentRequisitionsId: string[];
  saveNewRequisition: (requisition: string) => void;
  removeRequisition: (requisition: string) => void;
};

export const useRequisitionStore = create(
  persist<RequisitionStore>(
    (set) => ({
      recentRequisitionsId: [],
      saveNewRequisition: (requisition: string) => {
        set((state) => ({
          recentRequisitionsId: [...state.recentRequisitionsId, requisition],
        }));
      },
      removeRequisition: (requisition: string) => {
        set((state) => ({
          recentRequisitionsId: state.recentRequisitionsId.filter(
            (id) => id !== requisition
          ),
        }));
      },
    }),
    {
      name: "requisition-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
