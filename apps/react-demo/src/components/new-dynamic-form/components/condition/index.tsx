import {
  MinusCircleOutlined,
  MinusOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select, Space, TreeSelect } from "antd";
import { nanoid } from "nanoid";
import { memo, useMemo } from "react";
import { useFormContext } from "../../../new-dynamic-form/context";
import {
  convertFormItemsToTreeData,
  getDataFromTreeData,
  handleFilterTypeTreeData,
} from "../../../new-dynamic-form/util";
import { ALL_DATA_TYPE } from "../../constants";
import { getCommonDefaultValue } from "../constants";
import ItemConditionConfig from "./config";
import { LogicTypeEnum, OperatorTypeEnum } from "./constants";

import styles from "./index.module.scss";

const operatorOptions = [
  { value: OperatorTypeEnum.EQUAL, label: "==" },
  { value: OperatorTypeEnum.NOT_EQUAL, label: "!=" },
  { value: OperatorTypeEnum.GREATER_THAN, label: ">" },
  { value: OperatorTypeEnum.GREATER_THAN_OR_EQUAL, label: ">=" },
  { value: OperatorTypeEnum.LESS_THAN, label: "<" },
  { value: OperatorTypeEnum.LESS_THAN_OR_EQUAL, label: "<=" },
  { value: OperatorTypeEnum.IN, label: "in" },
  { value: OperatorTypeEnum.NOT_IN, label: "not_in" },
  { value: OperatorTypeEnum.CONTAINS, label: "contains" },
  { value: OperatorTypeEnum.MATCHES, label: "matches" },
];

export type ConditionItem = {
  sourceKey: string;
  operator: OperatorTypeEnum;
  target: {
    type: "input" | "reference";
    value: any;
  };
};

export type ConditionGroup = Array<{
  id: string;
  logicType: LogicTypeEnum;
  groupName: string;
  items: ConditionItem[];
}>;

type CustomConditionProps = {
  value: ConditionGroup[];
  onChange?: (value: any) => void;
  pathList: string[];

  conditionConfig?: {
    hasElse?: boolean;
    max?: number;
    min?: number;
  };
};

const CustomCondition = (props: CustomConditionProps) => {
  const { pathList, conditionConfig } = props;
  const { hasElse = false, max, min = 0 } = conditionConfig ?? {};
  const { root, referenceTreeData } = useFormContext() ?? {};
  const curTargetKeyTreeData = useMemo(
    () => referenceTreeData ?? convertFormItemsToTreeData(root?.children ?? []),
    [root]
  );

  return (
    <Form.List name={pathList}>
      {(groups, { add, remove }) => (
        <div className={styles.conditionItemWrapper}>
          {groups.map((group) => (
            <div key={group.key} className={styles.conditionGroupWrapper}>
              <Form.Item name={[group.name, "id"]} hidden>
                {/* Antd Warning: Must have a element here */}
                <span></span>
              </Form.Item>

              <div className={styles.conditionGroupHeader}>
                <Form.Item
                  name={[group.name, "groupName"]}
                  noStyle
                  className={styles.conditionGroupName}
                >
                  <Input />
                </Form.Item>

                <Button
                  type="link"
                  icon={<MinusOutlined />}
                  onClick={() => remove(group.name)}
                  disabled={groups.length === min}
                />
              </div>

              <span>IF</span>

              <div className={styles.conditionGroupItemWrapper}>
                <Form.Item noStyle shouldUpdate>
                  {(form) => {
                    const items = form.getFieldValue([
                      ...pathList,
                      group.name,
                      "items",
                    ]);
                    return (
                      items.length > 1 && (
                        <div className={styles.conditionGroupItemBracket}>
                          <Form.Item
                            name={[group.name, "logicType"]}
                            initialValue={LogicTypeEnum.and}
                            className={styles.conditionLogicType}
                          >
                            <Select
                              variant="borderless"
                              options={Object.keys(LogicTypeEnum).map((i) => ({
                                label: i,
                                value: i,
                              }))}
                            />
                          </Form.Item>
                        </div>
                      )
                    );
                  }}
                </Form.Item>

                <Form.List name={[group.name, "items"]}>
                  {(fields, { add: fieldAdd, remove: fieldRemove }) => (
                    <div className={styles.conditionGroupItemContent}>
                      <div className={styles.conditionGroupItem}>
                        {fields.map((field) => (
                          <div
                            key={`${group.key}-${field.key}`}
                            className={styles.conditionGroupItem}
                          >
                            <Form.Item name={[field.name, "sourceKey"]} noStyle>
                              <TreeSelect
                                placeholder="Variable"
                                treeData={curTargetKeyTreeData}
                                popupMatchSelectWidth={false}
                              />
                            </Form.Item>

                            <Form.Item name={[field.name, "operator"]} noStyle>
                              <Select
                                placeholder="Operator"
                                options={operatorOptions.map((i) => ({
                                  label: i.label,
                                  value: i.value,
                                }))}
                              />
                            </Form.Item>

                            <Form.Item noStyle shouldUpdate>
                              {(form) => {
                                const sourceKey = form.getFieldValue([
                                  ...pathList,
                                  group.name,
                                  "items",
                                  field.name,
                                  "sourceKey",
                                ]);

                                const sourceKeyDataType =
                                  getDataFromTreeData(
                                    curTargetKeyTreeData,
                                    sourceKey
                                  )?.dataType ?? ALL_DATA_TYPE.String;

                                if (!curTargetKeyTreeData) return null;
                                return (
                                  <Space.Compact block>
                                    <Form.Item
                                      name={[field.name, "target", "type"]}
                                      noStyle
                                      initialValue={"input"}
                                    >
                                      <Select
                                        key={"targetType"}
                                        popupMatchSelectWidth={false}
                                        style={{ width: "auto" }}
                                        options={[
                                          { label: "Input", value: "input" },
                                          {
                                            label: "Reference",
                                            value: "reference",
                                          },
                                        ]}
                                      />
                                    </Form.Item>

                                    <Form.Item noStyle shouldUpdate>
                                      {(form) => {
                                        const targetType = form.getFieldValue([
                                          ...pathList,
                                          group.name,
                                          "items",
                                          field.name,
                                          "target",
                                          "type",
                                        ]);

                                        return (
                                          <Form.Item
                                            name={[
                                              field.name,
                                              "target",
                                              "value",
                                            ]}
                                            noStyle
                                          >
                                            {targetType === "input" ? (
                                              // <ValueInput
                                              //   type={sourceKeyDataType}
                                              // />
                                              <Input />
                                            ) : (
                                              <TreeSelect
                                                placeholder="Select"
                                                treeData={handleFilterTypeTreeData(
                                                  curTargetKeyTreeData as any,
                                                  sourceKeyDataType
                                                )}
                                                popupMatchSelectWidth={false}
                                              />
                                            )}
                                          </Form.Item>
                                        );
                                      }}
                                    </Form.Item>
                                  </Space.Compact>
                                );
                              }}
                            </Form.Item>

                            <Button
                              type="link"
                              onClick={() => fieldRemove(field.name)}
                              icon={<MinusCircleOutlined />}
                            />
                          </div>
                        ))}
                      </div>

                      <Button
                        type="link"
                        icon={<PlusCircleOutlined />}
                        onClick={() =>
                          fieldAdd({
                            target: { type: "input" },
                          })
                        }
                      >
                        Add Condition
                      </Button>
                    </div>
                  )}
                </Form.List>
              </div>
            </div>
          ))}

          {groups.length && hasElse ? (
            <div className={styles.conditionGroupWrapper}>
              <span className={styles.conditionGroupName}>ELSE</span>
            </div>
          ) : null}

          <Button
            color="primary"
            type="dashed"
            block
            disabled={max ? groups.length >= max : false}
            icon={<PlusOutlined />}
            onClick={() =>
              add({
                id: nanoid(4),
                logicType: LogicTypeEnum.and,
                groupName: `Condition ${groups.length + 1}`,
                items: [],
              })
            }
          >
            Add
          </Button>
        </div>
      )}
    </Form.List>
  );
};

export default memo(CustomCondition);
const getDefaultValue = () => {
  const defaultValDataType = ItemConditionConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("condition", {
    props: { generalConfig: { dataType: defaultValDataType } },
  });
};

export { getDefaultValue };
