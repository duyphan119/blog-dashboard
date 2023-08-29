import Toastify from "toastify-js";

export const toastSuccess = (text: string) => {
  Toastify({
    text,
    duration: 3000,
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #35A29F, #00ADB5)",
    },
  }).showToast();
};

export const toastError = (text: string) => {
  Toastify({
    text,
    duration: 3000,
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #FF0060, #F73859)",
    },
  }).showToast();
};
