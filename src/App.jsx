import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "miners", element: <MinersPage /> },
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
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
