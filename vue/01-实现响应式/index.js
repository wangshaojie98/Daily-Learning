// 让数据变成响应式
function defineReactive(data, key, val) {
  // 存放依赖
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get(val) {
      // 假设依赖是一个函数
      dep.depend()
      return val
    },
    set(newVal) {
      if (val === newVal) return;

      dep.notify()

      val = newVal
    }
  })
}

// 依赖是谁
class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    let index = thiis.subs.findIndex(item => item === sub)
    if (index) {
      return this.subs.splice(index, 1)
    }
  }

  depend() {
    if (window.target) {
      this.addSub(window.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    subs.forEach(sub => {
      sub[i].update()
    })
  }
}

// 观察者
class Watch {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    // 读取data.a.b.c
    this.getter = parsePath(expOrFn);
    this.cb =cb;
    this.value = this.get()
  }

  get() {
    window.target =  this;
    let value = this.getter.call(this.vm, this.vm);
    window.target = undefined;
    return value
  }

  update() {
    const oldValue = this.value;
    this.value = this.get()

    // Watch('data.a', (newVal, oldVal) => {})
    this.cb.call(this.vm, this.value, oldValue)
  }
}

let bailRe = /[^\w.$]/
function parsePath(path) {
  // 非解析
  if (bailRe.test(path)) return
  let segments = path.split('.');
  return function(obj) {
    return segments.reduce((acc, cur) => acc[cur], obj)
  }
}