import { CustomCompactInputValueItemType } from "@/components/custom-compact-input";
import { Checkbox } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { omitBy } from "lodash-es";
import { memo, useMemo } from "react";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemCheckboxConfig from "./config";

type ItemCheckboxProps = {
  checkboxConfig?: CheckboxGroupProps & Record<string, any>;
} & Record<string, any>;

const ItemCheckbox = (props: ItemCheckboxProps) => {
  const { checkboxConfig } = props;

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  const formatCustomCompactInputValueInput = (
    value?: CustomCompactInputValueItemType[][]
  ): CheckboxGroupProps["options"] => {
    const options: CheckboxGroupProps["options"] = [];
    if (!value) return options;
    return value.map((row) => {
      const [l, v] = row;
      return { label: l?.value, value: v?.value ?? "" };
    });
  };

  const customOptions = useMemo(
    () => formatCustomCompactInputValueInput(checkboxConfig?.options as any),
    [checkboxConfig?.options]
  );

  return (
    <Checkbox.Group
      {...filterProps}
      {...checkboxConfig}
      options={customOptions}
    />
  );
};

export default ComponentWrapper(memo(ItemCheckbox));
export const getDefaultValue = () => {
  const defaultValDataType = ItemCheckboxConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("checkbox", {
    props: { generalConfig: { dataType: defaultValDataType } },
  });
};
