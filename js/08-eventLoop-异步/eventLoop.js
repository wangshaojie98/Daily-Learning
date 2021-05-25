async function async1() {
  console.log('async1 start') // 2
  await async2()
  console.log('async1 end') // 6
}

async function async2() {
  console.log('async2') // 3
  await async3()
  console.log('async2 end')
}

async function async3() {
  console.log('async3 start')
}
console.log('script start') // 1

setTimeout(function() {
  console.log('setTimeout') // 宏任务
}, 0)  

async1()

new Promise(function(resolve) {
  console.log('promise1') // 4
  resolve()
}).then(function() { // 微任务1
  console.log('promise2') // 7
})

console.log('script end') // 5