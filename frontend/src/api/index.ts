import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  withCredentials: false,
  headers: {
    "Accept": "application/json",
  },
});

// optional: attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tailoriq_token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export default api;
