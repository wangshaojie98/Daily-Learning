// 本质上async 和await是Generactor和Promise的结合
function createPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time * 1000, time)
  })
}

function *createGenerator() {
  let foo = yield createPromise(1)
  console.log(foo)
  let bar = yield createPromise(foo)
  console.log(bar)
}

function run(generator) {
  let iterator = generator()

  function go(result) {
    let p = result.value;
    if (iterator.done) return;

    if (p instanceof Promise) {
      p.then((res => {
        go(iterator.next(res))
      })).catch(e => {
        iterator.throw(e)
      })
    }

    

  }

  go(iterator.next())
}

run(createGenerator)