import { Checkbox, Input, InputNumber, Select, Slider, Switch } from "antd";
import React, { ComponentType } from "react";
import CustomCompactInput from "../../custom-compact-input";
import CustomCondition from "../components/condition";

import { ConfigFormItemMapType } from "../types";

export const FormItemMap: Partial<
  Record<ConfigFormItemMapType, ComponentType<any>>
> = {
  switch: Switch,
  input: Input,
  inputNumber: (props) => <InputNumber style={{ width: "100%" }} {...props} />,
  slider: Slider,
  checkbox: Checkbox,
  select: Select,
  // config
  compactInput: CustomCompactInput,
  condition: CustomCondition,
  subObject: React.lazy(() => import("../components/lib/sub-object")),
};

export const formItemRegister = (
  key: ConfigFormItemMapType,
  info: Partial<{
    Render: ComponentType<any> | null;
  }>
) => {
  const { Render } = info;
  if (Render) Reflect.set(FormItemMap, key, Render);
};
