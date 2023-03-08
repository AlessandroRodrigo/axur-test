import { Toast } from "@/components/toast";
import { useToastController } from "@/components/toast/toast-controller";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "src/__tests__/renderWithProviders";
import { describe, expect, it } from "vitest";

describe("Toast component", () => {
  it("should show toast when toast is called", async () => {
    const toastController = useToastController.getState();

    renderWithProviders(<Toast />);

    act(() => {
      toastController.show({
        title: "test",
        description: "test",
        status: "success",
      });
    });

    const toastElement = await screen.getByRole("toast");

    expect(toastElement).toBeInTheDocument();
  });

  it("should close toast when close button is clicked", async () => {
    const toastController = useToastController.getState();

    renderWithProviders(<Toast />);

    act(() => {
      toastController.show({
        title: "test",
        description: "test",
        status: "success",
      });
    });

    const toastElement = await screen.getByRole("toast");

    await userEvent.click(screen.getByRole("close-toast"));

    waitFor(() => {
      expect(toastElement).not.toBeInTheDocument();
    });
  });

  it("should show a success toast", async () => {
    const toastController = useToastController.getState();

    renderWithProviders(<Toast />);

    act(() => {
      toastController.show({
        title: "test",
        description: "test",
        status: "success",
      });
    });

    const successIcon = await screen.getByRole("toast-status-success");
    const errorIcon = await screen.queryByRole("toast-status-error");

    expect(successIcon).toBeInTheDocument();
    expect(errorIcon).not.toBeInTheDocument();
  });

  it("should show a error toast", async () => {
    const toastController = useToastController.getState();

    renderWithProviders(<Toast />);

    act(() => {
      toastController.show({
        title: "test",
        description: "test",
        status: "error",
      });
    });

    const errorIcon = await screen.getByRole("toast-status-error");
    const successIcon = await screen.queryByRole("toast-status-success");

    expect(errorIcon).toBeInTheDocument();
    expect(successIcon).not.toBeInTheDocument();
  });
});
