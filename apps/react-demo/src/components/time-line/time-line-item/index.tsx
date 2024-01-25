import { ReactElement, memo } from "react";
import cls from "classnames";
import "./index.less";

type TimeLineItemProps = {
  children?: ReactElement | ReactElement[] | string | number;
  className?: string;
};

const basePrefix = "time-line-item";

const TimeLineItem = (props: TimeLineItemProps) => {
  const { children, className } = props;

  return (
    <div className={cls([`${basePrefix}-wrapper`, className])}>
      <div className={`${basePrefix}-line-icon`}>
        <div className={`${basePrefix}-line-dot-wrapper`}>
          <div className={`${basePrefix}-line-dot`}></div>
        </div>
        <div className={`${basePrefix}-line`}></div>
      </div>
      <div className={`${basePrefix}-content-wrapper`}>{children}</div>
    </div>
  );
};

export default memo(TimeLineItem);
