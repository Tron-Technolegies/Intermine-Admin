import { redirect } from "react-router-dom";
import api from "../api/api";

export const adminLoader = async () => {
  try {
    const response = await api.get("/api/v1/user/info");
    const user = response.data;
    if (!user || user.role !== "Admin") {
      throw new Error("No Access");
    }
    return user;
  } catch (error) {
    return redirect("/login");
  }
};
