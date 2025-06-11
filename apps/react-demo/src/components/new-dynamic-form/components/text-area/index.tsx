import { memo, useMemo } from 'react'
import { Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import ComponentWrapper from '../lib/component-wrapper'
import { omitBy } from 'lodash-es'
import { getCommonDefaultValue } from '../constants'
import ItemTextAreaConfig from './config'

type ItemTextAreaProps = { textAreaConfig?: TextAreaProps } & Record<
  string,
  any
>

const ItemTextArea = (props: ItemTextAreaProps) => {
  const { textAreaConfig } = props

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== 'onChange' && /[A-Z]/.test(k)),
    [props],
  )

  return <Input.TextArea {...filterProps} {...textAreaConfig} />
}

export default ComponentWrapper(memo(ItemTextArea))
export const getDefaultValue = () => {
  const defaultValDataType = ItemTextAreaConfig.find(
    c => c.sectionLabel === 'generalConfig',
  )?.items.find(i => i.itemName === 'dataType')?.defaultValue
  return getCommonDefaultValue('textArea', {
    props: { generalConfig: { dataType: defaultValDataType } },
  })
}
