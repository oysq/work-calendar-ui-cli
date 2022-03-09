/**
 * 返回某月第一天
 */
export function getFirstDayOfMonth (date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * 返回某月最后一天
 */
export function getLastDayOfMonth (date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * 返回 类似 2020/01/01 格式的字符串
 */
export function formatDate (date, ch) {
  let year = date.getFullYear()
  let month = (date.getMonth() + 1)
  let day = date.getDate()

  month < 10 && (month = '0' + month)
  day < 10 && (day = '0' + day)

  return (year + ch + month + ch + day)
}

/**
 * 返回 类似 2020/01 格式的字符串
 */
export function formatMonth (date, ch) {
  let year = date.getFullYear()
  let month = (date.getMonth() + 1)

  month < 10 && (month = '0' + month)

  return (year + ch + month)
}
