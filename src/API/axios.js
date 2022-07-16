import axios from "axios";

const BASIC_URL = "http://192.168.0.124:5000";

export default axios.create({
  baseURL: BASIC_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASIC_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
