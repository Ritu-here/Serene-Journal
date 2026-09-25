import axios from "axios";

const API = axios.create({
  baseURL: "https://serene-journal-ffel.vercel.app/api",
});

export default API;