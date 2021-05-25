// 1.数组的浅拷贝
// 2.数组的深拷贝
// 3.浅拷贝的实现
// 4.深拷贝简易版的实现

// 【1.数组的浅拷贝】
function arrShallowClone(arr) {
  if (!arr instanceof Array) {
    throw new TypeError('arr instanceof Array');
  }
  // return [].concat(arr)
  // return arr.slice()
  return [...arr]
}

// 【2.数组的深拷贝】
function arrDeepClone(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('params must be Array type!')
  }

  return JSON.parse(JSON.stringify(arr))
}

// 【3.浅拷贝的实现】
function shallowClone(obj) {
  if (typeof obj !== 'object') return 

  // 在判断是否是数组
  let res = obj instanceof Array ? [] : {};

  // 数组其实也是一种对象
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = obj[key]
    }
  }

  return res
}

// 【4.深拷贝简易版的实现】
function deepClone(obj) {
  if (typeof obj !== 'object') return

  let newObj = obj instanceof Array ? [] : {}

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }

  return newObj;
}