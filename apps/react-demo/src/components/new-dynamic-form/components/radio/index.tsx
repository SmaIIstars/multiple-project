import { CustomCompactInputValueItemType } from "@/components/custom-compact-input";
import { Radio } from "antd";
import { RadioGroupProps } from "antd/es/radio";
import { omitBy } from "lodash-es";
import { memo, useMemo } from "react";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemRadioConfig from "./config";

type ItemRadioProps = {
  radioConfig?: RadioGroupProps & Record<string, any>;
} & Record<string, any>;

const ItemRadio = (props: ItemRadioProps) => {
  const { radioConfig } = props;

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  const formatCustomCompactInputValueInput = (
    value?: CustomCompactInputValueItemType[][]
  ): RadioGroupProps["options"] => {
    const options: RadioGroupProps["options"] = [];
    if (!value) return options;
    return value.map((row) => {
      const [l, v] = row;
      return { label: l?.value, value: v?.value ?? "" };
    });
  };

  const customOptions = useMemo(
    () => formatCustomCompactInputValueInput(radioConfig?.options as any),
    [radioConfig?.options]
  );

  return (
    <Radio.Group {...filterProps} {...radioConfig} options={customOptions} />
  );
};

export default ComponentWrapper(memo(ItemRadio));
export const getDefaultValue = () => {
  const defaultValDataType = ItemRadioConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("radio", {
    props: { generalConfig: { dataType: defaultValDataType } },
  });
};
