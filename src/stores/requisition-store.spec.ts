import { useRequisitionStore } from "./requisition-store";
import { act, renderHook } from "@testing-library/react";

describe("RequisitionStore", () => {
  it("should add a new requisition", async () => {
    const { result } = renderHook(() => useRequisitionStore());

    act(() => {
      result.current.saveNewRequisition("1");
    });

    expect(result.current.recentRequisitionsId).toEqual(["1"]);
  });

  it("should remove a requisition", async () => {
    const { result } = renderHook(() => useRequisitionStore());

    act(() => {
      result.current.saveNewRequisition("1");
      result.current.saveNewRequisition("2");
    });

    act(() => {
      result.current.removeRequisition("1");
    });

    expect(result.current.recentRequisitionsId).toEqual(["2"]);
  });
});
