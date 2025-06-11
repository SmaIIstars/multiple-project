import { memo, useMemo } from 'react'
import { Select, SelectProps } from 'antd'
import { omitBy } from 'lodash-es'
import { CustomCompactInputValueItemType } from 'components/custom-compact-input'
import ComponentWrapper from '../lib/component-wrapper'
import { getCommonDefaultValue } from '../constants'
import ItemSelectConfig from './config'

type ItemSelectProps = {
  selectConfig?: SelectProps & Record<string, any>
} & Record<string, any>

const ItemSelect = (props: ItemSelectProps) => {
  const { selectConfig } = props

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== 'onChange' && /[A-Z]/.test(k)),
    [props],
  )

  const formatCustomCompactInputValueInput = (
    value?: CustomCompactInputValueItemType[][],
  ): SelectProps['options'] => {
    const options: SelectProps['options'] = []
    if (!value) return options
    return value.map(row => {
      const [l, v] = row
      return { label: l?.value, value: v?.value ?? '' }
    })
  }

  const customOptions = useMemo(
    () => formatCustomCompactInputValueInput(selectConfig?.options as any),
    [selectConfig?.options],
  )

  return <Select {...filterProps} {...selectConfig} options={customOptions} />
}

export default ComponentWrapper(memo(ItemSelect))
export const getDefaultValue = () => {
  const defaultValDataType = ItemSelectConfig.find(
    c => c.sectionLabel === 'generalConfig',
  )?.items.find(i => i.itemName === 'dataType')?.defaultValue
  return getCommonDefaultValue('select', {
    props: { generalConfig: { dataType: defaultValDataType } },
  })
}
