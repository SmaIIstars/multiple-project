import { isLocal } from "@/utils/env";
import { Button, Collapse, Form, FormProps } from "antd";
import cls from "classnames";
import React, { forwardRef, useImperativeHandle } from "react";
import { FormItemRenderMap } from "../components/constants-map";
import { FormItemType } from "../types";
import { FormItemRenderContext } from "./context";

import styles from "./index.module.scss";

type FormItemRenderProps = {
  data: FormItemType[];

  wrapperClassName?: string;
  header?: React.JSX.Element;
  canEdit?: boolean;
  onFormValuesChange?: FormProps["onValuesChange"];
};

const FormItemRender = forwardRef((props: FormItemRenderProps, ref) => {
  const {
    data,
    wrapperClassName,
    header,
    canEdit = true,
    onFormValuesChange,
    ...restProps
  } = props;
  const [mainForm] = Form.useForm();

  const handleFormValuesChange: FormProps["onValuesChange"] = (
    changedValues,
    values
  ) => {
    onFormValuesChange?.(changedValues, values);
  };
  useImperativeHandle(ref, () => ({ form: mainForm }));

  return (
    <FormItemRenderContext.Provider value={{ canEdit }}>
      <div
        className={cls(wrapperClassName, styles.dynamicFormItemRenderWrapper)}
      >
        <Form
          rootClassName={styles.dynamicFormItemRenderFormWrapper}
          form={mainForm}
          wrapperCol={{ flex: 1 }}
          labelWrap
          onFinish={
            isLocal ? () => console.error(mainForm.getFieldsValue()) : undefined
          }
          onValuesChange={handleFormValuesChange}
        >
          {header}
          {data.length
            ? data.map((item, idx) => {
                const { formItemId, type } = item;
                const Cmp = Reflect.get(FormItemRenderMap, type);

                return (
                  <React.Fragment key={`${formItemId}`}>
                    {Cmp ? <Cmp {...item} {...restProps} index={idx} /> : null}
                  </React.Fragment>
                );
              })
            : canEdit && (
                <div className={styles.dynamicFormItemRenderEmpty}>
                  Drag Component to this page
                </div>
              )}
          {isLocal && (
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Local Test",
                  children: (
                    <>
                      <Button htmlType="submit" type="primary">
                        Local Submit
                      </Button>
                      <Form.Item noStyle shouldUpdate>
                        {() => (
                          <pre>
                            {JSON.stringify(
                              mainForm.getFieldsValue(true),
                              null,
                              2
                            )}
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
    </FormItemRenderContext.Provider>
  );
});

export default FormItemRender;
