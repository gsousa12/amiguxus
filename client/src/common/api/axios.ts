import axios from "axios";
import { env } from "../configuration/configuration";

export const api = axios.create({
  // baseURL: env.API_BASE_URL,
  baseURL: "http://localhost:3000/api", // Temporarily hardcoded for local development
  withCredentials: true,
});
