import CheckboxSVG from "../icons/checkbox.svg";
import CodeSVG from "../icons/code.svg";
import DatePickerSVG from "../icons/date-picker.svg";
import InputNumberSVG from "../icons/input-number.svg";
import InputSVG from "../icons/input.svg";
import ListSVG from "../icons/list.svg";
import RadioSVG from "../icons/radio.svg";
import ReferenceSelectSVG from "../icons/reference-select.svg";
import SectionSVG from "../icons/section.svg";
import SelectSVG from "../icons/select.svg";
import SliderSVG from "../icons/slider.svg";
import SwitchSVG from "../icons/switch.svg";
import TimePickerSVG from "../icons/time-picker.svg";
import UploadSVG from "../icons/upload.svg";
import { FormSelectorType } from "../types";
// import TextAreaSVG from 'assets/images/plugin/text-area.svg'
import TextAreaSVG from "assets/images/plugin/input.svg";

import styles from "./index.module.scss";

export type ItemSelectorType = Record<
  FormSelectorType,
  | Partial<{
      render: React.ReactNode | null | undefined;
      icon: React.ReactNode;
    }>
  | undefined
>;

export const DEFAULT_ITEM_SELECTOR_MAP: ItemSelectorType = {
  root: undefined,
  section: {
    icon: <SectionSVG className={styles.defaultIconSize} />,
  },
  input: {
    icon: <InputSVG className={styles.defaultIconSize} />,
  },
  inputNumber: {
    icon: <InputNumberSVG className={styles.defaultIconSize} />,
  },
  switch: {
    icon: <SwitchSVG className={styles.defaultIconSize} />,
  },
  slider: {
    icon: <SliderSVG className={styles.defaultIconSize} />,
  },
  checkbox: {
    icon: <CheckboxSVG className={styles.defaultIconSize} />,
  },
  radio: {
    icon: <RadioSVG className={styles.defaultIconSize} />,
  },
  select: {
    icon: <SelectSVG className={styles.defaultIconSize} />,
  },
  timePicker: {
    icon: <TimePickerSVG className={styles.defaultIconSize} />,
  },
  upload: {
    icon: <UploadSVG className={styles.defaultIconSize} />,
  },
  code: {
    icon: <CodeSVG className={styles.defaultIconSize} />,
  },
  valuePicker: {
    icon: <ReferenceSelectSVG className={styles.defaultIconSize} />,
  },
  valueMaker: {
    icon: <ReferenceSelectSVG className={styles.defaultIconSize} />,
  },
  list: {
    icon: <ListSVG className={styles.defaultIconSize} />,
  },
  datePicker: {
    icon: <DatePickerSVG className={styles.defaultIconSize} />,
  },
  textArea: {
    icon: <TextAreaSVG className={styles.defaultIconSize} />,
  },
  condition: {
    icon: <TextAreaSVG className={styles.defaultIconSize} />,
  },
  codeTemplate: {
    icon: <CodeSVG className={styles.defaultIconSize} />,
  },
};
