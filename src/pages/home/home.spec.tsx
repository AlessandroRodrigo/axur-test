import { HomePage } from "./index";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../__tests__/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import { RequisitionResources } from "@/resources/requisition";

describe("Home page component", () => {
  vi.spyOn(RequisitionResources, "createRequisition").mockResolvedValue({
    id: "test",
  });

  it("should register a new requisition", async () => {
    renderWithProviders(<HomePage />);

    await waitFor(async () => {
      screen.getByRole("new-requisition-input").focus();
      await userEvent.paste("test");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByRole("new-requisition-button"));
    });

    await waitFor(() => {
      expect(RequisitionResources.createRequisition).toHaveBeenCalled();
      expect(RequisitionResources.createRequisition).toHaveBeenCalledWith({
        keyword: "test",
      });
    });
  });

  it("should clean input when a requisition is created", async () => {
    renderWithProviders(<HomePage />);

    await waitFor(async () => {
      screen.getByRole("new-requisition-input").focus();
      await userEvent.paste("test");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByRole("new-requisition-button"));
    });

    await waitFor(() => {
      expect(screen.getByRole("new-requisition-input")).toHaveValue("");
    });
  });

  it("should validate requisition input with at least 4 characters", async () => {
    renderWithProviders(<HomePage />);

    await waitFor(async () => {
      screen.getByRole("new-requisition-input").focus();
      await userEvent.paste("tes");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByRole("new-requisition-button"));
    });

    await waitFor(() => {
      expect(RequisitionResources.createRequisition).not.toHaveBeenCalled();
      expect(screen.getByRole("new-requisition-input")).toHaveValue("tes");
      expect(screen.getByRole("error-message")).toBeInTheDocument();
      expect(screen.getByRole("error-message")).toHaveTextContent(
        "A keyword deve ter no mínimo 4 caracteres"
      );
      expect(screen.getByRole("new-requisition-button")).toBeDisabled();
    });
  });

  it("should validate requisition input with at max 32 characters", async () => {
    renderWithProviders(<HomePage />);

    await waitFor(async () => {
      screen.getByRole("new-requisition-input").focus();
      await userEvent.paste("123456789012345678901234567890123");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByRole("new-requisition-button"));
    });

    await waitFor(() => {
      expect(RequisitionResources.createRequisition).not.toHaveBeenCalled();
      expect(screen.getByRole("new-requisition-input")).toHaveValue(
        "123456789012345678901234567890123"
      );
      expect(screen.getByRole("error-message")).toBeInTheDocument();
      expect(screen.getByRole("error-message")).toHaveTextContent(
        "A keyword deve ter no máximo 32 caracteres"
      );
      expect(screen.getByRole("new-requisition-button")).toBeDisabled();
    });
  });

  it("should display requisitions", async () => {
    renderWithProviders(<HomePage />);

    await waitFor(async () => {
      screen.getByRole("new-requisition-input").focus();
      await userEvent.paste("test");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByRole("new-requisition-button"));
    });

    await waitFor(() => {
      expect(screen.getByRole("requisition-card")).toBeInTheDocument();
    });
  });
});
