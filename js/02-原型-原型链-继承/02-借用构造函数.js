// 解决 问题2.在创建 Child 的实例时，不能向Parent传参
// 解决 问题 1.引用类型的属性被所有实例共享
function example1(){
  function Parent(name) {
    this.name = name
    this.love = ['car', 'girl']

    this.getLove = function(){
      return this.love
    }
  }
  
  function Child(name) {
    Parent.call(this, name)
  }
  
  let child1 = new Child()
  child1.love.push('money')
  console.log(child1.getLove()) // [ 'car', 'girl', 'money' ] 

  let child2 = new Child()
  console.log(child2.getLove()) // [ 'car', 'girl' ] 
}
example1()

// 缺点：方法定义在父类构造函数当中，因此方法不能重用，另外子类也不能范文父类原型定义的方法