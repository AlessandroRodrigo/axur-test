import { create } from "zustand";
import { RequisitionResources } from "@/resources/requisition";

type ResourcesStore = {
  requisition: typeof RequisitionResources;
};

export const useResourcesStore = create<ResourcesStore>(() => ({
  requisition: RequisitionResources,
}));
