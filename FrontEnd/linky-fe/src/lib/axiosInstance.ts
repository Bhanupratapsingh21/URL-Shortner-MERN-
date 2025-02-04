"use client"
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensures cookies (if used) are sent with requests
});

export default axiosInstance;