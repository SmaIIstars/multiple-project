import { createContext, useContext } from 'react'

export type FormItemRenderContextProps = {
  canEdit?: boolean
}

export const FormItemRenderContext =
  createContext<FormItemRenderContextProps | null>(null)

export const useFormItemRenderContext = () => {
  const value = useContext(FormItemRenderContext)
  return value
}
