import { resFilter, reqFilter } from "./filter";
import { initCircularQueue } from "./controller/circular-queue";
import type { Plugin } from "../../utils/register";

initCircularQueue();

const eventTrackingRetryFilter: Plugin = {
  name: "eventTrackingRetry",
  reqFilter,
  resFilter,
};

export default eventTrackingRetryFilter;
