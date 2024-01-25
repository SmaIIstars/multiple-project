import moment from "moment";
import { DATE_FORMAT } from "./constant";

export const formatTimestamp = (
  timestamp: string | number,
  formatStr: string = DATE_FORMAT,
  cb?: any
) => {
  const time = moment
    .unix(typeof timestamp === "string" ? parseInt(timestamp) : timestamp)
    .format(formatStr);

  return cb ? cb(time) : time;
};
