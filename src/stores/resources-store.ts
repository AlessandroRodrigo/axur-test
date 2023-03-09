import { create } from "zustand";
import { RequisitionResources } from "@/resources/requisition";

type ResourcesStore = {
  requisition: typeof RequisitionResources;
};

export const useResources = create<ResourcesStore>(() => ({
  requisition: RequisitionResources,
}));
