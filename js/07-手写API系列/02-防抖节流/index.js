// 节流
function throttle(fn, delay) {
  let last = 0;

  return function (...args){
    let now = Date.now();
    if (now - last < delay) return

    last = now;
    return fn.apply(this, args)
  }
}

function sayName() {
  console.log('wsj')
}

let fn = throttle(sayName, 1000)

let count = 0;
let timer = setInterval(() => {
  if (count > 5) {
    clearInterval(timer)
  }
  fn()
  console.log('第' + count)
  count++

}, 1000)



function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}