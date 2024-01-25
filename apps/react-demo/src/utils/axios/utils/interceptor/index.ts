import { PLUGIN_ACTIONS, TIME_OUT } from "../../constants/config";
// import store from '@/store';
// import { updateLoading } from '@/store/exam/reducer';

import { filterByAction } from "../filter";

import type { RequestConfig, RequestInterceptors } from "../../types";
import type { AxiosError } from "axios";
import { PluginAction } from "../../types/plugin";

// global interceptor
export const GLOBAL_INTERCEPTORS = {
  REQUEST_INTERCEPTOR: (config: any) => {
    return config;
  },

  REQUEST_INTERCEPTOR_CATCH: (err: any) => {
    return Promise.reject(err);
  },

  RESPONSE_INTERCEPTOR: (res: any) => {
    return res;
  },

  RESPONSE_INTERCEPTOR_CATCH: (err: any) => {
    return Promise.reject(err);
  },
};

// instance interceptors
export const INSTANCE_INTERCEPTORS: RequestInterceptors = {
  requestInterceptor: (config: RequestConfig) => {
    // if (!config.headers) config.headers = {};
    // Reflect.set(config.headers, "Agw-Js-Conv", "str");
    const { loading = false, plugin } = config;
    const { actions = [] } = plugin ?? {};
    const newActions = [...actions, ...PLUGIN_ACTIONS].reduce<PluginAction[]>(
      (pre, cur) => {
        const plugin = pre.find((i) => i.name === cur.name);
        if (!plugin) pre.push(cur);
        else Object.assign(plugin, cur);
        return pre;
      },
      []
    );
    if (!config.plugin) Reflect.set(config, "plugin", {});
    if (config.plugin) Reflect.set(config.plugin, "actions", newActions);

    filterByAction(config);

    // if (loading) store.dispatch(updateLoading(true));

    return config;
  },

  requestInterceptorCatch: (err: AxiosError) => {
    filterByAction(err, { isErrCatch: true });

    // store.dispatch(updateLoading(false));
    return Promise.reject(err);
  },

  responseInterceptor: (res: any) => {
    const { data } = res;
    filterByAction(res, { filterType: "response" });

    // store.dispatch(updateLoading(false));
    return data;
  },

  responseInterceptorCatch: (err: AxiosError) => {
    filterByAction(err, { filterType: "response", isErrCatch: true });
    // store.dispatch(updateLoading(false));

    return Promise.reject(err);
  },
};
