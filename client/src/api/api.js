import axios from "axios";

// your backend URL (Render)
const API = axios.create({
  baseURL: "https://urban-company-4db5.onrender.com/",
});

export default API;