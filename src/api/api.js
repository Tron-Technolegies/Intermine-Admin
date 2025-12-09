import axios from "axios";

const api = axios.create({
  baseURL: "https://intermine-backend.onrender.com",
  withCredentials: true,
});

export default api;
