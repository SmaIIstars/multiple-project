import { storeFailedMsg } from "../controller";

import type { FilterFn } from "@/utils/axios/utils/filter";
import type { AxiosError } from "axios";

const errorFilter = (err: AxiosError) => {
  const { config } = err;

  storeFailedMsg(config);
};

const resFilter: FilterFn = (data, options = {}) => {
  const { isErrCatch = false } = options;
  if (isErrCatch) errorFilter(data as AxiosError);
};

export default resFilter;
