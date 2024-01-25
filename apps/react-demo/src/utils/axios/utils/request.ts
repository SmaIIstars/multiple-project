import axios from "axios";
// type
import { AxiosInstance } from "axios";
import { RequestInterceptors, RequestConfig } from "../types";
import { GLOBAL_INTERCEPTORS } from "../utils/interceptor";

class BaseRequest {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  requestConfig?: RequestConfig<any>;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    // global interceptor
    this.instance.interceptors.request.use(
      GLOBAL_INTERCEPTORS?.REQUEST_INTERCEPTOR,
      GLOBAL_INTERCEPTORS?.REQUEST_INTERCEPTOR_CATCH
    );
    this.instance.interceptors.response.use(
      GLOBAL_INTERCEPTORS?.RESPONSE_INTERCEPTOR,
      GLOBAL_INTERCEPTORS?.RESPONSE_INTERCEPTOR_CATCH
    );

    // instance interceptor
    this.interceptors = config.interceptors;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    this.requestConfig = config;
    return new Promise((resolve, reject) => {
      // There is no error catch interceptor here, it's caught where the request is called
      // single request interceptor
      if (config?.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // single response interceptor
          if (config?.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          // single response interceptor
          if (config?.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err);
          }
          reject(err);
        });
    });
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default BaseRequest;
