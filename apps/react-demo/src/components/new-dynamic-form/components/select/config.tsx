import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemSelectConfig: ConfigSectionType[] = [
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
    sectionLabel: "selectConfig",
    items: [
      { itemLabel: "AllowClear", itemName: "allowClear", type: "switch" },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      {
        itemLabel: "Mode",
        itemName: "mode",
        type: "select",
        options: [
          { label: "Multiple", value: "multiple" },
          { label: "Tags", value: "tags" },
          { label: "Single", value: "single" },
        ],
      },
      { itemLabel: "Placeholder", itemName: "placeholder", type: "input" },
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

export default ItemSelectConfig;
