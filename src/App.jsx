import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/Layouts/HomeLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import MinersPage from "./pages/myminers/MinersPage";

export default function App() {
  return (
    <BrowserRouter>
      <HomeLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="miners" element={<MinersPage />} />
        </Routes>
      </HomeLayout>
    </BrowserRouter>
  );
}
