import { isArray, merge, mergeWith, startCase } from "lodash-es";
import { nanoid } from "nanoid";
import type {
  ConfigFormItemType,
  ConfigGeneralType,
  FormItemType,
  FormSelectorType,
} from "../types";

const FormItemConfig: ConfigFormItemType = {
  sectionLabel: "formItemConfig",
  items: [
    { itemLabel: "name", itemName: "name", type: "input" },
    { itemLabel: "label", itemName: "label", type: "input" },
    { itemLabel: "required", itemName: "required", type: "switch" },
    {
      itemLabel: "layout",
      itemName: "layout",
      type: "select",
      options: [
        { label: "horizontal", value: "horizontal" },
        { label: "vertical", value: "vertical" },
        { label: "inline", value: "inline" },
      ],
      defaultValue: "horizontal",
    },
    {
      itemLabel: "rules",
      itemName: "rules",
      type: "subObject",
      children: [
        {
          itemLabel: "",
          itemName: "pattern",
          type: "input",
          placeholder: "Pattern",
          style: { width: "100%" },
        },
        {
          itemLabel: "",
          itemName: "max",
          type: "inputNumber",
          placeholder: "Max Length",
          style: { width: "100%" },
        },
        {
          itemLabel: "",
          itemName: "message",
          type: "input",
          placeholder: "Message",
          style: { width: "100%" },
        },
      ],
      formItemConfigProps: { layout: "vertical" },
    },
  ],
};

const handleMergeWithArray = (objValue: unknown, srcValue: unknown) => {
  if (isArray(objValue) && isArray(srcValue)) return [...objValue, ...srcValue];
};

export const getCommonConfig = (
  defaultValues?: Partial<ConfigFormItemType | ConfigGeneralType>[]
): [ConfigFormItemType, ConfigGeneralType] => {
  const formItemConfig = FormItemConfig;
  const generalConfig: ConfigGeneralType = {
    sectionLabel: "generalConfig",
    items: [
      {
        itemLabel: "Condition",
        itemName: "condition",
        type: "condition",
        formItemConfigProps: { layout: "vertical" },
      },
    ],
  };

  defaultValues?.map((v) => {
    const { sectionLabel } = v;
    if (sectionLabel === "formItemConfig") {
      mergeWith(generalConfig, v, handleMergeWithArray);
    } else if (sectionLabel === "generalConfig") {
      mergeWith(generalConfig, v, handleMergeWithArray);
    }
  });

  return [formItemConfig, generalConfig];
};

export const getCommonDefaultValue = (
  type: FormSelectorType,
  defaultValues?: Partial<FormItemType>
): FormItemType => {
  const id = nanoid(8);

  return merge(
    {},
    {
      path: [],
      formItemId: id,
      type: type,
      children: [],
      props: {
        formItemConfig: {
          name: `${type}_${nanoid(4)}`,
          label: startCase(type),
        },
      },
    },
    defaultValues
  );
};
