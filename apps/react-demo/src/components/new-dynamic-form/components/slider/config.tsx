import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemSliderConfig: ConfigSectionType[] = [
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
          defaultValue: ALL_DATA_TYPE.Number,
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "sliderConfig",
    items: [
      {
        itemLabel: "DefaultValue",
        itemName: "defaultValue",
        type: "inputNumber",
      },
      { itemLabel: "Max", itemName: "max", type: "inputNumber" },
      { itemLabel: "Min", itemName: "min", type: "inputNumber" },
      { itemLabel: "Step", itemName: "step", type: "inputNumber" },
    ],
  },
];

export default ItemSliderConfig;
