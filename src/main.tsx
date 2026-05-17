import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./index.css";

import App from "./App.tsx";

const queryClient = new QueryClient();

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <QueryClientProvider
     client={queryClient}
     >

      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          style: {
            borderRadius: "16px",
            padding: "14px 16px",
            background: "#0f172a",
            color: "#ffffff",
            fontSize: "14px",
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>
);