import React, { useContext, useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { UserContext } from "../../UserContext";
import Loading from "../Loading";

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useLoaderData();
  const { isLoading, data } = useGetUserInfo();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 lg:ml-72 transition-all duration-300">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="p-4 bg-white min-h-screen mt-[60px] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
