import { InputNumber, InputNumberProps } from "antd";
import { omitBy } from "lodash-es";
import { memo, useMemo } from "react";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemInputNumberConfig, { associateAttribute } from "./config";

import styles from "./index.module.scss";

type ItemInputNumberProps = { inputNumberConfig?: InputNumberProps } & Record<
  string,
  any
>;

const ItemInputNumber = (props: ItemInputNumberProps) => {
  const { inputNumberConfig } = props;

  const filterProps = useMemo(
    () =>
      omitBy(
        props,
        (_, k) => k !== "onChange" && (k === "children" || /[A-Z]/.test(k))
      ),
    [props]
  );

  return (
    <InputNumber
      {...filterProps}
      {...inputNumberConfig}
      className={styles.inputNumber}
    />
  );
};

export default ComponentWrapper(memo(ItemInputNumber));
const getDefaultValue = () => {
  const defaultValDataType = ItemInputNumberConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("inputNumber", {
    props: { generalConfig: { dataType: defaultValDataType } },
  });
};
export { associateAttribute, getDefaultValue };
