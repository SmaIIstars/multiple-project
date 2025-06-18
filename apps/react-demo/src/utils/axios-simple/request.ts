import axios, { AxiosInstance, AxiosResponse } from "axios";
import { GLOBAL_INTERCEPTORS } from "./config";
import { RequestConfig, RequestInterceptors } from "./type";

class BaseRequest {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;

  constructor(config: RequestConfig) {
    this.instance = axios.create(config);

    // Global
    this.instance.interceptors.request.use(
      GLOBAL_INTERCEPTORS.REQUEST_INTERCEPTOR,
      GLOBAL_INTERCEPTORS.REQUEST_INTERCEPTOR_CATCH
    );
    this.instance.interceptors.response.use(
      GLOBAL_INTERCEPTORS.RESPONSE_INTERCEPTOR,
      GLOBAL_INTERCEPTORS.RESPONSE_INTERCEPTOR_CATCH
    );

    // Instance
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

  request<T>(config: RequestConfig<T>): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      // single request
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      this.instance
        .request<any, AxiosResponse<T>>(config)
        .then((res) => {
          // single response
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          // single response
          if (config.interceptors?.responseInterceptor) {
            config?.interceptors?.responseInterceptorCatch?.(err);
          } else {
            reject(err instanceof Error ? err : new Error(String(err)));
          }
        });
    });
  }

  get<T>(config: RequestConfig<T>): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: RequestConfig<T>): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: RequestConfig<T>): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: RequestConfig<T>): Promise<AxiosResponse<T>> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default BaseRequest;
