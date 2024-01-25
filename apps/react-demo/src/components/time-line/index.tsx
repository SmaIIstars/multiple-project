import React, { ReactElement, memo, useEffect } from "react";
import TimeLineItem from "./time-line-item";

import "./index.less";

type TimeLineProps = {
  children?: ReactElement | ReactElement[] | string | number;
};

const basePrefix = "time-line";

const TimeLine = (props: TimeLineProps) => {
  const { children } = props;

  return <div className={`${basePrefix}-wrapper`}>{children}</div>;
};

TimeLine.TimeLineItem = TimeLineItem;

export default memo(TimeLine);
export { TimeLineItem };
