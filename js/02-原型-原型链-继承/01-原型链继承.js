function example1(){
  function Parent() {
    this.name = 'Parent'
  }
  
  Parent.prototype.getName = function() {
    return this.name
  }
  
  function Child() {}
  
  Child.prototype = new Parent()
  
  let child1 = new Child()
  console.log(child1.getName()) // Parent
}
example1()

// 问题 1.引用类型的属性被所有实例共享
// 2.在创建 Child 的实例时，不能向Parent传参
function example2(){
  function Parent() {
    this.name = 'Parent'
    this.love = ['car', 'girl']
  }
  
  Parent.prototype.getName = function() {
    return this.name
  }
  Parent.prototype.getLove = function() {
    return this.love
  }
  
  function Child() {}
  
  Child.prototype = new Parent()
  
  let child1 = new Child()
  child1.love.push('money')
  console.log(child1.getLove()) // [ 'car', 'girl', 'money' ] 
  let child2 = new Child()
  console.log(child2.getLove()) // [ 'car', 'girl', 'money' ] 
}
example2()