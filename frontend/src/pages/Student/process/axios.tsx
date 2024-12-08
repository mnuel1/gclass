// src/api/axios.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.actsclassroom.online", // Replace with your API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

export const authapi = axios.create({
  baseURL: "https://api.actsclassroom.online", // Replace with your API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});
