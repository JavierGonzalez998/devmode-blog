import { createStore } from "zustand/vanilla";
import { toast, Bounce } from "react-toastify";
export type NotificationState = {
  isOpen: boolean;
  message: string;
  type: string;
};

export type NotificationActions = {
  showToast: (message: string, type: string) => void;
  hideToast: () => void;
};

export type NotificationStore = NotificationState & NotificationActions;

export const defaultInitState: NotificationState = {
  isOpen: false,
  message: "",
  type: "success",
};

export const createNotificationStore = (
  initState: NotificationState = defaultInitState,
) => {
  return createStore<NotificationStore>()((set) => ({
    ...initState,
    showToast: (message: string, type = "success") => {
      toast(message, {
        type: type === "success" ? 'success': type === "error"? 'error': 'info',
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    },
    hideToast: () => set({ isOpen: false }),
  }));
};
