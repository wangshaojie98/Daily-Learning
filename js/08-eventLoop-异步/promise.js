// new Promise((resolve, reject) => {
//   console.log('初始化');

//   resolve();
// })
// .then(() => {
//   throw new Error('有哪里不对了');

//   console.log('执行「这个」”');
// })
// .then((res) => {
//   console.log('进入res', res)
// }, (err) => {
//   console.log('进入err', err)
//   throw new Error('有哪里不对了');
// })
// .catch(() => {
//   console.log('执行「那个」');
// })
// .then((res) => {
//   console.log('执行「这个」，无论前面发生了什么');
// });


// 【Promise 的含义】
// 【基本用法】
// 【Promise.prototype.then()】
// 【Promise.prototype.catch()】
// 【Promise.prototype.finally()】
// 【Promise.all()】
// 【Promise.race()】
// 【Promise.allSettled()】
// 【Promise.any()】
// 【Promise.resolve()】
// 【Promise.reject()】
// 【应用】
// 【Promise.try()】












// 【Promise.prototype.finally()】

// resolve 的值是 undefined
// Promise.resolve(2).then((res) => {
//   console.log(res) // 2
//   return res
// }, () => {}).then((res) => {
//   console.log(res) // 2
// })

// resolve 的值是 2
// Promise.resolve(2).finally((res) => {
//   console.log(res) // undefined
// }).then(res => {
//   console.log(res) // 2
// })

// reject 的值是 undefined
// Promise.reject(3).then(() => {}, (err) => {
//   console.log(err) // 3
// })

// // // reject 的值是 3
// Promise.reject(3).finally(() => {})



// 【Promise.all()】
function example4() {
  const promises = [1, 2, 3, 4].map(v => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, v * 1000, v)
    })
  })

  Promise.all(promises).then(res => {
    console.log(res)
  })
}
// example4()

function example5() {
  const promises = [1, 2, 3, 4].map(v => {
    return new Promise((resolve, reject) => {
      if (v === 3) {
        setTimeout(() => {
          console.log(v)
          reject(v)
        }, v * 1000)
      } else {
        setTimeout(resolve, v * 1000, v)
      }
    })
  })

  Promise.all(promises).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}
// example5()

// 如歌参数自己定义了catch则不会触发Promise.all().catch()
function example6() {
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result)
  .catch(e => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  .catch(e => e);
  
  Promise.all([p1, p2])
  .then(result => console.log(result)) // // ["hello", Error: 报错了]
  .catch(e => console.log(e));
}
// example6()


// 【Promise.race()】跟promise.all相反
function example7() {
  const promises = [1, 2, 3, 4].map(v => {
    return new Promise((resolve, reject) => {
      if (v === 3) {
        setTimeout(() => {
          // console.log(v)
          reject(v)
        }, v * 1000)
      } else {
        setTimeout(() => {
          // console.log(v)
          resolve(v)
        }, v * 1000)
      }
    })
  })

  Promise.race(promises).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}
// example7()


// 【Promise.allSettled()】
function example8() {
const promises = [1, 2, 3, 4].map(v => {
  return new Promise((resolve, reject) => {
    if (v === 3) {
      setTimeout(() => {
        // console.log(v)
        reject(v)
      }, v * 1000)
    } else {
      setTimeout(() => {
        // console.log(v)
        resolve(v)
      }, v * 1000)
    }
  })
})

Promise.allSettled(promises).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})
}
// example8()


// 【Promise.any()】
function example9() {
  const promises = [1, 2, 3, 4].map(v => {
    return new Promise((resolve, reject) => {
      if (v === 3) {
        setTimeout(() => {
          // console.log(v)
          reject(v)
        }, v * 1000)
      } else {
        setTimeout(() => {
          // console.log(v)
          resolve(v)
        }, v * 1000)
      }
    })
  })
  
  Promise.any(promises).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
  }
  example9()