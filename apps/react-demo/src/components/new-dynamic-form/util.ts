import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { cloneDeep, get, merge } from "lodash-es";

import type { DropTargetRecord } from "@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types";
import type { FormListFieldData, TreeSelectProps } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import { DataNode } from "antd/es/tree";
// import { ALL_DATA_TYPE } from "constants/common";
// import { OutputDataType } from "views/portal/plugin/components/output";
import { ALL_DATA_TYPE } from "./constants";
import type { FormItemType } from "./types";

export type BoardContextValue = {
  getSections: () => FormItemType[];

  reorderSection: (
    itemList: FormItemType[],
    args: {
      startIndex: number;
      finishIndex: number;
      trigger?: "pointer" | "keyboard";
    }
  ) => FormItemType[];

  reorderCard: (
    itemList: FormItemType[],
    args: {
      sectionIndex: number;
      startIndex: number;
      finishIndex: number;
      trigger?: "pointer" | "keyboard";
    }
  ) => FormItemType[];

  moveCard: (
    itemList: FormItemType[],
    args: {
      startSectionIndex: number;
      finishSectionIndex: number;
      cardIndexInStartSection: number;
      cardIndexInFinishSection?: number;
    }
  ) => FormItemType[];

  instanceId: symbol;
};

export const getFormItemPosition = (
  itemList: FormItemType[],
  parentId: string,
  formItemId: string
): [number, number] => {
  if (!itemList) return [-1, -1];
  const parentIndex = itemList.findIndex(
    (section) => section.formItemId === parentId
  );
  if (parentIndex === -1) return [-1, -1];
  const formItemIndex = itemList[parentIndex].children?.findIndex(
    (cards) => cards.formItemId === formItemId
  );

  return [parentIndex, formItemIndex];
};

export const getDropTarget = (
  targetList: DropTargetRecord[],
  type: "section" | "card" | "card-list"
) => {
  return targetList.find((t) => t.data.type === type);
};

export const reorderSection: BoardContextValue["reorderSection"] = (
  itemList,
  args
) => {
  const { startIndex, finishIndex, trigger = "keyboard" } = args;
  return reorder({ list: itemList, startIndex, finishIndex });
};

export const transRegionalMoveCard: BoardContextValue["moveCard"] = (
  itemList,
  args
) => {
  const {
    startSectionIndex,
    finishSectionIndex,
    cardIndexInStartSection,
    cardIndexInFinishSection,
  } = args;
  if (startSectionIndex === finishSectionIndex) return itemList;

  const newItemList = Array.from(itemList);
  const [sourceCard] = newItemList[startSectionIndex].children.splice(
    cardIndexInStartSection,
    1
  );

  const newSourceCard = {
    ...sourceCard,
    sectionId: newItemList[finishSectionIndex].formItemId,
  };

  // new Section
  if (
    cardIndexInFinishSection === undefined ||
    cardIndexInFinishSection === -1
  ) {
    const updateSection: FormItemType = {
      ...newItemList[finishSectionIndex],
      children: [newSourceCard],
    };
    newItemList.splice(finishSectionIndex, 1, updateSection);
    return newItemList;
  }

  // old Section
  newItemList[finishSectionIndex]?.children.splice(
    cardIndexInFinishSection,
    0,
    newSourceCard
  );
  return newItemList;
};

export const reorderCard: BoardContextValue["reorderCard"] = (
  itemList,
  args
) => {
  const { sectionIndex, startIndex, finishIndex, trigger = "keyboard" } = args;

  const updateSection: FormItemType = {
    ...itemList[sectionIndex],
    children: reorder({
      list: itemList[sectionIndex].children,
      startIndex,
      finishIndex,
    }),
  };

  const newItemList = Array.from(itemList);
  newItemList.splice(sectionIndex, 1, updateSection);

  return newItemList;
};

export const getItemByPath = (item: FormItemType, path: string[]) => {
  if (path.length === 1) {
    return item;
  } else {
    let curItem = item;
    const restPath = path.slice(1);
    for (const p of restPath) {
      const fItem = curItem.children.find((i) => i.formItemId === p);
      if (!fItem) return curItem;
      curItem = fItem;
    }
    return curItem;
  }
};

export const updateItemListByPath = (
  root: FormItemType,
  path: string[],
  updateItemList: FormItemType[]
) => {
  const newRoot = cloneDeep(root);
  if (path.length === 1) {
    newRoot.children = updateItemList;
  } else {
    let curItem = newRoot;
    const restPath = path.slice(1);
    for (const p of restPath) {
      const fItem = curItem.children.find((i) => i.formItemId === p);
      if (!fItem) break;
      curItem = fItem;
    }
    curItem.children = updateItemList;
  }

  return newRoot;
};

export const updateItemByPath = (
  root: FormItemType,
  path: string[],
  updateItem: FormItemType
) => {
  const newRoot = cloneDeep(root);
  let curItem = newRoot;
  // Can't update the value of root
  if (path.length === 1) return newRoot;
  if (path.length === 2) {
    curItem = newRoot;
  } else {
    for (const p of path.slice(1, -1)) {
      const fItem = curItem.children.find((i) => i.formItemId === p);
      if (!fItem) break;
      curItem = fItem;
    }
  }

  const updateIdx = curItem.children.findIndex(
    (i) => i.formItemId === updateItem.formItemId
  );
  curItem.children.splice(updateIdx, 1, updateItem);
  return merge(root, newRoot);
};

export const convertFormItemsToTreeData = (
  formItems: FormItemType[],
  extraParams?: Partial<{
    pathPrefix: string;
    onlyLeafSelect?: boolean;
  }>
): TreeSelectProps["treeData"] => {
  const { pathPrefix = "", onlyLeafSelect = false } = extraParams ?? {};

  return formItems?.map((item) => ({
    title: item.props.formItemConfig?.label || item.formItemId,
    value: `${pathPrefix}${pathPrefix ? "." : ""}${
      item.props.formItemConfig?.name || item.formItemId
    }`,
    children:
      item?.children?.length > 0
        ? convertFormItemsToTreeData(item.children, {
            pathPrefix: `${pathPrefix}${pathPrefix ? "." : ""}${
              item.props.formItemConfig?.name || item.formItemId
            }`,
          })
        : undefined,
    disabled: onlyLeafSelect && item?.children?.length > 0,
    dataType: item.props?.generalConfig?.dataType,
  }));
};

// export const convertOutputToTreeData = (
//   output: OutputDataType[],
//   extraParams?: Partial<{
//     pathPrefix: string;
//     onlyLeafSelect?: boolean;
//   }>
// ): TreeSelectProps["treeData"] => {
//   const { pathPrefix = "", onlyLeafSelect = false } = extraParams ?? {};

//   return output?.map((item) => {
//     return {
//       title: item.name,
//       value: `${pathPrefix}${pathPrefix ? "." : ""}${item.name}`,
//       children:
//         item?.children && item.children.length > 0
//           ? convertOutputToTreeData(item.children, {
//               pathPrefix: `${pathPrefix}${pathPrefix ? "." : ""}${item.name}`,
//             })
//           : undefined,
//       disabled: onlyLeafSelect && item?.children && item?.children?.length > 0,
//       dataType: item.type,
//     };
//   });
// };

export const getDataFromTreeData = (
  data: TreeSelectProps["treeData"],
  targetValue: string
): DefaultOptionType | null => {
  if (!data) return null;
  return data.reduce((acc: any, item: any) => {
    if (acc) return acc;
    if (item.value === targetValue) return item;
    return item.children
      ? getDataFromTreeData(item.children, targetValue)
      : null;
  }, null);
};

export const getFormItemNamePathList = (
  root: FormItemType,
  idPathList: string[],
  targetPath = "",
  listField?: FormListFieldData
): string[] => {
  const namePathList: string[] = [];

  if (idPathList.length === 1) {
    namePathList.push(root.formItemId);
    return namePathList;
  } else {
    let curItem = root;
    const restPath = idPathList.slice(1);
    for (const p of restPath) {
      const fItem = curItem.children.find((i) => i.formItemId === p);
      if (!fItem) return namePathList;

      if (listField && curItem.type === "list") {
        namePathList.length = 0;
        namePathList.push(`${listField.name}`);
      }
      namePathList.push(get(fItem, targetPath));
      curItem = fItem;
    }
  }

  return namePathList;
};

export const handleFilterTypeTreeData = (
  tree: DataNode[],
  type?: ALL_DATA_TYPE
) => {
  if (!type) return tree;
  const newTree = cloneDeep(tree);
  const processNode = (node: DataNode) => {
    if ("dataType" in node) {
      Reflect.set(node, "disabled", node?.dataType !== type);
    } else {
      Reflect.set(node, "disabled", true);
    }

    if (node.children) {
      node.children.forEach(processNode);
    }
  };

  newTree.forEach((tree) => processNode(tree));
  return newTree;
};
