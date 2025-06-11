import { cloneDeep, get } from "lodash-es";
import { ALL_DATA_TYPE } from "../..";
import {
  ConfigSectionType,
  FormItemType,
} from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemValuePickerConfig: ConfigSectionType[] = [
  ...getCommonConfig([
    {
      sectionLabel: "generalConfig",
      items: [
        {
          itemLabel: "DataType",
          itemName: "dataType",
          type: "select",
          options: Object.values(ALL_DATA_TYPE).map((i) => ({
            label: i,
            value: i,
          })),
          defaultValue: ALL_DATA_TYPE.String,
        },
      ],
    },
  ]),
  {
    sectionLabel: "valuePickerConfig",
    items: [
      {
        itemLabel: "ShowDataType",
        itemName: "showDataType",
        type: "switch",
        formItemConfigProps: { initialValue: false },
      },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      {
        itemLabel: "Only Reference",
        itemName: "onlyReference",
        type: "switch",
        formItemConfigProps: { initialValue: false },
      },
    ],
  },
];

export const associateAttribute = (item: FormItemType) => {
  const newItem = cloneDeep(item);
  const showDataType = get(newItem, "props.valuePickerConfig.dataType");
  const generalConfig = get(newItem, "props.generalConfig");
  // set(newItem, 'props.generalConfig.dataType.items', 'Array<Object>')

  console.error(item);

  return newItem;
};

export default ItemValuePickerConfig;
