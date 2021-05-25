let a = new Promise((resolve, reject) => {
  resolve(2)
})
a.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})

// 一个完整的Promise需要哪些属性/方法
// 1. 一个status："peding/fulfilled/rejected"
// 2. error属性
// 3. value属性
// 4. onFulfilled方法
// 5. onRejected方法
// 6. resolve函数
// 7. reject函数

const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

class MyPromise {
  constructor (executor) {
    this.status = PENDING
    this.error = null
    this.value = null
    this.onFulfilled = null // then函数的成功回调
    this.onRejected = null // then函数的失败回调

    this.onFulfilledCallBacks = []
    this.onRejectedCallBacks = []

    const resolve = (value) => {
      if (this.status !== PENDING) return;
      setTimeout(() => {
        this.status = FULFILLED
        this.value = value

        this.onFulfilledCallBacks.forEach(onFulfilled => onFulfilled(this.value))
      })

    }

    const reject = (error) => {
      if (this.status !== PENDING) return;

      setTimeout(() => {
        this.error = error
        this.status = REJECTED

        this.onRejectedCallBacks.forEach(onRejected => onRejected(this.error))
      })
    }

    executor(resolve, reject)
  }

  then1(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      this.onFulfilledCallBacks.push(onFulfilled)
      this.onRejectedCallBacks.push(onRejected)
    } else if (this.status === FULFILLED) { 
      // 应对Promise.resolve().then()
      // 如果状态是fulfilled，直接执行成功回调，并将成功值传入
      onFulfilled(this.value)
    } else {
      //如果状态是rejected，直接执行失败回调，并将失败原因传入
      onRejected(this.error)
    }

    // 把Promise返回
    return this
  }

  then2(onFulfilled, onRejected) {
    let bridgePromise;
    if (this.status === PENDING) {
      let self = this;

      return bridgePromise = new MyPromise((resolve, reject) => {
        self.onFulfilledCallBacks.push((value) => { // 父Promise的then控制then的promise的返回值
          try {
            let x = onFulfilled(value);
            resolve(x);
          } catch(e) {
            reject(e)
          }
        })

        self.onRejectedCallBacks.push((error) => {
          try {
            let x = onRejected(error)
            resolve(x)
          } catch(e) {
            reject(e)
          }
        })
      }) 
    } else if (this.status === FULFILLED) {
      onFulfilled(this.value)
    } else {
      onRejected(this.error)
    }
  }
}

// 实现Promise.prototype.catch
Promise.prototype.myCatch = function(onRejected) {
  return this.then(null, onRejected)
}

// 实现 Promise.resolve
// 实现 resolve 静态方法有三个要点:
// 传参为一个 Promise, 则直接返回它。
// 传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态。
// 其他情况，直接返回以该值为成功状态的promise对象。
Promise.myResolve = function(params) {
  if (params instanceof Promise) return params;

  return new Promise((resolve, reject) => {
    if (params && params.then && typeof params.then === 'function') {
      params.then(resolve, reject);
    } else {
      resolve(params)
    }
  })
}

// 实现 Promise.reject
Promise.myReject = function(params) {
  return new Promise((resolve, reject) => {
    reject(params)
  })
}

// 实现 Promise.prototype.finally
Promise.prototype.myFinally = function(cb) {
  return this.then(
    res => Promise.resolve(cb()).then(() => res), // Promise.resolve(cb())为了让cb执行结束，再执行then
    err => Promise.resolve(cb()).then(() => err))
}

// 实现 Promise.all
// 传入参数为一个空的可迭代对象，则直接进行resolve。
// 如果参数中有一个promise失败，那么Promise.all返回的promise对象失败。
// 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组
Promise.myAll = function(promises) {
  return new Promise(function(resolve, reject) {
    let result = []
    let len = promises.length;
    let index = 0;
    if (len === 0) {
      resolve()
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promise[i]).then(res => {
        result.push(res)
        index++
        if (index === len) {
          resolve(result)
        }
      }).catch(e => {
        reject(e)
      })
    }
  })
}

// 实现 Promise.race
Promise.myRace = function(promises) {
  return new Promise(function(resolve, reject) {
    let result = []
    let len = promises.length;
    if (len === 0) {
      resolve()
    }

    for (let i = 0; i < len; i++) {
      Promise.resolve(promise[i]).then(res => {
        resolve(result)
        return
      }).catch(e => {
        reject(e)
        return
      })
    }
  })
}
