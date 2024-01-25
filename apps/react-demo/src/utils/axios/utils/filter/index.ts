import { get } from "lodash";
import type { PluginAction } from "../../types/plugin";
import type { RequestConfig } from "../../types";
import type { AxiosError } from "axios";

export type Filter = {
  name: string;
  filter: FilterFn;
};

export type FilterFn = (data: FilterData, options?: FilterOptions) => any;

type FilterData = RequestConfig | AxiosError;

type FilterOptions = {
  filterType?: FilterType;
  isErrCatch?: boolean;
};

type FilterType = "request" | "response";

export const reqFilterList: Filter[] = [];
export const resFilterList: Filter[] = [];

export const filterByAction = (data: FilterData, options?: FilterOptions) => {
  const { filterType = "request", isErrCatch = false } = options ?? {};

  const filterList = filterType === "request" ? reqFilterList : resFilterList;

  let finalConfig: RequestConfig = {};

  if (filterType === "request") {
    // req
    if (!isErrCatch) finalConfig = data as RequestConfig;
    // req catch
    else {
      const { request } = data as AxiosError;
      const { config } = request;
      finalConfig = config;
    }
  } else {
    // res
    if (!isErrCatch) {
      const { config } = data as any;
      finalConfig = config as RequestConfig;
    }
    // res catch
    else {
      const { config } = data as AxiosError;
      finalConfig = config;
    }
  }

  const actions: PluginAction[] = get(finalConfig, "plugin.actions", []);

  actions.forEach(({ name }) => {
    filterList.find((filter) => filter.name === name)?.filter?.(data, options);
  });
};
