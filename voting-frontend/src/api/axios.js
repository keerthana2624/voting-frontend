// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // your backend URL
});

// Read the token from localStorage and include it on every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');  // set in Login
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
