import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemDatePickerConfig: ConfigSectionType[] = [
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
          defaultValue: ALL_DATA_TYPE.Date,
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "datePickerConfig",
    items: [
      { itemLabel: "ShowTime", itemName: "showTime", type: "switch" },
      { itemLabel: "Disabled", itemName: "disabled", type: "switch" },
      { itemLabel: "DefaultValue", itemName: "defaultValue", type: "input" },
      {
        itemLabel: "HourStep",
        itemName: "hourStep",
        type: "inputNumber",
        min: 1,
        max: 24,
        defaultValue: 1,
      },
      {
        itemLabel: "MinuteStep",
        itemName: "minuteStep",
        type: "inputNumber",
        min: 1,
        max: 60,
        defaultValue: 1,
      },
      {
        itemLabel: "SecondStep",
        itemName: "secondStep",
        type: "inputNumber",
        min: 1,
        max: 60,
        defaultValue: 1,
      },
      { itemLabel: "Format", itemName: "format", type: "input" },
      { itemLabel: "Placeholder", itemName: "placeholder", type: "input" },
      { itemLabel: "Use12Hours", itemName: "use12Hours", type: "switch" },
    ],
  },
];

export default ItemDatePickerConfig;
