// register center
import { reqFilterList, resFilterList } from "../filter";

import eventTrackingRetry from "../../plugins/event-tracking-retry";

import type { FilterFn } from "../filter";

export type Plugin = {
  name: string;
  reqFilter?: FilterFn;
  reqController?: (res: any) => any;

  resFilter?: FilterFn;
  resController?: (res: any) => any;
};

// plugins register center
const register = (plugin: Plugin) => {
  const { name, reqFilter, resFilter } = plugin;
  if (reqFilter) reqFilterList.push({ name, filter: reqFilter });

  if (resFilter) resFilterList.push({ name, filter: resFilter });
};

const initPlugins = () => {
  // event tracking retry
  register(eventTrackingRetry);
};

export { reqFilterList, resFilterList, initPlugins };
