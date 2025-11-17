import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/Layouts/HomeLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import MinersPage from "./pages/myminers/MinersPage";
import Clients from "./pages/clients/Clients";
import ClientDetails from "./pages/clients/ClientDetails";
import Issues from "./pages/issues/Issues";
import OfflineMiners from "./pages/offlineminers/OfflineMiners";
import Agreements from "./pages/agreements/Agreements";

export default function App() {
  return (
    <BrowserRouter>
      <HomeLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="miners" element={<MinersPage />} />
          <Route path="clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="issues" element={<Issues />} />
          <Route path="offline-miners" element={<OfflineMiners />} />
          <Route path="agreements" element={<Agreements />} />
        </Routes>
      </HomeLayout>
    </BrowserRouter>
  );
}
