import mergeOptions from "merge-options";
import { getCircularQueue } from "./circular-queue";
import apiRequest from "@/utils/axios";
import Store from "../../../store";
import {
  QUEUE_PREFIX_NAME,
  PING_INTERVAL_TIME,
  RETRY_DELAY_TIME,
} from "../constants";

import type { RequestConfig } from "@/utils/axios/types";
import type { StoreConfig, StoreType } from "@/utils/axios/store/types";
import sleep from "@/utils/sleep";

// store
export const createStore = (storeType: StoreType, config: StoreConfig) => {
  const store = new Store(storeType, config);
  return store;
};

const store = createStore("localStorage", { prefixName: QUEUE_PREFIX_NAME });

export const storeFailedMsg = (conf: RequestConfig) => {
  const msgQueue = getCircularQueue();
  const { loading, plugin, data, url, method } = conf;
  const { queue } = msgQueue;

  const finalConfig = mergeOptions(apiRequest.requestConfig, {
    loading,
    plugin,
    data,
    url,
    method,
  });

  msgQueue.push(finalConfig);

  store.update("queue", {
    front: msgQueue.front,
    rear: msgQueue.rear,
    queue,
    capacityFactor: msgQueue.capacityFactor,
  });
};

// request
export const sendRequest = (
  conf: RequestConfig,
  errorCatch?: (err: any) => any
) => {
  const { data } = conf;

  const finalConfig = Object.assign(conf, {
    data: data && typeof data === "string" ? JSON.parse(data) : data,
  });

  console.log("====================================retry:");
  console.log(finalConfig);
  console.log("====================================");
  apiRequest.request(finalConfig).catch((err) => {
    errorCatch?.(err);
    console.error("axiosPluginRetryError", err);
  });
};

// ping
export const pingNetwork = async (pingFn: (...args: any[]) => Promise<any>) => {
  const pingFnRes = await pingFn().catch((err) => {
    console.error("pingFnErr", err);
    return false;
  });
  return !!pingFnRes;
};

let retryTimer: NodeJS.Timer | null = null;
let Ping = async () => {
  await sleep(3000);
  return true;
};

export const questRetrySend = async () => {
  const msgQueue = getCircularQueue();
  const pingRes = await pingNetwork(Ping);

  if (pingRes) {
    if (!retryTimer) {
      retryTimer = setInterval(() => {
        const msg = msgQueue.popHead();
        if (msg) sendRequest(msg);
        if (retryTimer && msgQueue.isEmpty()) {
          clearInterval(retryTimer);
          retryTimer = null;
        }
      }, RETRY_DELAY_TIME);
    }
  }
};

// TODO: Replace interval with event bus
setInterval(() => {
  const msgQueue = getCircularQueue();
  const { queue } = msgQueue;

  if (!msgQueue.isEmpty()) questRetrySend();

  store.update("queue", {
    front: msgQueue.front,
    rear: msgQueue.rear,
    queue,
    capacityFactor: msgQueue.capacityFactor,
  });
}, PING_INTERVAL_TIME);
