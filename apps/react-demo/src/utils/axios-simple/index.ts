import { INSTANCE_INTERCEPTORS, TIME_OUT } from "./config";
import BaseRequest from "./request";

const defaultAxiosRequestConfig = {
  timeout: TIME_OUT,
};

const blogRequest = new BaseRequest({
  ...defaultAxiosRequestConfig,
  baseURL: "/blogApi",
  interceptors: INSTANCE_INTERCEPTORS,
});

export { blogRequest };
