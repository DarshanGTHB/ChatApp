import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000, // Set a timeout of 10 seconds
    withCredentials: true, // Include credentials in requests
});

export default axiosInstance;