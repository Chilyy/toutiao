
// 存储数据
export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为JSON格式字符串进行存储
  // 对象或者数组进行 typeof 类型检测，得到的就是小写的object字符串形式
  if (typeof value === 'object') {
  // 如果是数组、对象类型的数据就进行转换，不是的话就直接存进value
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 为什么不用if else 因为if判断json格式不好判断
  // try方式 如果data真的是json格式 就执行成功了 如果不是就返回原数据
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
