import dayjs from 'dayjs'
// 金钱保留两位小数
export const formatMoneyNumber = money => Number(money).toFixed(2)

// 将大数美三位添加一个逗号
export const commaNumber = number => {
  if (!Number.isInteger(number)) {
    throw new Error('commaNumber only accept integer')
  }
  return Array.prototype.reduce.call(String(number), (list, item, index) => {
    const numberListIndex = Math.floor(index / 3)
    if (!list[numberListIndex]) {
      list[numberListIndex] = []
    }
    list[numberListIndex].push(item)
    log(list)
  return list
}, []).map(item => item.join('')).join(',')
}

// 格式化时间显示 ---> 2019-4-22 07:22:11
export const formatDate = (date = '', originFormat = 'YYYY-MM-DDTHH:mm:ss.000ZZ') => !!date ? dayjs(date, originFormat).format('YYYY-MM-DD HH:mm:ss') : '-'