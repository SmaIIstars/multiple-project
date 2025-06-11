import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemUploadConfig: ConfigSectionType[] = [
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
          defaultValue: ALL_DATA_TYPE.Document,
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "uploadConfig",
    items: [
      { itemLabel: "ButtonText", itemName: "buttonText", type: "input" },
      { itemLabel: "Name", itemName: "name", type: "input" },
      { itemLabel: "Accept", itemName: "accept", type: "input" },
      { itemLabel: "Action", itemName: "action", type: "input" },
      { itemLabel: "Directory", itemName: "directory", type: "switch" },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      { itemLabel: "MaxCount", itemName: "maxCount", type: "inputNumber" },
      {
        itemLabel: "Method",
        itemName: "method",
        type: "select",
        options: [
          { label: "GET", value: "GET" },
          { label: "POST", value: "POST" },
        ],
      },
      { itemLabel: "Multiple", itemName: "multiple", type: "switch" },
    ],
  },
];

export default ItemUploadConfig;
