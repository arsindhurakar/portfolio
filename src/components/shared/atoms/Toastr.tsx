import { Toaster } from "react-hot-toast";

export const Toastr = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        position: "top-right",
        // Default styles for all toasts
        style: {
          borderRadius: "100px",
          fontSize: "13px",
          color: "var(--color-white)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        },
        success: {
          style: {
            background: "#166534",
          },
        },
        error: {
          style: {
            background: "#7f1d1d",
          },
        },
      }}
    />
  );
};
