export function isValueNotEmpty(value) {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length !== 0
    } else {
      return Object.keys(value).length !== 0
    }
  }

  if (typeof value === 'string') {
    return value.trim() !== ''
  }

  if (typeof value === 'number') {
    return value !== 0
  }

  return true
}
