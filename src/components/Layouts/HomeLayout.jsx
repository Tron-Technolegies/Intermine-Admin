import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { UserContext } from "../../UserContext";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading, data, error, isSuccess } = useGetUserInfo();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  //  Handle error redirect
  useEffect(() => {
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  //  Handle success redirect + store user
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);

      // If not admin, redirect
      if (data.role !== "Admin") {
        navigate("/login");
      }
    }
  }, [isSuccess, data, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 md:ml-64">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 bg-white min-h-screen mt-[60px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
