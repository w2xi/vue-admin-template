import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('timeFormatter', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (dayjs(value).isValid()) {
    if (+value === +value) {
      value = +value
    }

    return dayjs(value).format(format)
  } else {
    return ''
  }
})

Vue.filter('toFixed', (value, fractionDigits = 2) => {
  value = Number(value)

  if (value && value === +value) {
    const isFloatNum = typeof value === 'number' && value.toString().indexOf('.') !== -1

    return isFloatNum ? value.toFixed(fractionDigits) : value
  } else {
    return 0
  }
})
