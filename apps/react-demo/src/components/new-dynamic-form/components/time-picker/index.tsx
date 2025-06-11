import { memo, useMemo } from 'react'
import { TimePicker, TimePickerProps } from 'antd'
import ComponentWrapper from '../lib/component-wrapper'
import { omitBy } from 'lodash-es'
import { getCommonDefaultValue } from '../constants'
import ItemTimePickerConfig from './config'
import { isDayjs } from 'dayjs'

type ItemTimePickerProps = {
  timePickerConfig?: TimePickerProps & {
    rangePicker: boolean
    [key: string]: any
  }
} & Record<string, any>

const ItemTimePicker = (props: ItemTimePickerProps) => {
  const { timePickerConfig } = props

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== 'onChange' && /[A-Z]/.test(k)),
    [props],
  )

  return (
    <TimePicker
      {...filterProps}
      {...timePickerConfig}
      value={isDayjs(props.value) ? props.value : undefined}
    />
  )
}

export default ComponentWrapper(memo(ItemTimePicker))
export const getDefaultValue = () => {
  const defaultValDataType = ItemTimePickerConfig.find(
    c => c.sectionLabel === 'generalConfig',
  )?.items.find(i => i.itemName === 'dataType')?.defaultValue
  return getCommonDefaultValue('timePicker', {
    props: { generalConfig: { dataType: defaultValDataType } },
  })
}
