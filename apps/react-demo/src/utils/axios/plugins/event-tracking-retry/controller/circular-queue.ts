import { CircularQueue } from "@/utils/data-structure";
import { QUEUE_PREFIX_NAME, QUEUE_MAX_SIZE } from "../constants";

import type { RequestConfig } from "@/utils/axios/types";

let circularQueue: CircularQueue<RequestConfig>;

export const initCircularQueue = (size = QUEUE_MAX_SIZE) => {
  circularQueue = new CircularQueue(size, getInitState());
};

export const getInitState = () => {
  let res = {};
  try {
    const lsItem = localStorage.getItem(`${QUEUE_PREFIX_NAME}queue`);
    if (lsItem) res = JSON.parse(lsItem) ?? {};
  } catch (err) {
    console.error("localStorage getItem: ", err);
  }
  return res;
};

export const getCircularQueue = () => circularQueue;
