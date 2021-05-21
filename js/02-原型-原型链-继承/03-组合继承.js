// 解决 借用构造函数的缺点：方法定义在父类构造函数当中，因此方法不能重用，另外子类也不能范文父类原型定义的方法
function example1(){
  function Parent(name) {
    this.name = name
    this.love = ['car', 'girl']
  }
  
  Parent.prototype.getLove = function(){
    return this.love
  }

  function Child(name) {
    Parent.call(this, name)
  }
  
  Child.prototype = new Parent()
  Child.prototype.constructor = Child
  
  let child1 = new Child('wsj')
  child1.love.push('money')
  console.log(child1.getLove()) // [ 'car', 'girl', 'money' ] 
  console.log(child1.name) // wsj

  let child2 = new Child('gy')
  console.log(child2.name) // gy
  console.log(child2.getLove()) // [ 'car', 'girl' ] 
}
example1()
// 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
// 缺点：原型链继承时重复执行一次父类