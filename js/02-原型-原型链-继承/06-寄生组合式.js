// 组合继承最大的缺点是会调用两次父构造函数。
function Parent(name) {
  this.name = name;
  this.love = ['car', 'girl']
}

Parent.prototype.getLove = function () {
  return this.love;
}

function Child(name) {
  Child.call(this, name)
  this.age = '22'
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child

Child.prototype.getAge = function () {
  return this.age
}