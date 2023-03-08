import { SideModal } from "@/components/side-modal";
import { renderWithProviders } from "src/__tests__/renderWithProviders";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

describe("SideModal component", () => {
  it("should call onClose when close-side-modal is clicked", async () => {
    const onClose = vi.fn();

    renderWithProviders(<SideModal open onClose={onClose} />);

    await userEvent.click(screen.getByRole("close-side-modal"));

    expect(onClose).toHaveBeenCalled();
  });

  it("should call onClose when overlay is clicked", async () => {
    const onClose = vi.fn();

    renderWithProviders(<SideModal open onClose={onClose} />);

    await userEvent.click(screen.getByRole("side-modal-overlay"));

    expect(onClose).toHaveBeenCalled();
  });

  it("should render a list of url", async () => {
    const urls = ["test", "test"];

    renderWithProviders(<SideModal open onClose={vi.fn()} urls={urls} />);

    const list = await screen.findAllByText("test");

    expect(list).toHaveLength(2);
  });
});
