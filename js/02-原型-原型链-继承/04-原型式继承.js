// 解决 原型链继承时重复执行一次父类
function example1(){
  function createObj(obj) {
    function F() {}
    F.prototype = obj;
    return new F()
  }

  let person = {
    colors: ['blue', 'white']
  }

  let person1 = createObj(person);
  let person2 = createObj(person);

  person1.colors.push('yellow');

  person1.name = 'John';

  person2.name = 'Jake';

  console.log(person1.name) // John
  console.log(person1.colors) // [ 'blue', 'white', 'yellow' ] 
  console.log(person2.name) // Jake
  console.log(person2.colors) // [ 'blue', 'white', 'yellow' ] 
}
example1()

// 原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。但要记住，
// 属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。