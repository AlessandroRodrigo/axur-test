import { create } from "zustand";

type ToastState = {
  title: string;
  description: string;
  status: "success" | "error";
};

type ToastController = {
  state: ToastState;
  show: (toastState: ToastState) => void;
  reset: () => void;
};

const initialState: ToastState = {
  title: "",
  description: "",
  status: "success",
};

export const useToastController = create<ToastController>((set) => ({
  state: {
    title: "",
    description: "",
    status: "success",
  },
  show: ({ title, description, status }) => {
    set({
      state: {
        title,
        description,
        status,
      },
    });
  },
  reset: () => {
    set({
      state: initialState,
    });
  },
}));
