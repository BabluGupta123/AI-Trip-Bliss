import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { toast, Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/Header.jsx";
import path from "path";
import Viewtrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/create-trip",
    element: <CreateTrip />,
  },

  { path: "/view-trip/:tripId", element: <Viewtrip /> },

  {
    path: "my-trips",
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />

      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
