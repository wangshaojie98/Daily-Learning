// 1. 调用ES6中的flat方法
// 2. replace + split
// 3. replace + JSON.parse
// 4. 普通递归
// 5. 利用reduce函数迭代
// 6：扩展运算符
// 7:闭包
// 8：while循环

let arr = [1, [2, [3, [4, 5]]], 6];// -> [1, 2, 3, 4, 5, 6]
let str = JSON.stringify(arr); // "[1,[2,[3,[4,5]]],6]"

// 【1. 调用ES6中的flat方法】
let res1 = arr.flat() // 默认deep为1，即只展开一层
console.log(res1) // [ 1, 2, [ 3, [ 4, 5 ] ], 6 ] 

let res2 = arr.flat(Infinity) //使用 Infinity，可展开任意深度的嵌套数组
console.log(res2) // [1, 2, 3, 4, 5, 6]

// 【2. replace + split】
let res3 = str.replace(/\[|\]/g, '').split(',') // 1,2,3,4,5,6
console.log(res3)

// 【3. replace + JSON.parse】
let res4 = JSON.parse('[' + str.replace(/\[|\]/g, '') + ']')
console.log(res4) // [1, 2, 3, 4, 5, 6]

// 【4. 普通递归】
console.log('【4. 普通递归】')
console.log(JSON.stringify(arr)) // [1,[2,[3,[4,5]]],6]

function flatten1(arr) {
  let res = []

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten1(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  
  return res
}
let res5 = flatten1(arr)
console.log(res5)

const eachFlat = (arr = []) => {
  const result = []; // 缓存递归结果
  // 开始递归
  (function flat(arr) {
    // forEach 会自动去除数组空位
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item)) {
        // 递归数组
        flat(item)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
  })(arr)
  // 返回递归结果
  return result;
}

let res6 = eachFlat(arr)
console.log('eachFlat')
console.log(res6)


// 【5. 利用reduce函数迭代】
const reduceFlat = (arr) => {
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      return acc.concat(reduceFlat(cur))
    } else {
      return acc.concat(cur)
    }
  }, [])
}

let res7 = reduceFlat(arr)
console.log(res7)


// 【6：扩展运算符】
 // [1,[2,[3,[4,5]]],6]
function closureFlat(arr) {
  let res = [];

  (function fn(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          fn(arr[i])
        } else {
          res.push(arr[i])
        }
      }
    })(arr)
  return res  
}
let res8 = closureFlat(arr)
console.log(res8)

function spreadFlat(arr) {
  let res = []

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = [...res, ...spreadFlat(arr[i])]
    } else {
      res.push(arr[i])
    }
  }

  return res
}

let res9 = spreadFlat(arr)
console.log(res9)

// 8：while循环
let res10 = [1, [2, [3, [4, 5]]], 6];
while (res10.some(Array.isArray)){
   // [1, [2]]在concat(...[1, [2]]) ==> concat(1, [2])
  //  [].concat(...[1, [2]])
  // [1, 2]
  res10 = [].concat(...res10);
}
console.log(res10)