import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemTextAreaConfig: ConfigSectionType[] = [
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
    sectionLabel: "textAreaConfig",
    items: [
      { itemLabel: "DefaultValue", itemName: "defaultValue", type: "switch" },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      {
        itemLabel: "AutoSize",
        itemName: "autoSize",
        type: "subObject",
        children: [
          {
            itemLabel: "",
            placeholder: "MinRows",
            itemName: "minRows",
            type: "inputNumber",
            style: { width: "100%" },
          },
          {
            itemLabel: "",
            placeholder: "MaxRows",
            itemName: "maxRows",
            type: "inputNumber",
            style: { width: "100%" },
          },
        ],
      },
    ],
  },
];

export default ItemTextAreaConfig;
