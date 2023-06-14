import axios from "axios";

// https://movie-review-app-backend-nqiu.onrender.com/api
const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default client;
