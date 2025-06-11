import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemRadioConfig: ConfigSectionType[] = [
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
    sectionLabel: "radioConfig",
    items: [
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      { itemLabel: "DefaultValue", itemName: "defaultValue", type: "input" },
      {
        itemLabel: "Options",
        itemName: "options",
        type: "compactInput",
        defaultValue: [
          [
            { label: "Label", value: "" },
            { label: "Value", value: "" },
          ],
        ],
        minCount: 1,
      },
    ],
  },
];

export default ItemRadioConfig;
