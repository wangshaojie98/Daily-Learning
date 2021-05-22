/**
 * 模拟call
 * 1. 模拟上下文，不传为window
 * 2. 使用ES3模拟传不定参
 * 3. 返回值
 */

  // 1. 模拟上下文，不传为window
 Function.prototype.myCall1 = function(context) {
  context = context || window;
  // 给上下文对象添加一个方法
  context.fn = this;

  let res = context.fn()

  // 但是还要删除这个属性
  delete context.fn
  // return res;
 }

//  2. 使用ES3模拟传不定参/ 返回值
Function.prototype.myCall2 = function(context) {
  context = context || window;
  // 给上下文对象添加一个方法
  context.fn = this;

  let args = []
  for (let i = 1; i < arguments.length; i++) {
    // args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
    // 因为eval会当做js变量来解析
    args.push('arguments' + '[' + i + ']');
  }
  // args在 + 数组的时候会自动 
  // 数组 + 字符串 = Array.toString() + string
  // Array.toString()=== Array.join(',')

  // args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
  let res = eval('context.fn(' + args + ')');
  delete context.fn

  return res
}

function sayAge(...args) {
  (() => {
    (() => {
      console.log(this.age) // 12
      console.log(args)
    })()
  })()
}
let p = {
  age: 12
}

sayAge.myCall2(p)


//  2. 使用ES6模拟传不定参/ 返回值
Function.prototype.myCall3 = function(context, ...args) {
  context = context || window;
  // 给上下文对象添加一个方法
  context.fn = this;

  let res = context.fn(...args);
  delete context.fn

  return res
}

sayAge.myCall3(p)


/**
 * apply模拟实现
 * 1. 模拟上下文，不传为window，返回值
 * 2. 参数为一个类数组对象
 * 
 */
// 使用ES3模拟
Function.prototype.myApply1 = function(context, argsArray) {
  context = context || window;
  // 给上下文对象添加一个方法
  context.fn = this;
  let res
  if (!argsArray) {
    res = context.fn();
  } else {
    let args = []

    for (let i = 1; i < argsArray.length; i++) {
      args.push('argsArray' + '[' + i + ']')
    }

    res = eval('context.fn' + '(' + args + ')')
  }
  delete context.fn
  return res
}

sayAge.myApply1(p)
sayAge.myApply1(p, ['abc', 'cde'])