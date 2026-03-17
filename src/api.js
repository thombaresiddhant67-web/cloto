import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data; // { token, userDto }
};

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export { api };
