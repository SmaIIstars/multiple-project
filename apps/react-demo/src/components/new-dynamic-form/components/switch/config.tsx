import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemSwitchConfig: ConfigSectionType[] = [
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
          defaultValue: ALL_DATA_TYPE.Boolean,
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "switchConfig",
    items: [
      {
        itemLabel: "DefaultValue",
        itemName: "defaultValue",
        type: "switch",
        defaultValue: false,
      },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
    ],
  },
];

export default ItemSwitchConfig;
