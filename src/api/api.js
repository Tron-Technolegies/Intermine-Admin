import axios from "axios";

const api = axios.create({
  baseURL: "https://api.intermine-solutions.de",
  withCredentials: true,
});

export default api;

// https://api.intermine-solutions.de
// http://localhost:3000
