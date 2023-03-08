import { Button } from "@/components/button";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "src/__tests__/renderWithProviders";
import { describe, expect, it, vi } from "vitest";

describe("Button component", () => {
  it("should show spinner when is loading", () => {
    renderWithProviders(<Button isLoading>Test</Button>);

    expect(screen.queryByText("Test")).not.toBeInTheDocument();
    expect(screen.getByRole("spinner")).toBeInTheDocument();
  });

  it("should call onClick when clicked", async () => {
    const onClick = vi.fn();
    renderWithProviders(<Button onClick={onClick}>Test</Button>);

    await userEvent.click(screen.getByText("Test"));

    expect(onClick).toHaveBeenCalled();
  });
});
