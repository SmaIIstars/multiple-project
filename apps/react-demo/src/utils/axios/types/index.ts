import { AxiosRequestConfig, AxiosResponse } from "axios";
import { PluginRequestConfig } from "./plugin";

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: any) => any;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
  loading?: boolean;
  plugin?: PluginRequestConfig;
}
