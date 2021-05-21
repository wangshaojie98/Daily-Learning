// 全局上下文
console.log(this)

console.log(this instanceof Object)

console.log(Math === this.Math)

var a = 1;
let b = 2;
console.log(this.a)
console.log(this.b)

var c = 3;
console.log(window.c)

// 当在全局作用域中使用 var 声明的时候，会创建一个新的全局变量作为全局对象的属性。
// 然而 let 和 const 不会：

// 2.第二题
console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
// 会打印函数，而不是 undefined 。
// 这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。