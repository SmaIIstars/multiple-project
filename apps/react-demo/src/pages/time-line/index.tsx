import React, { memo } from "react";

import TimeLineC, { TimeLineItem } from "@/components/time-line";

const TimeLine = () => {
  return (
    <TimeLineC>
      <TimeLineItem>
        <div>1213123123123121312312312312131231231231213123123123</div>
        <div>1</div>
        <div>1</div>
      </TimeLineItem>
      <TimeLineItem>2</TimeLineItem>
      <TimeLineItem>3</TimeLineItem>
      <TimeLineItem>
        <div>1</div>
        <div>1</div>
      </TimeLineItem>
      <TimeLineItem>5</TimeLineItem>
    </TimeLineC>
  );
};

export default memo(TimeLine);
