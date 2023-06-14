import axios from "axios";

// https://movie-review-app-backend-nqiu.onrender.com/api
// http://localhost:8000/api
const client = axios.create({
  baseURL: "https://movie-review-app-backend-nqiu.onrender.com/api",
});

export default client;
