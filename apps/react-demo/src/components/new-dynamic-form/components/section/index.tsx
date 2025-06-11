import { CloseCircleOutlined } from "@ant-design/icons";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Collapse } from "antd";
import { cloneDeep } from "lodash-es";
import React, { useEffect, useRef } from "react";
import { useFormContext } from "../../../new-dynamic-form/context";
import { useFormItemRenderContext } from "../../../new-dynamic-form/form-item-render/context";
import { FormItemType } from "../../../new-dynamic-form/types";
import {
  getItemByPath,
  updateItemListByPath,
} from "../../../new-dynamic-form/util";
import { getCommonDefaultValue } from "../constants";
import { formItemRegister, FormItemRenderMap } from "../constants-map";
import { WithDraggingProps } from "../lib/component-wrapper";
import ItemSectionConfig from "./config";
import styles from "./index.module.scss";

export const getDefaultValue = () => getCommonDefaultValue("section");

type SectionProps = WithDraggingProps<FormItemType>;
const Section = (props: SectionProps) => {
  const { formItemId, children, props: itemProps } = props;
  const { formItemConfig } = itemProps ?? {};
  const { root, onItemClick, setRoot } = useFormContext() ?? {};
  const { canEdit } = useFormItemRenderContext() ?? {};

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteClick = (item: SectionProps) => {
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
    if (!sectionRef.current || !headerRef.current || !scrollableRef.current)
      return;

    return combine(
      draggable({
        element: sectionRef.current,
        dragHandle: headerRef.current,
        getInitialData: () => ({
          sectionId: formItemId,
          ...props,
          type: "section",
        }),
      }),
      dropTargetForElements({
        element: scrollableRef.current,
        getIsSticky: () => true,
        getData: (args) => {
          const { input, element } = args;
          const data = { sectionId: formItemId, ...props };

          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
      })
    );
  }, [props, formItemId]);

  return (
    <Collapse
      ref={sectionRef}
      ghost
      collapsible="icon"
      className={styles.sectionWrapper}
      defaultActiveKey={0}
      items={[
        {
          label: (
            <div
              ref={headerRef}
              onClick={() => onItemClick?.(props)}
              className={styles.sectionHeaderWrapper}
              tabIndex={0}
              role="button"
              onKeyDown={() => {}}
            >
              <span className={styles.sectionHeaderTitle}>
                {formItemConfig?.label}
              </span>
              {canEdit && (
                <CloseCircleOutlined
                  className={styles.sectionHeaderDeleteIcon}
                  onClick={(e) => {
                    handleDeleteClick(props);
                    e.stopPropagation();
                  }}
                />
              )}
            </div>
          ),
          children: (
            <>
              {!children?.length ? (
                <div className={styles.sectionDropArea} ref={scrollableRef}>
                  Replace me
                </div>
              ) : (
                <div ref={scrollableRef} className={styles.sectionItemWrapper}>
                  {children?.map((item, idx) => {
                    const { formItemId, type } = item;
                    const Cmp = Reflect.get(FormItemRenderMap, type);
                    if (!Cmp) return null;
                    return (
                      <React.Fragment key={formItemId}>
                        <Cmp {...item} index={idx} />
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </>
          ),
        },
      ]}
    />
  );
};

export default Section;
formItemRegister("section", {
  Render: Section,
  config: ItemSectionConfig,
});
