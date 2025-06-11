import { isLocal } from "@/utils/env";
import { Button, Collapse, Form } from "antd";
import { cloneDeep, get, lowerFirst, mergeWith } from "lodash-es";
import { memo, useEffect } from "react";
import {
  componentAssociateAttributeChangeFunctionMap,
  FormItemConfigMap,
} from "../components/constants-map";
import { FormItemMap } from "./constants";

import { startCase } from "lodash";
import { FormItemType } from "../types";
import styles from "./index.module.scss";

type FormItemConfigProps = {
  data: FormItemType | null;
  onUpdate?: (item: FormItemType) => void;
};

const FormItemConfig = (props: FormItemConfigProps) => {
  const { data, onUpdate } = props;
  const { formItemId, type } = data ?? {};

  const [form] = Form.useForm<FormItemType["props"]>();
  const handleFormValueChange = (changedValues: any, values: any) => {
    if (!data || !type) return;

    mergeWith(data, { props: values }, (objValue, srcValue) =>
      Array.isArray(srcValue) ? srcValue : undefined
    );
    const newData =
      Reflect.get(componentAssociateAttributeChangeFunctionMap, type)?.(
        cloneDeep(data),
        values
      ) ?? cloneDeep(data);
    onUpdate?.(newData);
  };

  useEffect(() => {
    if (!data) return;
    const newData =
      Reflect.get(
        componentAssociateAttributeChangeFunctionMap,
        data.type
      )?.(cloneDeep(data)) ?? cloneDeep(data);

    if (
      get(newData, "props.generalConfig.dataType") !==
      get(data, "props.generalConfig.dataType")
    ) {
      onUpdate?.(newData);
    }
    form.setFieldsValue(newData.props);
  }, [data]);

  return (
    <div className={styles.dynamicFormItemConfigWrapper}>
      <div className={styles.dynamicFormItemConfigHeader}>
        {data?.type} Configuration
      </div>
      <Form form={form} onValuesChange={handleFormValueChange}>
        {formItemId && type && (
          <Collapse
            ghost
            defaultActiveKey={FormItemConfigMap[type]?.map(
              (c) => c.sectionLabel
            )}
            items={FormItemConfigMap[type]?.map((s) => {
              const { sectionLabel, items } = s;
              return {
                key: sectionLabel,
                label: (
                  <div
                    className={styles.dynamicFormItemConfigCollapseItemTitle}
                  >
                    {startCase(sectionLabel)}
                  </div>
                ),
                children: items.map((item) => {
                  const {
                    itemLabel,
                    itemName,
                    type: itemType,
                    defaultValue,
                    formItemConfigProps,
                    ...restProps
                  } = item;
                  const Cmp = Reflect.get(FormItemMap, itemType);

                  const specifyProps =
                    defaultValue !== undefined
                      ? { initialValue: defaultValue }
                      : {};
                  const pathList = [lowerFirst(sectionLabel), itemName];

                  return Cmp ? (
                    <Form.Item
                      name={pathList}
                      label={startCase(itemLabel)}
                      labelCol={{ span: 8 }}
                      labelAlign="left"
                      key={itemName}
                      {...formItemConfigProps}
                      {...specifyProps}
                    >
                      <Cmp
                        {...restProps}
                        {...(itemType === "condition" && { pathList })}
                      />
                    </Form.Item>
                  ) : null;
                }),
              };
            })}
          />
        )}

        {isLocal && (
          <Collapse
            items={[
              {
                key: "1",
                label: "Local Test",
                children: (
                  <>
                    <Button onClick={() => console.error(data)}>
                      Local Submit
                    </Button>
                    <Form.Item noStyle shouldUpdate>
                      {() => (
                        <pre>
                          {JSON.stringify(form.getFieldsValue(), null, 2)}
                        </pre>
                      )}
                    </Form.Item>
                  </>
                ),
              },
            ]}
          />
        )}
      </Form>
    </div>
  );
};

export default memo(FormItemConfig);
