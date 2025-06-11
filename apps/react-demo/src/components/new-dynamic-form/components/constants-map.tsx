import { ComponentType } from 'react'
// Render And AssociateAttribute Function
import ItemInput from './input'
import ItemInputNumber, {
  associateAttribute as InputNumberAssociateAttribute,
} from './input-number'
import ItemSwitch from './switch'
import ItemSlider from './slider'
import ItemCheckbox from './checkbox'
import ItemRadio from './radio'
import ItemSelect from './select'
import ItemTimePicker from './time-picker'
import ItemDatePicker from './date-picker'
import ItemUpload from './upload'
import ItemCode from './code'
import ItemValuePicker from './value-picker'
import ItemValueMaker from './value-maker'
import ItemTextArea from './text-area'
import ItemCondition from './condition'
import ItemCodeTemplate from './code-template'

// Config
import ItemInputConfig from './input/config'
import ItemInputNumberConfig from './input-number/config'
import ItemSwitchConfig from './switch/config'
import ItemSliderConfig from './slider/config'
import ItemCheckboxConfig from './checkbox/config'
import ItemRadioConfig from './radio/config'
import ItemSelectConfig from './select/config'
import ItemTimePickerConfig from './time-picker/config'
import ItemDatePickerConfig from './date-picker/config'
import ItemUploadConfig from './upload/config'
import ItemCodeConfig from './code/config'
import ItemValuePickerConfig from './value-picker/config'
import ItemValueMakerConfig from './value-maker/config'
import ItemTextAreaConfig from './text-area/config'
import ItemConditionConfig from './condition/config'
import ItemCodeTemplateConfig from './code-template/config'

import { ConfigSectionType, FormItemType, FormSelectorType } from '../types'
import ComponentWrapper, { WithDraggingProps } from './lib/component-wrapper'

export const FormItemRenderMap: Partial<
  Record<
    FormSelectorType,
    ComponentType<WithDraggingProps<FormItemType> & Record<string, any>> | null
  >
> = {
  root: null,
  input: ItemInput,
  inputNumber: ItemInputNumber,
  switch: ItemSwitch,
  slider: ItemSlider,
  checkbox: ItemCheckbox,
  radio: ItemRadio,
  select: ItemSelect,
  timePicker: ItemTimePicker,
  datePicker: ItemDatePicker,
  upload: ItemUpload,
  code: ItemCode,
  valuePicker: ItemValuePicker,
  valueMaker: ItemValueMaker,
  textArea: ItemTextArea,
  condition: ComponentWrapper(ItemCondition),
  codeTemplate: ItemCodeTemplate,
}

export const FormItemConfigMap: Partial<
  Record<FormSelectorType, ConfigSectionType[]>
> = {
  root: [],
  input: ItemInputConfig,
  inputNumber: ItemInputNumberConfig,
  switch: ItemSwitchConfig,
  slider: ItemSliderConfig,
  checkbox: ItemCheckboxConfig,
  radio: ItemRadioConfig,
  select: ItemSelectConfig,
  timePicker: ItemTimePickerConfig,
  datePicker: ItemDatePickerConfig,
  upload: ItemUploadConfig,
  code: ItemCodeConfig,
  valuePicker: ItemValuePickerConfig,
  valueMaker: ItemValueMakerConfig,
  textArea: ItemTextAreaConfig,
  condition: ItemConditionConfig,
  codeTemplate: ItemCodeTemplateConfig,
}

export const formItemRegister = (
  key: FormSelectorType,
  info: Partial<{
    Render: ComponentType<
      WithDraggingProps<FormItemType> & Record<string, any>
    > | null
    config: ConfigSectionType[]
    associateAttribute: (
      item: FormItemType,
      changeValues?: FormItemType['props'],
    ) => FormItemType | void
  }>,
) => {
  const { Render, config, associateAttribute } = info
  if (Render) Reflect.set(FormItemRenderMap, key, Render)
  if (config) Reflect.set(FormItemConfigMap, key, config)
  if (associateAttribute)
    Reflect.set(
      componentAssociateAttributeChangeFunctionMap,
      key,
      associateAttribute,
    )
}

export const componentAssociateAttributeChangeFunctionMap: Partial<
  Record<
    FormSelectorType,
    (
      item: FormItemType,
      changeValues?: FormItemType['props'],
    ) => FormItemType | void
  >
> = {
  inputNumber: InputNumberAssociateAttribute,
}
