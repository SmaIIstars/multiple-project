import { Form } from "antd";
import { cloneDeep } from "lodash-es";
import { forwardRef, memo } from "react";
import { FormItemMap } from "../../../../new-dynamic-form/form-item-config/constants";
import { ConfigItemBaseType } from "../../../../new-dynamic-form/types";

type SubObjectProps = {
  value: Record<string, any>;
  onChange: (v: Record<string, any>) => void;
  children: ConfigItemBaseType[];
};

const SubObject = forwardRef((props: SubObjectProps, ref) => {
  const { value = {}, onChange, children = [] } = props;

  const handleValueChange = (k: string, v: any) => {
    const newValue = cloneDeep(value);
    Reflect.set(newValue, k, v);
    onChange?.(newValue);
  };

  return (
    <div>
      {children.map((subItem) => {
        const { itemLabel, itemName, type: itemType, ...restProps } = subItem;

        const Cmp = Reflect.get(FormItemMap, itemType);
        return Cmp ? (
          <Form.Item
            key={itemName}
            label={itemLabel}
            layout="horizontal"
            labelCol={{ span: 8 }}
          >
            <Cmp
              {...restProps}
              value={Reflect.get(value, itemName)}
              onChange={(v: any) => {
                if (typeof v?.target?.value === "string")
                  handleValueChange(itemName, v.target.value);
                else handleValueChange(itemName, v);
              }}
            />
          </Form.Item>
        ) : null;
      })}
    </div>
  );
});

export default memo(SubObject);
