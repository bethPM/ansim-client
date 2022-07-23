import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "https://ansim-app.herokuapp.com/" : "http://localhost:5000/",
});

// instance.interceptors.request.use(config);

export default instance;
