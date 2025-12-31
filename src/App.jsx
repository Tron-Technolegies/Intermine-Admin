import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomeLayout from "./components/Layouts/HomeLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import MinersPage from "./pages/myminers/MinersPage";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/clients/ClientDetails";
import Issues from "./pages/issues/Issues";
import OfflineMiners from "./pages/offlineminers/OfflineMiners";
import Agreements from "./pages/agreements/Agreements";
import Warranty from "./pages/WarrantyPage/Warranty";
import MiningFarm from "./pages/miningfarm/MiningFarm";
import Notifications from "./pages/notification/Notifications";
import PendingMessages from "./pages/pendingmessages/PendingMessages";
import SettingsPage from "./pages/settingspage/Settings";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ErrorPage from "./pages/error/ErrorPage";
import SingleMinerPage from "./pages/myminers/SingleMinerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "miners", element: <MinersPage /> },
      { path: "miners/:id", element: <SingleMinerPage /> },
      { path: "clients", element: <Clients /> },
      { path: "clients/:id", element: <ClientDetails /> },
      { path: "issues", element: <Issues /> },
      { path: "offline-miners", element: <OfflineMiners /> },
      { path: "agreements", element: <Agreements /> },
      { path: "warranties", element: <Warranty /> },
      { path: "farms", element: <MiningFarm /> },
      { path: "notifications", element: <Notifications /> },
      { path: "messages", element: <PendingMessages /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  // PUBLIC ROUTES
  { path: "/login", element: <LoginPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/verify-otp", element: <VerifyOtpPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
]);

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <RouterProvider router={router} />
    </>
  );
}
