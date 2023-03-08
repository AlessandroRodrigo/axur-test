import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { useRequisitionStore } from "@/stores/requisition-store";
import { useResourcesStore } from "@/stores/resources-store";
import { renderWithProviders } from "src/__tests__/renderWithProviders";
import { RequisitionCard } from "@/components/requisition-card";
import { screen } from "@testing-library/react";
import { useToastController } from "@/components/toast/toast-controller";

const requisitionResources = useResourcesStore.getState().requisition;

vi.spyOn(requisitionResources, "getRequisitionStatus");

window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

describe("RequisitionCard component", () => {
  it("should call getRequisitionStatus when component is rendered", async () => {
    renderWithProviders(<RequisitionCard id="test" />);

    expect(requisitionResources.getRequisitionStatus).toHaveBeenCalled();
  });

  it("should remove requisition when remove button is clicked", async () => {
    useRequisitionStore.getState().saveNewRequisition("test");

    expect(useRequisitionStore.getState().recentRequisitionsId).toHaveLength(1);

    renderWithProviders(<RequisitionCard id="test" />);

    await userEvent.click(screen.getByRole("remove-requisition"));

    expect(useRequisitionStore.getState().recentRequisitionsId).toHaveLength(0);
  });

  it("should show toast feedback when remove button is clicked", async () => {
    const toast = useToastController.getState();

    vi.spyOn(toast, "show");

    renderWithProviders(<RequisitionCard id="test" />);

    await userEvent.click(screen.getByRole("remove-requisition"));

    expect(toast.show).toHaveBeenCalled();
  });

  it("should show requisition details when details button is clicked", async () => {
    renderWithProviders(<RequisitionCard id="test" />);

    await userEvent.click(screen.getByRole("details-requisition"));

    expect(screen.getByRole("side-modal-details")).toBeInTheDocument();
  });
});
