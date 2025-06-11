import { CloseCircleOutlined } from "@ant-design/icons";
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { DropIndicator } from "@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Form, FormListFieldData } from "antd";
import { useWatch } from "antd/es/form/Form";
import cls from "classnames";
import { cloneDeep, merge } from "lodash-es";
import { ComponentType, useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "../../../../new-dynamic-form/context";
import { useFormItemRenderContext } from "../../../../new-dynamic-form/form-item-render/context";
import type { FormItemType } from "../../../../new-dynamic-form/types";
import {
  getFormItemNamePathList,
  getItemByPath,
  updateItemListByPath,
} from "../../../../new-dynamic-form/util";
import { ConditionGroup } from "../../condition";
import { evaluateConditions } from "../../condition/utils";
import styles from "./index.module.scss";

type ComponentWrapperState =
  | { type: "idle" }
  | { type: "preview"; container: HTMLElement; rect: DOMRect }
  | { type: "dragging" };

const idleState: ComponentWrapperState = { type: "idle" };
const draggingState: ComponentWrapperState = { type: "dragging" };

export type WithDraggingProps<P> = P & {
  index?: number;
  extends?: Partial<{ listField: FormListFieldData }>;
};

function ComponentWrapper<P extends FormItemType>(Cmp: ComponentType<any>) {
  function WithDraggingWrapper(props: WithDraggingProps<P>) {
    const {
      formItemId,
      props: itemProps,
      type,
      path,
      extends: extendsProps,
    } = props;
    const { formItemConfig, generalConfig, ...itemRestConfig } = itemProps;
    const { canEdit } = useFormItemRenderContext() ?? {};
    const { root, currentItem, onItemClick, setRoot } = useFormContext() ?? {};
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
    const [state, setState] = useState<ComponentWrapperState>(idleState);

    const formValues = useWatch([]);
    // Don't support nest list
    const itemVisible = useMemo(() => {
      if (generalConfig?.condition?.length) {
        const { listField } = extendsProps ?? {};
        let rules = generalConfig.condition as ConditionGroup;
        if (listField) {
          rules = rules.map((group) => ({
            ...group,
            items: group.items.map((item) => {
              if (!item?.sourceKey) return item;
              const pathList = item.sourceKey.split(".");
              pathList.splice(pathList.length - 1, 0, `${listField.name}`);
              return {
                ...item,
                sourceKey: pathList.join("."),
              };
            }),
          }));
        }

        return evaluateConditions(rules, formValues);
      }
      return true;
    }, [generalConfig, formValues]);

    const pathList = useMemo(() => {
      if (!root) return [];
      const paths = getFormItemNamePathList(
        root,
        path,
        "props.formItemConfig.name",
        extendsProps?.listField
      );

      return paths;
    }, [root, path]);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const extraFormItemConfig = useMemo(
      () => ({
        valuePropName: ["switch", "checkbox"].includes(type)
          ? "checked"
          : ["upload"].includes(type)
          ? "fileList"
          : undefined,
      }),
      [type]
    );

    const handleDeleteClick = (item: WithDraggingProps<P>) => {
      if (!root) return;
      const { path, formItemId } = item;
      const newRoot = cloneDeep(root);
      const delFormItemParent = getItemByPath(newRoot, path.slice(0, -1));
      if (!delFormItemParent) return;
      const newItem = updateItemListByPath(
        newRoot,
        delFormItemParent.path,
        delFormItemParent.children.filter((i) => i.formItemId !== formItemId)
      );

      setRoot?.(newItem);
      onItemClick?.(null);
    };

    useEffect(() => {
      if (!canEdit) return;
      const element = wrapperRef.current;
      if (!element) return;

      return combine(
        draggable({
          element,
          getInitialData: () => props,
          onDragStart: () => setState(draggingState),
          onDrop: () => setState(idleState),
        }),
        dropTargetForElements({
          element,
          getIsSticky: () => true,
          getData: ({ input }) => {
            return attachClosestEdge(props, {
              input,
              element,
              allowedEdges: ["bottom", "top"],
            });
          },
          onDrag: ({ self, source, location }) => {
            if (source.data?.formItemId === formItemId) setClosestEdge(null);
            else setClosestEdge(extractClosestEdge(self.data));
          },
          onDropTargetChange: ({ self, source, location }) => {
            setClosestEdge(null);
          },
          onDragLeave: ({ self, source }) => {
            setClosestEdge(null);
          },
          onDrop: () => setClosestEdge(null),
        })
      );
    }, [props, formItemId]);

    const RenderContent = useMemo(() => {
      const typeConfig = Reflect.get(itemProps, `${type}Config`);

      return (
        <div
          className={cls({
            [styles.componentWrapperItemWrapper]: true,
            [styles.componentWrapperItemWrapperDisabled]:
              state.type === "dragging",
            [styles.componentWrapperItemActive]:
              currentItem?.formItemId === formItemId,
          })}
          onClick={(e) => {
            onItemClick?.(props);
            e.stopPropagation();
          }}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          {canEdit && (
            <CloseCircleOutlined
              className={styles.componentWrapperDelete}
              onClick={(e) => {
                handleDeleteClick(props);
                e.stopPropagation();
              }}
            />
          )}

          <Form.Item
            className={styles.componentWrapperItem}
            labelCol={
              type === "list"
                ? { span: 24 }
                : merge({ span: 10 }, formItemConfig?.labelCol)
            }
            labelAlign="left"
            initialValue={
              type === "list" ? undefined : typeConfig?.defaultValue
            }
            {...formItemConfig}
            {...extraFormItemConfig}
            name={pathList}
            // rules is a array
            rules={[
              merge(formItemConfig?.rules, {
                required: formItemConfig?.required,
              }),
            ]}
          >
            <Cmp
              {...itemRestConfig}
              {...props}
              {...(type === "condition" && { pathList })}
            />
          </Form.Item>
        </div>
      );
    }, [props, currentItem]);

    return (
      <div ref={wrapperRef} className={styles.componentWrapper}>
        {!!generalConfig?.condition?.length ? (
          <div
            className={cls({
              [styles.componentWrapperNotVisible]: !itemVisible && canEdit,
            })}
            style={!itemVisible && !canEdit ? { display: "none" } : undefined}
          >
            {RenderContent}
          </div>
        ) : (
          RenderContent
        )}
        {state.type === "idle" && closestEdge && (
          <DropIndicator edge={closestEdge} gap={"1px"} />
        )}
      </div>
    );
  }
  return WithDraggingWrapper;
}

export default ComponentWrapper;
