import { memo, useEffect, useMemo } from 'react'
import { Button, Upload, UploadProps } from 'antd'
import ComponentWrapper from '../lib/component-wrapper'
import { omitBy } from 'lodash-es'
import { getCommonDefaultValue } from '../constants'
import ItemUploadConfig from './config'

type ItemUploadProps = {
  uploadConfig?: UploadProps & Record<string, any>
} & Record<string, any>

const ItemUpload = (props: ItemUploadProps) => {
  const { uploadConfig } = props

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== 'onChange' && /[A-Z]/.test(k)),
    [props],
  )

  return (
    <Upload {...filterProps} {...uploadConfig}>
      <Button>{uploadConfig?.buttonText ?? 'Click to Upload'}</Button>
    </Upload>
  )
}
export const getDefaultValue = () => {
  const defaultValDataType = ItemUploadConfig.find(
    c => c.sectionLabel === 'generalConfig',
  )?.items.find(i => i.itemName === 'dataType')?.defaultValue
  return getCommonDefaultValue('upload', {
    props: { generalConfig: { dataType: defaultValDataType } },
  })
}
export default ComponentWrapper(memo(ItemUpload))
