import { Input, InputProps } from "antd";
import { omitBy } from "lodash-es";
import { memo, useMemo } from "react";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemInputConfig from "./config";

type ItemInputProps = { inputConfig?: InputProps } & Record<string, any>;

const ItemInput = (props: ItemInputProps) => {
  const { inputConfig } = props;

  const filterProps = useMemo(
    () =>
      omitBy(
        props,
        (_, k) => k !== "onChange" && (k === "children" || /[A-Z]/.test(k))
      ),
    [props]
  );

  return <Input {...filterProps} {...inputConfig} />;
};

export default ComponentWrapper(memo(ItemInput));
const getDefaultValue = () => {
  const defaultValDataType = ItemInputConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("input", {
    props: { generalConfig: { dataType: defaultValDataType } },
  });
};

export { getDefaultValue };
