import { ToastOptions, toast } from "react-toastify";

const options: ToastOptions = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  theme: "dark",
};

type ToastType = "error" | "success" | "info" | "warning";

type ToastFunction = (
  message: string,
  type: ToastType,
  toastOption?: ToastOptions
) => void;

const useToastify = (): ToastFunction => {
  const showToast = (
    message: string,
    type: ToastType,
    toastOption?: ToastOptions
  ) => {
    toast[type](message, { ...options, ...toastOption });
  };

  return showToast;
};

export default useToastify;