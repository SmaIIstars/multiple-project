import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemConditionConfig: ConfigSectionType[] = [
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
    sectionLabel: "conditionConfig",
    items: [
      { itemLabel: "Have Else", itemName: "hasElse", type: "switch" },
      {
        itemLabel: "Max",
        itemName: "max",
        type: "inputNumber",
        min: 0,
      },
    ],
  },
];

export default ItemConditionConfig;
