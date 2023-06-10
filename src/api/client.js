import axios from "axios";

// https://movie-review-app-backend-nqiu.onrender.com/api
const client = axios.create({
  baseURL: "https://movie-review-app-backend-nqiu.onrender.com/api",
});

export default client;
