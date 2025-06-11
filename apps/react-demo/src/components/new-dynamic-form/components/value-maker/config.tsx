import { cloneDeep, get } from "lodash-es";
import { ALL_DATA_TYPE } from "../..";
import {
  ConfigSectionType,
  FormItemType,
} from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemValueMakerConfig: ConfigSectionType[] = [
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
  { sectionLabel: "valueMakerConfig", items: [] },
];

export const associateAttribute = (item: FormItemType) => {
  console.error(item);

  const newItem = cloneDeep(item);
  const showDataType = get(newItem, "props.valueMakerConfig.dataType");
  const generalConfig = get(newItem, "props.generalConfig");
  // generalConfig.
  // set(newItem, 'props.generalConfig.dataType.items', 'Array<Object>')
  return newItem;
};

export default ItemValueMakerConfig;
