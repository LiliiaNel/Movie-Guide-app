import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#1f2937",
          color: "#ffb347",
          fontWeight: 500,
          border: "1px solid #333",
          borderRadius: "0.5rem",
          padding: "0.6rem 1rem",
        },
      }}
      containerStyle={{
        position: "fixed", 
        top: "100px",  
        right: "20px",  
        zIndex: 9999,
    }}
    />
  );
}
