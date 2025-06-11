import { useEffect } from 'react'
import { cloneDeep } from 'lodash-es'
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder'
import { attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine'
import {
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index'
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'
import {
  DragLocationHistory,
  DropTargetRecord,
  ElementDragPayload,
} from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types'

import { defaultValueMap } from './constants'
import { updateItemListByPath, getItemByPath } from './util'
import { FormItemType, FormSelectorType } from './types'

const ContainerList = ['list', 'section']

export const useDropComponents = (
  rootRef: React.RefObject<HTMLDivElement>,
  treeRoot: FormItemType,
  setTreeRoot: (node: FormItemType) => void,
) => {
  useEffect(() => {
    if (!rootRef.current) return

    return combine(
      dropTargetForElements({
        element: rootRef.current,
        getData: args => {
          const { input, element } = args
          const data = { ...treeRoot }
          return attachClosestEdge(data, { input, element, allowedEdges: [] })
        },
      }),
      monitorForElements({
        onDrop: args => {
          const {
            location,
            source: { data: source },
          } = args as {
            location: DragLocationHistory
            source: ElementDragPayload &
              (
                | { data: FormItemType }
                | { data: { type: 'selector'; itemType: FormSelectorType } }
              )
          }

          // didn't drop on anything
          if (!location.current.dropTargets.length) return
          const newRoot = cloneDeep(treeRoot)
          const [{ data: target }, dropTargetParent] = location.current
            .dropTargets as (DropTargetRecord & { data: FormItemType })[]
          const targetParent = dropTargetParent?.data

          // Add Item
          if (source.type === 'selector') {
            const sourceType = source.itemType as FormSelectorType
            const getDefaultValue = Reflect.get(defaultValueMap, sourceType)
            if (!getDefaultValue) return

            // Add item into root
            if (target.type === 'root') {
              const newItem = getDefaultValue()
              newRoot.children.push({
                ...newItem,
                path: [...newRoot.path, newItem.formItemId],
              })
              setTreeRoot(newRoot)
            } else if (ContainerList.includes(target.type)) {
              // Add item into container card
              const newItem = getDefaultValue()
              const updateRoot = updateItemListByPath(treeRoot, target.path, [
                ...target.children,
                { ...newItem, path: [...target.path, newItem.formItemId] },
              ])
              if (!updateRoot) return
              setTreeRoot(updateRoot)
            } else {
              // Add item with card
              const targetIdx = targetParent.children.findIndex(
                i => i.formItemId === target.formItemId,
              )
              const destinationIndex = getReorderDestinationIndex({
                // Defined the new item is the last one
                startIndex: targetParent.children.length,
                indexOfTarget: targetIdx,
                closestEdgeOfTarget: extractClosestEdge(target),
                axis: 'vertical',
              })

              const newItem = getDefaultValue()
              const newItemList = cloneDeep(targetParent.children)
              newItemList.splice(destinationIndex, 0, {
                ...newItem,
                path: [...targetParent.path, newItem.formItemId],
              })

              const updateRoot = updateItemListByPath(
                treeRoot,
                targetParent.path,
                newItemList,
              )
              if (!updateRoot) return
              setTreeRoot(updateRoot)
            }
            return
          }

          // Drag a card
          // 1. Drop card into root
          if (target.type === 'root') {
            // 1.1 source also in root
            if (source.path.length === 1) {
              const newItemList = updateItemListByPath(
                newRoot,
                newRoot.path,
                reorder({
                  list: newRoot.children,
                  startIndex: newRoot.children.findIndex(
                    i => i.formItemId === source.formItemId,
                  ),
                  finishIndex: newRoot.children.findIndex(
                    i => i.formItemId === target.formItemId,
                  ),
                }),
              )
              setTreeRoot(newItemList)
            }
            // 1.2 not in root
            else {
              const sourceParent = getItemByPath(
                newRoot,
                source.path.slice(0, -1),
              )
              if (!sourceParent) return
              // delete the source in sourceParent
              const delUpdateRoot = updateItemListByPath(
                newRoot,
                sourceParent.path,
                sourceParent.children.filter(
                  i => i.formItemId !== source.formItemId,
                ),
              )
              // Add the target into root
              const newItemList = updateItemListByPath(
                delUpdateRoot,
                delUpdateRoot.path,
                [
                  ...delUpdateRoot.children,
                  {
                    ...source,
                    path: [delUpdateRoot.formItemId, source.formItemId],
                  },
                ],
              )
              setTreeRoot(newItemList)
            }
            return
          }

          // 2. Drop card near card
          const sourceParent = getItemByPath(treeRoot, source.path.slice(0, -1))
          if (!sourceParent) return
          // 2.1 Same Container, reorder the list
          if (
            source.path.slice(0, -1).join('-') ===
            target.path.slice(0, -1).join('-')
          ) {
            const sourceIdx = sourceParent.children.findIndex(
              i => i.formItemId === source.formItemId,
            )
            const destinationIndex = getReorderDestinationIndex({
              // Defined the new item is the last one
              startIndex: sourceIdx,
              indexOfTarget: targetParent.children.findIndex(
                i => i.formItemId === target.formItemId,
              ),
              closestEdgeOfTarget: extractClosestEdge(target),
              axis: 'vertical',
            })

            const newItemList = reorder({
              list: targetParent.children,
              startIndex: sourceIdx,
              finishIndex: destinationIndex,
            })
            const updateRoot = updateItemListByPath(
              newRoot,
              targetParent.path,
              newItemList,
            )
            if (!updateRoot) return
            setTreeRoot(updateRoot)
            return
          }

          // 2.2 Drop card into different card
          // Drag card into a container card
          if (ContainerList.includes(target.type)) {
            // Delete self
            const delUpdateRoot = updateItemListByPath(
              newRoot,
              sourceParent.path,
              sourceParent.children.filter(
                i => i.formItemId !== source.formItemId,
              ),
            )
            if (!delUpdateRoot) return
            // Move self
            const delTarget = getItemByPath(delUpdateRoot, target.path)
            delTarget?.children.push({
              ...source,
              path: [...delTarget.path, source.formItemId],
            })
            if (!delTarget) return
            const newTreeRoot = updateItemListByPath(
              delUpdateRoot,
              delTarget.path,
              delTarget.children,
            )
            setTreeRoot(newTreeRoot)
          }
          // Drop card near different level card
          else {
            const targetIdx = targetParent.children.findIndex(
              i => i.formItemId === target.formItemId,
            )
            const destinationIndex = getReorderDestinationIndex({
              // Defined the new item is the last one
              startIndex: targetParent.children.length,
              indexOfTarget: targetIdx,
              closestEdgeOfTarget: extractClosestEdge(target),
              axis: 'vertical',
            })

            // Delete self
            const delUpdateRoot = updateItemListByPath(
              treeRoot,
              sourceParent.path,
              sourceParent.children.filter(
                i => i.formItemId !== source.formItemId,
              ),
            )
            if (!delUpdateRoot) return

            const newItemList = cloneDeep(
              getItemByPath(delUpdateRoot, targetParent.path)?.children,
            )
            if (!newItemList) return
            newItemList?.splice(destinationIndex, 0, {
              ...source,
              path: [...targetParent.path, source.formItemId],
            })

            // Move
            const updateRoot = updateItemListByPath(
              delUpdateRoot,
              targetParent.path,
              newItemList,
            )
            if (!updateRoot) return
            setTreeRoot(updateRoot)
          }
        },
      }),
    )
  }, [treeRoot])
}
