import type { FormItemProps, FormListFieldData } from 'antd'

export type FormSelectorType =
  | 'root'
  | 'section'
  | 'input'
  | 'inputNumber'
  | 'switch'
  | 'slider'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'timePicker'
  | 'datePicker'
  | 'upload'
  | 'code'
  | 'valuePicker'
  | 'valueMaker'
  | 'list'
  | 'textArea'
  | 'condition'
  | 'codeTemplate'

export type ConfigFormItemMapType =
  | Exclude<
      FormSelectorType,
      | 'root'
      | 'section'
      | 'radio'
      | 'timePicker'
      | 'datePicker'
      | 'upload'
      | 'code'
      | 'valuePicker'
      | 'valueMaker'
      | 'list'
      | 'textArea'
    >
  | 'compactInput'
  | 'subObject'

export type FormItemType<
  T = Partial<
    Record<
      `${FormSelectorType | 'formItem' | 'general'}Config`,
      Record<string, any>
    >
  >,
> = {
  path: string[]
  formItemId: string
  type: FormSelectorType
  children: FormItemType[]
  props: T

  // listField?: FormListFieldData
  extends?: Record<any, any>
  index?: number
}

export type ConfigItemBaseType<T = string> = {
  itemLabel: string
  itemName: T
  type: ConfigFormItemMapType
  children?: ConfigItemBaseType[]
  formItemConfigProps?: FormItemProps

  [key: string]: any
}

export type ConfigSectionType<C = ConfigItemBaseType> = {
  sectionLabel: `${string}Config`
  items: C[]
}

export interface ConfigFormItemType
  extends ConfigSectionType<ConfigItemBaseType> {
  sectionLabel: 'formItemConfig'
  items: ConfigItemBaseType<keyof FormItemProps>[]
}

export interface ConfigGeneralType
  extends ConfigSectionType<ConfigItemBaseType> {
  sectionLabel: 'generalConfig'
  items: ConfigItemBaseType[]
}
