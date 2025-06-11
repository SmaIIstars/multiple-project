import { createContext, useContext } from 'react'
import { FormItemType } from './types'
import { WithDraggingProps } from './components/lib/component-wrapper'
import { TreeSelectProps } from 'antd'

export type FormContextProps = {
  root?: FormItemType
  setRoot?: React.Dispatch<FormItemType>
  currentItem?: FormItemType | null
  onItemClick?: (item: WithDraggingProps<FormItemType> | null) => void
  referenceTreeData?: TreeSelectProps['treeData']
}

export const FormContext = createContext<FormContextProps | null>(null)

export const useFormContext = () => {
  const value = useContext(FormContext)
  return value
}

// Forms
export type FormsContextProps = {
  roots: FormItemType[]
  setRoots: React.Dispatch<FormItemType[]>
}

export const FormsContext = createContext<FormsContextProps | null>(null)

export const useFormsContext = () => {
  const value = useContext(FormsContext)
  return value
}
