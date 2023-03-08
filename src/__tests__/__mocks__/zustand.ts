import { create as zustandCreate, StateCreator } from "zustand";
import { act } from "react-dom/test-utils";
import { vi } from "vitest";

const storeResetFns = new Set<() => void>();

const mockCreateFn =
  (actualCreate: typeof zustandCreate) =>
  <S>(createState: StateCreator<S>) => {
    const store = actualCreate<S>(createState);
    const initialState = store.getState();
    storeResetFns.add(() => store.setState(initialState, true));
    return store;
  };

vi.mock("zustand", async () => {
  const zustand = await vi.importActual("zustand");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return { ...zustand, create: mockCreateFn(zustand.create) };
});

beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn) => resetFn()));
});
