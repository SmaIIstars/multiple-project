import { merge } from "lodash-es";
import { v4 as uuidV4 } from "uuid";
import { FormItemType, FormSelectorType } from "./types";

import { getDefaultValue as getCheckboxDefaultValue } from "./components/checkbox";
import { getDefaultValue as getCodeDefaultValue } from "./components/code";
import { getDefaultValue as getCodeTemplateDefaultValue } from "./components/code-template";
import { getDefaultValue as getConditionDefaultValue } from "./components/condition";
import { getDefaultValue as getDatePickerDefaultValue } from "./components/date-picker";
import { getDefaultValue as getInputDefaultValue } from "./components/input";
import { getDefaultValue as getInputNumberDefaultValue } from "./components/input-number";
import { getDefaultValue as getListDefaultValue } from "./components/list";
import { getDefaultValue as getRadioDefaultValue } from "./components/radio";
import { getDefaultValue as getSectionDefaultValue } from "./components/section";
import { getDefaultValue as getSelectDefaultValue } from "./components/select";
import { getDefaultValue as getSliderDefaultValue } from "./components/slider";
import { getDefaultValue as getSwitchDefaultValue } from "./components/switch";
import { getDefaultValue as getTextAreaDefaultValue } from "./components/text-area";
import { getDefaultValue as getTimePickerDefaultValue } from "./components/time-picker";
import { getDefaultValue as getUploadDefaultValue } from "./components/upload";
import { getDefaultValue as getValueMakerDefaultValue } from "./components/value-maker";
import { getDefaultValue as getValuePickerDefaultValue } from "./components/value-picker";

export const getRootDefaultValue = (
  defaultProps?: Partial<FormItemType>
): FormItemType => {
  const rootId = uuidV4();
  const defaultSection = getSectionDefaultValue();
  return merge<FormItemType, Partial<FormItemType> | undefined>(
    {
      path: [rootId],
      formItemId: rootId,
      type: "root",
      children: [
        { ...defaultSection, path: [rootId, defaultSection.formItemId] },
      ],
      props: { formItemConfig: { name: "root", required: true } },
    },
    defaultProps
  );
};

export const defaultValueMap: Record<FormSelectorType, () => FormItemType> = {
  root: getRootDefaultValue,
  section: getSectionDefaultValue,
  input: getInputDefaultValue,
  switch: getSwitchDefaultValue,
  slider: getSliderDefaultValue,
  inputNumber: getInputNumberDefaultValue,
  checkbox: getCheckboxDefaultValue,
  radio: getRadioDefaultValue,
  select: getSelectDefaultValue,
  timePicker: getTimePickerDefaultValue,
  datePicker: getDatePickerDefaultValue,
  upload: getUploadDefaultValue,
  code: getCodeDefaultValue,
  valuePicker: getValuePickerDefaultValue,
  valueMaker: getValueMakerDefaultValue,
  list: getListDefaultValue,
  textArea: getTextAreaDefaultValue,
  condition: getConditionDefaultValue,
  codeTemplate: getCodeTemplateDefaultValue,
};

export enum ALL_DATA_TYPE {
  Integer = "Integer",
  String = "String",
  Number = "Number",
  Boolean = "Boolean",
  Object = "Object",
  Array = "Array",
  Date = "Date",
  Datetime = "Datetime",
  Document = "Document",
}
