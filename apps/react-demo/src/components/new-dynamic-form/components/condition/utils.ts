import { get } from 'lodash-es'
import { LogicTypeEnum, OperatorTypeEnum } from './constants'

import type { ConditionGroup, ConditionItem } from '.'

export const evaluateConditions = (
  rules: ConditionGroup,
  values: any,
  path?: string
): boolean => {
  const targetValues = path ? get(values, path) : values
  if (!rules || rules.length === 0) return true

  return rules.some((group) => {
    if (group.logicType === LogicTypeEnum.or) {
      return group?.items?.some((item) => evaluateCondition(item, targetValues))
    } else {
      return group?.items?.every((item) =>
        evaluateCondition(item, targetValues)
      )
    }
  })
}

/**
 * 评估单个条件
 * @param condition 单个条件项
 * @param targetValues 要比较的目标值
 * @returns 是否满足条件
 */
function evaluateCondition(
  condition: ConditionItem,
  targetValues: any
): boolean {
  if (!condition) return true
  const { sourceKey, operator, target } = condition
  if (!target || !target.type || !target.value || !operator || !sourceKey)
    return true

  const { value: targetVal } = target
  const rawActualValue = get(targetValues, sourceKey)
  let actualValue = rawActualValue
  if (['string', 'number', 'boolean'].includes(typeof rawActualValue)) {
    actualValue = `${rawActualValue}`
  }

  switch (operator) {
    case OperatorTypeEnum.EQUAL:
      return actualValue == targetVal
    case OperatorTypeEnum.NOT_EQUAL:
      return actualValue != targetVal
    case OperatorTypeEnum.GREATER_THAN:
      return actualValue > targetVal
    case OperatorTypeEnum.GREATER_THAN_OR_EQUAL:
      return actualValue >= targetVal
    case OperatorTypeEnum.LESS_THAN:
      return actualValue < targetVal
    case OperatorTypeEnum.LESS_THAN_OR_EQUAL:
      return actualValue <= targetVal
    case OperatorTypeEnum.IN:
      return Array.isArray(targetVal) && targetVal.includes(actualValue)
    case OperatorTypeEnum.NOT_IN:
      return Array.isArray(targetVal) && !targetVal.includes(actualValue)
    case OperatorTypeEnum.CONTAINS:
      return (
        typeof actualValue === 'string' &&
        typeof targetVal === 'string' &&
        actualValue.includes(targetVal)
      )
    case OperatorTypeEnum.MATCHES:
      try {
        const regex = new RegExp(targetVal)
        return regex.test(actualValue)
      } catch {
        return false
      }
    default:
      // 类型保护，确保处理了所有枚举值
      const exhaustiveCheck: never = operator
      return exhaustiveCheck
  }
}
