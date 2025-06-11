import { Input, Select, Space, TreeSelect } from "antd";
import { omitBy } from "lodash-es";
import { memo, useEffect, useMemo, useState } from "react";
import { useFormContext } from "../../../new-dynamic-form/context";
import { FormItemType } from "../../../new-dynamic-form/types";
import { handleFilterTypeTreeData } from "../../../new-dynamic-form/util";
import { ALL_DATA_TYPE } from "../../constants";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper, { WithDraggingProps } from "../lib/component-wrapper";
import ItemValuePickerConfig from "./config";
import styles from "./index.module.scss";

type ValuePickerValueType = {
  dataType: ALL_DATA_TYPE;
  type: "input" | "reference";
  value?: any;
};

type ItemValuePickerProps = {
  valuePickerConfig?: Partial<{
    showDataType: boolean;
    onlyReference: boolean;
  }>;
  onChange?: (val: ValuePickerValueType) => void;
  value?: ValuePickerValueType;
  id?: string;
} & WithDraggingProps<FormItemType<Partial<Record<"generalConfig", any>>>>;

const defaultValue = {
  dataType: ALL_DATA_TYPE.String,
  type: "input",
  value: "",
};

const ItemValuePicker = (props: ItemValuePickerProps) => {
  const { valuePickerConfig, value, onChange, props: itemProps } = props;
  const [curValue, setCurValue] = useState(value ?? defaultValue);
  const { referenceTreeData = [] } = useFormContext() ?? {};

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  const treeData = useMemo(() => {
    // return referenceTreeData
    return handleFilterTypeTreeData(
      referenceTreeData as any,
      curValue.dataType
    );
  }, [referenceTreeData, curValue.dataType]);

  const handleChange = (type: keyof ValuePickerValueType, val: any) => {
    if (type !== "value") {
      const newValue: ValuePickerValueType = {
        ...curValue,
        [type]: val,
        value: undefined,
      } as ValuePickerValueType;
      setCurValue(newValue);
      onChange?.(newValue);
    } else {
      const newValue: ValuePickerValueType = {
        ...curValue,
        [type]: val,
      } as ValuePickerValueType;
      setCurValue(newValue);
      onChange?.(newValue);
    }
  };

  useEffect(() => {
    if (value) setCurValue(value);
  }, [value]);

  useEffect(() => {
    if (itemProps?.generalConfig?.dataType !== curValue.dataType) {
      setCurValue({
        ...curValue,
        dataType: itemProps?.generalConfig?.dataType,
      });
    }
  }, [itemProps]);

  return (
    <Space.Compact block className={styles.inputReferenceWrapper}>
      {valuePickerConfig?.showDataType && (
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
        />
      )}
      {!valuePickerConfig?.onlyReference && (
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
        />
      )}
      {curValue.type === "input" && !valuePickerConfig?.onlyReference ? (
        // <ValueInput
        //   type={curValue.dataType}
        //   required
        //   placeholder={"Input Value"}
        //   onChange={(e) => {
        //     const v = e?.target?.value ?? e;
        //     handleChange("value", v);
        //   }}
        //   value={curValue.value}
        // />
        <Input
          onChange={(e) => handleChange("value", e.target.value)}
          placeholder={"Input Value"}
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
          treeData={treeData}
          onChange={(value) => handleChange("value", value)}
          popupMatchSelectWidth={false}
        />
      )}
    </Space.Compact>
  );
};

export { ItemValuePicker };
export default ComponentWrapper(memo(ItemValuePicker));
export const getDefaultValue = () => {
  const defaultValDataType = ItemValuePickerConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("valuePicker", {
    props: {
      formItemConfig: { layout: "vertical" },
      generalConfig: { dataType: defaultValDataType },
    },
  });
};
export { associateAttribute } from "./config";
