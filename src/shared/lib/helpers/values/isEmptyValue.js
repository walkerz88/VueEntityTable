export const isEmptyValue = (value) => {
  if (value instanceof Date) {
    return false
  }

  return (
    ['', null, undefined, '{}'].includes(value) === true ||
    (Array.isArray(value) === true && value.length === 0) ||
    (typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0)
  )
}
