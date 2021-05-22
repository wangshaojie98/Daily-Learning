/**
 * 模拟bind
 * 1. 返回一个新函数，并且bind接受不定长参数
 * 2. 新函数执行时绑定上下文
 * 3. 如果使用new运算符构造绑定函数，则忽略2中的值。
 * 4. 如果参数为空/thisArg为null,则执行函数的上下文自动绑定
 */
// 使用ES3
Function.prototype.myBind = function (context) {

  if (typeof this !== 'function') {
    throw new Error('Argument must be a function');
  }

  let args = Array.prototype.slice.call(arguments, 1);
  let fn = this

  function fBound() {
    let bindArgs = Array.prototype.slice.call(arguments);
    return fn.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    
  }

  fBound.prototype = Object.create(this)

  return fBound
}

function sayA(age) {
  console.log(age)
  console.log(this.name)

  this.age = age
}
let person = {
  name: 'wsj'
}
sayA.myBind(person, 22)()

let P = sayA.myBind(person, 22)
console.log(new P())