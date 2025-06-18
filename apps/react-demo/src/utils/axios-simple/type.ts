import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Instance
export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: AxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (config: AxiosResponse<T>) => AxiosResponse<T>;
  responseInterceptorCatch?: (err: any) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
  spinLoading?: boolean;
}
