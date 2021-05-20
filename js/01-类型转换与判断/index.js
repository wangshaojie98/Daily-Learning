let a = 0.1 + 0.2; // 0.30000000000000004
console.log(a);

console.log(a === 0.3) // false
// 为什么会出现0.1 + 0.2 ！== 0.3?
// 因为底层用二进制存储小数位的时候会进行截断操作，导致精度损失

// 如何解决？
console.log(parseFloat(a.toFixed(10)) === 0.3)




// 1. typeof 是否能正确判断类型？
console.log(typeof 1)
console.log(typeof '1')
console.log(typeof false)
console.log(typeof null)
console.log(typeof undefined)
console.log(typeof Symbol(1))
console.log(typeof 1n)

// 2. instanceof能否判断基本数据类型？
class PrimitiveNumber {
  static [Symbol.hasInstance](v) {
    return typeof v === 'number'
  }
}

console.log(1 instanceof PrimitiveNumber)

// 3. 能不能手动实现一下instanceof的功能？
function myInstanceof(obj, constructor) {
  let proto = Object.getPrototypeOf(obj);

  while (proto) {
    if (proto === constructor.prototype) {
      return true
    }

    if (!proto) return false;

    proto = Object.getPrototypeOf(proto);
  }

  return false
}
console.log(myInstanceof([], Array))
console.log(myInstanceof('1', String))

// 4. Object.is和===的区别？
function is (x, y) {
  // +0， -0情况
  if (x === y && typeof x === 'number') {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
console.log(is(+0, -0))
console.log(is(0, 0))
console.log(is(NaN, NaN))
let x = Symbol('1');
console.log(x === x)


// 第三篇: JS数据类型之问——转换篇
// 1. [] == ![]结果是什么？为什么？
console.log([] == ![])
// 首先![]会布尔类型转换，![]变成false,[] == false，会将false变成0，[] == 0 ,[]调用valueOf返回[]，再调用toString返回''，ToNumber('')为0
// 所以0 == 0

//  如果任一操作数是布尔值，则将其转换为数值再比较是否相等。false 转换为 0，true 转换
// 为 1。
//  如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否
// 相等。
//  如果一个操作数是对象，另一个操作数不是，则调用对象的 valueOf()方法取得其原始值，再
// 根据前面的规则进行比较。
// 在进行比较时，这两个操作符会遵循如下规则。
//  null 和 undefined 相等。
//  null 和 undefined 不能转换为其他类型的值再进行比较。
//  如果有任一操作数是 NaN，则相等操作符返回 false，不相等操作符返回 true。记住：即使两
// 个操作数都是 NaN，相等操作符也返回 false，因为按照规则，NaN 不等于 NaN。
//  如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，
// 则相等操作符返回 true。否则，两者不相等。


// 对象转数字的过程中，JavaScript 做了同样的事情，只是它会首先尝试 valueOf 方法

// 如果对象具有 valueOf 方法，且返回一个原始值，则 JavaScript 将这个原始值转换为数字并返回这个数字
// 否则，如果对象具有 toString 方法，且返回一个原始值，则 JavaScript 将其转换并返回。
// 否则，JavaScript 抛出一个类型错误异常。

// 4. 对象转原始类型是根据什么流程运行的？
let o1 = {
  value: 3,
  // valueOf() {
  //   return this.value
  // },
  toString() {
    return '5'
  }
  // [Symbol.toPrimitive]() {
  //   return 6
  // }
};

console.log(+o1)

// 5. 如何让if(a == 1 && a == 2)条件成立？
let o2 = {
  value: 0,
  valueOf() {
    return ++this.value
  }
}

console.log(o2 == 1 && o2 == 2)