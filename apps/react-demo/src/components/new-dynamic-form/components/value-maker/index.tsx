import { Input, Select, Space, TreeSelect } from "antd";
import { merge, omitBy } from "lodash-es";
import { memo, useEffect, useMemo, useState } from "react";
import { useFormContext } from "../../../new-dynamic-form/context";
import { handleFilterTypeTreeData } from "../../../new-dynamic-form/util";
import { ALL_DATA_TYPE } from "../../constants";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemValueMakerConfig from "./config";

import styles from "./index.module.scss";

type ValueMakerValueType = {
  name: string;
  dataType: ALL_DATA_TYPE;
  type: "input" | "reference";
  value?: any;
};

type ItemValueMakerProps = {
  valueMakerConfig: { showDataType: boolean };

  onChange?: (val: ValueMakerValueType) => void;
  value?: ValueMakerValueType;
  id?: string;
};

const defaultValue: ValueMakerValueType = {
  name: "",
  dataType: ALL_DATA_TYPE.String,
  type: "input",
  value: "",
};

const ItemValueMaker = (props: ItemValueMakerProps) => {
  const { value, onChange } = props;
  const [curValue, setCurValue] = useState(value ?? defaultValue);
  const { referenceTreeData = [] } = useFormContext() ?? {};

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  const handleChange = (type: keyof ValueMakerValueType, val: string) => {
    if (type !== "value") {
      setCurValue((cur) => {
        const curVal = {
          ...merge(cur, { [type]: val }),
          value: undefined,
        };
        onChange?.(curVal);
        return curVal;
      });
    } else {
      setCurValue((cur) => {
        const curVal = merge({}, cur, { [type]: val });
        onChange?.(curVal);
        return curVal;
      });
    }
  };

  useEffect(() => {
    if (value) setCurValue(value);
  }, [value]);

  return (
    <Space.Compact block className={styles.inputReferenceWrapper}>
      <Input
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Name"
        className={styles.valueMakerName}
        value={curValue.name}
      />
      <Select
        key={"dataType"}
        popupMatchSelectWidth={false}
        style={{ width: "auto" }}
        defaultValue={curValue?.dataType ?? ALL_DATA_TYPE.String}
        options={Object.values(ALL_DATA_TYPE).map((i) => ({
          label: i,
          value: i,
        }))}
        onChange={(v) => handleChange("dataType", v)}
        value={curValue.dataType}
      />
      <Select
        key={"type"}
        popupMatchSelectWidth={false}
        defaultValue={curValue?.type ?? "input"}
        style={{ width: "auto" }}
        options={[
          { label: "Input", value: "input" },
          { label: "Reference", value: "reference" },
        ]}
        rootClassName={styles.inputReferenceSelector}
        onChange={(v) => handleChange("type", v)}
        value={curValue.type}
      />
      <div className={styles.valueMakerValueWrapper}>
        {curValue.type === "input" ? (
          // <ValueInput
          //   type={curValue.dataType}
          //   required
          //   placeholder={"Value"}
          //   onChange={(e) => {
          //     const v = e?.target?.value ?? e;
          //     handleChange("value", v);
          //   }}
          //   value={curValue.value}
          // />
          <Input
            onChange={(e) => handleChange("value", e.target.value)}
            placeholder={"Value"}
            value={curValue.value}
          />
        ) : (
          <TreeSelect
            disabled={!referenceTreeData.length}
            {...filterProps}
            value={
              !referenceTreeData.length
                ? "Data form parent nodes"
                : curValue.value
            }
            treeData={handleFilterTypeTreeData(
              referenceTreeData as any,
              curValue.dataType
            )}
            onChange={(value) => handleChange("value", value)}
            popupMatchSelectWidth={false}
          />
        )}
      </div>
    </Space.Compact>
  );
};

export default ComponentWrapper(memo(ItemValueMaker));
export const getDefaultValue = () => {
  const defaultValDataType = ItemValueMakerConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("valueMaker", {
    props: {
      formItemConfig: { layout: "vertical" },
      generalConfig: { dataType: defaultValDataType },
    },
  });
};
export { associateAttribute } from "./config";
