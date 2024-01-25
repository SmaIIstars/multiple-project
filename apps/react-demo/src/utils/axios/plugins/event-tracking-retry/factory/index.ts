import { get, set } from "lodash";

import type { RequestConfig } from "@/utils/axios/types";

const format = (conf: RequestConfig) => {
  if (!conf) return;

  const { data = {}, plugin } = conf;
  const { sessionId, requestIndex, requestId } = plugin ?? {};

  // Plugin parameters injection for data
  if (data.Params) {
    try {
      const eventData = Object.assign(JSON.parse(data.Params), {
        request_send_ts: Date.now(),
        session_id: sessionId,
        request_index: requestIndex,
        request_id: requestId,
      });

      Reflect.set(data, "Params", JSON.stringify(eventData));
    } catch (err) {
      console.error("invalid JSON string");
    }
  } else {
    Object.assign(data, {
      request_send_ts: Date.now(),
      session_id: sessionId,
      request_index: requestIndex,
      request_id: requestId,
    });
  }

  const flags = get(conf, "plugin.flags", {});
  Reflect.set(flags, "etRetryFlag", true);
  set(conf, "plugin.flags", flags);
};

export default format;
