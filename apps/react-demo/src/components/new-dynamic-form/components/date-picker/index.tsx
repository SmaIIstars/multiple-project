import { DatePicker, DatePickerProps } from "antd";
import { isDayjs } from "dayjs";
import { omitBy } from "lodash-es";
import { memo, useMemo } from "react";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemDatePickerConfig from "./config";

type ItemDatePickerProps = {
  datePickerConfig?: DatePickerProps & {
    rangePicker: boolean;
    [key: string]: any;
  };
} & Record<string, any>;

const ItemDatePicker = (props: ItemDatePickerProps) => {
  const { datePickerConfig } = props;

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  return (
    <DatePicker
      {...filterProps}
      {...(datePickerConfig as DatePickerProps)}
      value={isDayjs(props.value) ? props.value : undefined}
    />
  );
};

export default ComponentWrapper(memo(ItemDatePicker));
export const getDefaultValue = () => {
  const defaultValDataType = ItemDatePickerConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("datePicker", {
    props: { generalConfig: { dataType: defaultValDataType } },
  });
};
