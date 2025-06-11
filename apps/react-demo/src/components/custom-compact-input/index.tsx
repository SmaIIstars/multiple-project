import React, { useEffect, useRef, useState, memo } from 'react'
import cls from 'classnames'
import { Button, Input, InputProps, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { assignIn, cloneDeep } from 'lodash-es'

import styles from './index.scss'

export type CustomCompactInputValueItemType = {
  label: string
  value: string

  [key: string]: any
} & InputProps

export type CustomCompactInputType = {
  value?: Array<Array<CustomCompactInputValueItemType>>
  onChange?: (v: CustomCompactInputValueItemType[][]) => void
  defaultValue?: Array<CustomCompactInputValueItemType>

  minCount?: number
  maxCount?: number
  onAddItem?: () => void
  onDeleteItem?: (index: number) => void
  onFormatValue?: (v: any) => CustomCompactInputValueItemType[][]
  wrapperClassName?: string
}

const DEFAULT_VALUE = [{ label: 'Label', value: '' }]

const CustomCompactInput = (props: CustomCompactInputType) => {
  const {
    value,
    defaultValue,
    minCount,
    maxCount,
    onChange,
    onAddItem,
    onDeleteItem,
    onFormatValue,
    wrapperClassName,
  } = props
  const formatValue = onFormatValue?.(value) ?? value ?? []
  const [curValues, setCurValues] = useState(formatValue)
  const defaultValRef = useRef<Array<CustomCompactInputValueItemType>>()

  const handleValueChange = (
    pos: [number, number],
    key: string,
    value: string,
  ) => {
    const [x, y] = pos
    const newValues = [...curValues]
    const curItem = newValues?.[x]?.[y]

    Reflect.set(curItem, key, value)
    onChange?.(newValues)
  }

  const handleAddItem = () => {
    if (onAddItem) return onAddItem()

    const newValues = [...curValues]

    newValues.push(
      cloneDeep(defaultValRef.current ?? defaultValue ?? DEFAULT_VALUE),
    )
    onChange?.(newValues)
  }

  const handleDeleteItem = (idx: number) => {
    if (onDeleteItem) return onDeleteItem(idx)
    const newValues = [...curValues]
    newValues.splice(idx, 1)
    onChange?.(newValues)
  }

  useEffect(() => {
    if (!defaultValRef.current && formatValue?.[0]) {
      defaultValRef.current = cloneDeep(formatValue[0])?.map?.(i =>
        assignIn(i, { value: '' }),
      )
    }
  }, [])

  useEffect(() => {
    setCurValues(formatValue)
  }, [value])

  return (
    <div className={cls(wrapperClassName, styles.customCompactInputWrapper)}>
      <div className={styles.customCompactInputItemWrapper}>
        {curValues?.map?.((curRowItems, rowIdx) => (
          <Space.Compact
            key={`${rowIdx}`}
            size="large"
            className={styles.customCompactInputItem}
          >
            {curRowItems?.map?.((item, colIdx) => {
              const { label, value, ...inputProps } = item
              const isLast = colIdx === curRowItems.length - 1
              return (
                <React.Fragment key={`${rowIdx}-${colIdx}-${label}`}>
                  <Input
                    key={`${rowIdx}-${colIdx}-${label}`}
                    placeholder={label}
                    onChange={e =>
                      handleValueChange(
                        [rowIdx, colIdx],
                        'value',
                        e.target.value,
                      )
                    }
                    value={value}
                    {...inputProps}
                  />

                  {isLast && (
                    <Button
                      onClick={() => handleDeleteItem(rowIdx)}
                      icon={<MinusCircleOutlined />}
                      disabled={
                        minCount ? curValues.length <= minCount : undefined
                      }
                    />
                  )}
                </React.Fragment>
              )
            })}
          </Space.Compact>
        ))}
      </div>

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        disabled={
          (maxCount ? curValues.length >= maxCount : undefined) ||
          curValues[curValues.length - 1]?.[0]?.label === ''
        }
        onClick={handleAddItem}
      >
        Add
      </Button>
    </div>
  )
}

export default memo(CustomCompactInput)
