"use client";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useEffect } from "react";
import { useNotificationStore } from "@/lib/zustand/providers/NotificationStateProvider";
export default function Notification() {
  const { isOpen, type, message } = useNotificationStore((store) => store);
  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen, message, type]);
  return <ToastContainer />;
}
