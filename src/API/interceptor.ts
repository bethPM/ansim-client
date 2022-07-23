import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/",
});

// instance.interceptors.request.use(config);

export default instance;
