import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(async config => {
  // console.log("api");
  const token = getToken();
  config.headers.Accept = `application/json`;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;