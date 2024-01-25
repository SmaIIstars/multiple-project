import dataFormat from "../factory";

import type { RequestConfig } from "@/utils/axios/types";
import type { FilterFn } from "@/utils/axios/utils/filter";
import type { AxiosError } from "axios";
import { get } from "lodash";

const errorFilter = (err: AxiosError) => {
  console.error("req errorFilter", err);
};

const successFilter = (conf: RequestConfig) => {
  // data is Formatted
  const etRetryFlag = get(conf, "plugin.flags.etRetryFlag", false);

  // first time request
  if (!etRetryFlag) dataFormat(conf);
};

const reqFilter: FilterFn = (data, options = {}) => {
  const { isErrCatch = false } = options;

  if (isErrCatch) errorFilter(data as AxiosError);
  else successFilter(data as RequestConfig);
};

export default reqFilter;
