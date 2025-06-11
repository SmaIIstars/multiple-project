import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemSectionConfig: ConfigSectionType[] = [
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
          defaultValue: ALL_DATA_TYPE.Object,
          disabled: true,
        },
      ],
    },
  ]),
];

export default ItemSectionConfig;
