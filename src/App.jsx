import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/Layouts/HomeLayout";
import Dashboard from "./pages/dashboard/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <HomeLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </HomeLayout>
    </BrowserRouter>
  );
}
