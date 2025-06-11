import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemInputConfig: ConfigSectionType[] = [
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
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "inputConfig",
    items: [
      { itemLabel: "AllowClear", itemName: "allowClear", type: "switch" },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      { itemLabel: "Placeholder", itemName: "placeholder", type: "input" },
      {
        itemLabel: "MaxLength",
        itemName: "maxLength",
        type: "inputNumber",
        min: 0,
      },
      { itemLabel: "ShowCount", itemName: "showCount", type: "switch" },
      {
        itemLabel: "Type",
        itemName: "type",
        type: "select",
        options: [
          { label: "Text", value: "text" },
          { label: "Password", value: "password" },
          { label: "Number", value: "number" },
        ],
        defaultValue: "text",
      },
    ],
  },
];

export default ItemInputConfig;
