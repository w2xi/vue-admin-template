const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * @description: 获取数组的一列
 * @param {Array} value 
 * @param {String} on 
 * @return {Array}
 * @example 
 * 
 * column([{name: '小明'}, {name: '花花'}], 'name')
 * 
 * => // ['小明', '花花']
 */
export function column(value, on = 'id'){
  return value.map(item => item[on])
}

/**
 * Generate a function to sort array by the given field
 * @param {String} on 
 * @param {String} order asc | desc
 * @returns {Function}
 */
export function buildSorter(on, order = 'asc') {
  return (a, b) => {
    const flag = order === 'asc' ? 1 : -1
    return flag * ( a[on] - b[on] )
  }
}

// 排序函数, 根据指定的字段排序
export function sort(data, on, options = {}) {
  options || (options = {})

  const order = options.order || 'asc'
  const depth = options.depth || 1
  const childKey = options.childKey || 'children'
  const sorter = options.sorter || buildSorter(on, order)

  data.sort(sorter)

  if (depth > 1) {
    data.forEach(item => {
      const children = item[childKey]
      if (children && children.length) {
        sort(children, on, {...options, depth: depth - 1})
      }
    })
  }

  return data
}

/**
 * @description: 数组转对象
 * @param {Array} arr 
 * @param {String} on 
 * @return {Object}
 * @example
 * 
 * const arr = [{id: 1, name: '小明'}, {id: 2, name: '小红'}]
 * 
 * arr2Obj(arr, 'id')
 * // => {1: {id: 1, name: '小明'}, 2: {id: 2, name: '小红'}}
 */
export function arr2Obj(arr, on){
  return arr.reduce((obj, item) => {
    obj[item[on]] = item
    return obj
  }, {})
}

/**
 * @description: 下载文件
 * @param {String} url      下载地址
 * @param {String} filename 文件名
 * @return void
 */
export function downloadFile(url, filename) {
  // reference: https://www.jianshu.com/p/6545015017c4
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // 释放对象
  // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL
  window.URL.revokeObjectURL(url)
}

/**
 * @description: 确保创建的函数多次调用只会被执行一次
 * @param {Function} fn 
 * @param {Any} context
 * @return
 * @example
 * 
 * const init = once(() => console.log('init'))
 * 
 * init()
 * init()
 * 
 * // => 'init'
 */
export function once(fn, context) {
  let called = false
  return function () {
    if (!called) {
      called = true
      return fn.apply(context, arguments)
    }
  }
}

/**
 * @description: 节流. 将高频率执行的操作降为中低频率执行的操作
 * @param {Function} fn     要执行的函数
 * @param {Number} interval 执行得间隔时间
 * @param {Object} options
 * @return {Function}
 * @example
 * 
 * window.addEventListener('resize', throttle(() => console.log(1), 1000))
 */
 export function throttle(fn, interval, options = {}) {
  let ret, timer
  let leading = options.leading === false
  interval = interval || 500

  const throttled = (...args) => {
    if (leading) {
      leading = false
      return ret = fn.apply(this, args)
    }
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        ret = fn.apply(this, args)
      }, interval)
    }

    return ret
  }
  throttled.calcel = () => {
    clearTimeout(timer)
    timer = null
  }

  return throttled
}