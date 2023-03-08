import { IconButton } from "@/components/icon-button";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "src/__tests__/renderWithProviders";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("IconButton component", () => {
  it("should call onClick when clicked", async () => {
    const onClick = vi.fn();
    renderWithProviders(<IconButton icon="test" onClick={onClick} />);

    await userEvent.click(screen.getByRole("icon-button"));

    expect(onClick).toHaveBeenCalled();
  });
});
