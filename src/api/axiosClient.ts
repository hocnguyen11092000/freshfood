import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "utils/jwt";

let tokenLocal = localStorage.getItem("token");

if (tokenLocal) {
  tokenLocal = JSON.stringify(tokenLocal);
}

const axiosClient = axios.create({
  baseURL: "https://orchid.tk/api/v1",
  withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${getToken() || tokenLocal}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
