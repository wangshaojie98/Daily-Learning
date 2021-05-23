/**
 * forEach中return有效果吗？
 * 如何中断forEach循环？
 */
let nums = [1, 2, 3]
let res = 0
// forEach中return有效果吗？
// forEach里面返回false不能中断
nums.forEach((item, index) => {
  console.log(item) // 1, 2, 3
  if (item === 2) {
    return 2
  }
})


// 【如何中断forEach循环？】
// 使用try catch监听，在中断处抛异常
try {
  nums.forEach((item, index) => {
    console.log(item) // 1, 2
  
      if (item == 2) {
        throw new Error("抛错")
      }
  })
} catch(e) {

}

// 推荐使用every，some
// every在中断的地方返回false
nums.every((item, index) => {
  console.log(item) // 1, 2
  if (item === 2) {
    return false
  } else {
    return true
  }
})

// some在中断的地方返回true
nums.some((item, index) => {
  console.log(item) // 1, 2
  return item === 2 ? true : false
})