import { cloneDeep, set } from "lodash-es";
import { ALL_DATA_TYPE } from "../..";
import {
  ConfigSectionType,
  FormItemType,
} from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemListConfig: ConfigSectionType[] = [
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
          defaultValue: "Array<Object>",
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "listConfig",
    items: [
      {
        itemLabel: "Button Text",
        itemName: "buttonText",
        type: "input",
        defaultValue: "Add Item",
      },
      {
        itemLabel: "Max",
        itemName: "max",
        type: "inputNumber",
        defaultValue: 0,
      },
    ],
  },
];

export const associateAttribute = (item: FormItemType) => {
  const newItem = cloneDeep(item);
  const { children } = newItem;

  // Array<Type>
  // if (children?.length === 1) {
  //   const childrenType = get(children, "0.props.generalConfig.dataType");
  //   if (!isArrayType(childrenType)) {
  //     set(newItem, "props.generalConfig.dataType", `Array<${childrenType}>`);
  //     return newItem;
  //   }
  // }

  set(newItem, "props.generalConfig.dataType", "Array<Object>");
  return newItem;
};

export default ItemListConfig;
