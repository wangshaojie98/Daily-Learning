// 类数组对象 拥有一个 length 属性和若干索引属性的对象
let array = ['a', 'b', 'c']
let arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}

// 读写
console.log(array[0])
console.log(arrayLike[0])

array[0] = 'a1'
arrayLike[0] = 'a1'
console.log(array[0])
console.log(arrayLike[0])

// 长度
console.log(array.length)
console.log(arrayLike.length)

// 遍历
for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i])
}
// arrayLike.push('4'); 报错  arrayLike.push is not a function


// 调用数组方法
{
  let arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
  }

  console.log(Array.prototype.join.call(arrayLike, ',')) // a,b,c

  // slice可以将类数组转为数组
  console.log(Array.prototype.slice.call(arrayLike)) // [ 'a', 'b', 'c' ] 

  let res = Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
  });
  console.log(res) // [ 'A', 'B', 'C' ]
}

// 类数组转数组
{
  let arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
  }

  let res1 = Array.from(arrayLike);
  console.log(res1);

  let res2 = Array.prototype.slice.call(arrayLike);
  console.log(res2)

  // 利用apply的参数为数组
  let res3 = Array.prototype.concat.apply([], arrayLike);
  console.log(res3)

  let res4 = Array.prototype.splice.call(arrayLike, 0)
  console.log(res4)


  let res5 = [...arrayLike]
  console.log(res5)
  // 那么为什么会讲到类数组对象呢？以及类数组有什么应用吗？

  // 要说到类数组对象，Arguments 对象就是一个类数组对象。在客户端 JavaScript 中，
  // 一些 DOM 方法(document.getElementsByTagName()等)也返回类数组对象。
}

// Arguments对象
{
  function foo(a, b, c) {
    console.log(arguments)
    console.log(JSON.stringify(arguments))

    console.log('实参', arguments.length) // 1
  }

  foo(1)

  // length属性
  console.log(foo.length) // 形参3
}

{
  // Arguments 对象的 callee 属性，通过它可以调用函数自身
  var data = [];

  for (var i = 0; i < 3; i++) {
      (data[i] = function () {
        console.log(arguments.callee.i) 
      }).i = i;
  }

  data[0]();
  data[1]();
  data[2]();

}