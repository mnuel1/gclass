// src/api/axios.js
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:4000', // Replace with your API base URL
    timeout: 10000,                     // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

 
export const authapi = axios.create({
    baseURL: 'http://localhost:4000', // Replace with your API base URL
    timeout: 10000,                     // Timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});