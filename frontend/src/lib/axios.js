import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://chatapp-bojl.onrender.com/api",
    timeout: 10000, // Set a timeout of 10 seconds
    withCredentials: true, // Include credentials in requests
});

export default axiosInstance;