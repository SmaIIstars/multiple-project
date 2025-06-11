import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { merge } from "lodash-es";
import { memo, useMemo } from "react";

import { useFormContext } from "../../../new-dynamic-form/context";
import { useFormItemRenderContext } from "../../../new-dynamic-form/form-item-render/context";
import type { FormItemType } from "../../../new-dynamic-form/types";
import { getFormItemNamePathList } from "../../../new-dynamic-form/util";
import { getCommonDefaultValue } from "../constants";
import { formItemRegister, FormItemRenderMap } from "../constants-map";
import ComponentWrapper, { WithDraggingProps } from "../lib/component-wrapper";
import ItemListConfig, { associateAttribute } from "./config";
import styles from "./index.module.scss";

type ListConfig = {
  max: number;
  buttonText: string;
};

type ItemListProps = WithDraggingProps<
  FormItemType<Partial<Record<"listConfig", ListConfig>>>
>;

const ItemList = (props: ItemListProps) => {
  const { extends: extendsProps, path, children, props: itemProps } = props;
  const { canEdit } = useFormItemRenderContext() ?? {};
  const { root } = useFormContext() ?? {};

  const pathList = useMemo(() => {
    if (!root) return [];
    const res = getFormItemNamePathList(
      root,
      path,
      "props.formItemConfig.name",
      extendsProps?.listField
    );
    return res;
  }, [root]);

  return (
    <div className={styles.listWrapper}>
      {!children.length ? (
        <div className={styles.listDropArea}>Replace me</div>
      ) : (
        <Form.List name={pathList} initialValue={canEdit ? [{}] : []}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((f) => {
                  return (
                    <div key={f.key} className={styles.listItemContainer}>
                      <div className={styles.listItemContainerInner}>
                        {children?.map((item) => {
                          const { type } = item;
                          const Cmp = Reflect.get(FormItemRenderMap, type);

                          const newItem = merge({}, item, {
                            props: {
                              formItemConfig: {
                                labelCol:
                                  type === "list" ? { span: 24 } : undefined,
                                wrapperCol: { flex: 1, xs: { span: 24 } },
                              },
                            },
                          });

                          return Cmp ? (
                            <div
                              className={styles.listItemWrapper}
                              key={item.formItemId}
                            >
                              <div className={styles.listItem}>
                                <Cmp
                                  {...newItem}
                                  extends={{ listField: f }}
                                  index={item.path.length}
                                />
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>

                      <Button
                        onClick={() => remove(f.name)}
                        icon={<MinusCircleOutlined />}
                        className={styles.listItemDeleteButton}
                      />
                    </div>
                  );
                })}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  disabled={
                    canEdit || itemProps?.listConfig?.max === fields.length
                  }
                >
                  + {`${itemProps?.listConfig?.buttonText || "Add Item"}`}
                </Button>
              </>
            );
          }}
        </Form.List>
      )}
    </div>
  );
};

export default ComponentWrapper(memo(ItemList));
export const getDefaultValue = () => {
  const defaultValDataType = ItemListConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("list", {
    props: { generalConfig: { dataType: defaultValDataType } },
  });
};

formItemRegister("list", {
  Render: ComponentWrapper(memo(ItemList)),
  config: ItemListConfig,
  associateAttribute,
});
