// import axiosRetry from 'axios-retry';
import BaseRequest from "./utils/request";
import { TIME_OUT } from "./constants/config";
import { INSTANCE_INTERCEPTORS } from "./utils/interceptor";

import { initPlugins } from "./utils/register";

initPlugins();

const defaultAxiosRequestConfig = { timeout: TIME_OUT };

// api axios instance
const apiRequest = new BaseRequest({
  ...defaultAxiosRequestConfig,
  interceptors: INSTANCE_INTERCEPTORS,
});

// CDN axios instance
export const cdnRequest = new BaseRequest({
  ...defaultAxiosRequestConfig,
});

export default apiRequest;
