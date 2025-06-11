import { memo, useMemo } from 'react'
import { Slider, SliderSingleProps } from 'antd'
import ComponentWrapper from '../lib/component-wrapper'
import { omitBy } from 'lodash-es'
import { getCommonDefaultValue } from '../constants'
import ItemSliderConfig from './config'

type ItemSliderProps = { sliderConfig?: SliderSingleProps } & Record<
  string,
  any
>

const ItemSwitch = (props: ItemSliderProps) => {
  const { sliderConfig } = props

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== 'onChange' && /[A-Z]/.test(k)),
    [props],
  )

  return <Slider {...filterProps} {...sliderConfig} />
}

export default ComponentWrapper(memo(ItemSwitch))
export const getDefaultValue = () => {
  const defaultValDataType = ItemSliderConfig.find(
    c => c.sectionLabel === 'generalConfig',
  )?.items.find(i => i.itemName === 'dataType')?.defaultValue
  return getCommonDefaultValue('slider', {
    props: { generalConfig: { dataType: defaultValDataType } },
  })
}
