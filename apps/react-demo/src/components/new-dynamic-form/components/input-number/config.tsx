import { cloneDeep, merge, set } from "lodash-es";
import { ALL_DATA_TYPE } from "../..";
import { getCommonConfig } from "../constants";

import type {
  ConfigSectionType,
  FormItemType,
} from "../../../new-dynamic-form/types";

const ItemInputNumberConfig: ConfigSectionType[] = [
  ...getCommonConfig([
    {
      sectionLabel: "generalConfig",
      items: [
        {
          itemLabel: "DataType",
          itemName: "dataType",
          type: "select",
          options: Object.values(ALL_DATA_TYPE).map((i) => {
            return {
              label: i,
              value: i,
              disabled: true,
            };
          }),
          defaultValue: ALL_DATA_TYPE.Number,
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "inputNumberConfig",
    items: [
      {
        itemLabel: "DefaultValue",
        itemName: "defaultValue",
        type: "inputNumber",
      },
      { itemLabel: "Placeholder", itemName: "placeholder", type: "input" },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      { itemLabel: "Max", itemName: "max", type: "inputNumber" },
      { itemLabel: "Min", itemName: "min", type: "inputNumber" },
      {
        itemLabel: "Precision",
        itemName: "precision",
        type: "inputNumber",
        formItemConfigProps: {},
      },
      { itemLabel: "Step", itemName: "step", type: "inputNumber" },
      { itemLabel: "StringMode", itemName: "stringMode", type: "switch" },
    ],
  },
];

export const associateAttribute = (
  item: FormItemType,
  changeValues?: FormItemType["props"]
): FormItemType => {
  const { inputNumberConfig } = changeValues ?? {};
  if (!inputNumberConfig) return item;
  const { precision } = inputNumberConfig;
  const newItem = cloneDeep(item);
  // Update the change firstly
  merge(newItem, { props: changeValues });
  // Set the new change
  if (precision === 0) {
    set(newItem, "props.generalConfig.dataType", ALL_DATA_TYPE.Integer);
  } else {
    set(newItem, "props.generalConfig.dataType", ALL_DATA_TYPE.Number);
  }

  return newItem;
};

export default ItemInputNumberConfig;
