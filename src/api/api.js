import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://api.intermine-solutions.de",
  withCredentials: true,
});

export default api;

// https://api.intermine-solutions.de
// http://localhost:3000
