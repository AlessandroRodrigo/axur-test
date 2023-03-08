import { Input } from "@/components/input";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "src/__tests__/renderWithProviders";
import { describe, expect, it, vi } from "vitest";

describe("Input component", () => {
  it("should call onChange when value changes", async () => {
    const onChange = vi.fn();
    renderWithProviders(<Input onChange={onChange} />);

    await userEvent.type(screen.getByRole("input"), "test");

    expect(onChange).toHaveBeenCalled();
  });

  it("should show error message when invalid", async () => {
    renderWithProviders(<Input errorMessage="test" />);

    expect(screen.getByRole("error-message")).toHaveTextContent("test");
  });
});
