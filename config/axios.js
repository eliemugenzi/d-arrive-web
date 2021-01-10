import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    platform: "d-arrive-web",
    Authorization: `JWT ${localStorage.getItem("JWT_TOKEN")}`
  }
});
