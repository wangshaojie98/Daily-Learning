/**
 * 
 *  创建一个空的简单JavaScript对象（即{}）；
    链接该对象（设置该对象的constructor）到另一个对象 ；
    将步骤1新创建的对象作为this的上下文 ；
    如果该函数没有返回对象，则返回this。 
 */
function createObj(fn, ...rest) {
  let obj = Object.create(fn.prototype);
  let res = fn.apply(obj, rest)

  return typeof res === 'object' ? res : obj
}