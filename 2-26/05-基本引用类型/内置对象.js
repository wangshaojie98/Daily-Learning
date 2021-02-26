// URL编码方法
const url = 'http://www.huice.com/aaa?name =3&age=5'

console.log(encodeURI(url));
console.log(encodeURIComponent(url));

const encodeURL = encodeURIComponent(url);
console.log(encodeURL);
const decodeURL = decodeURIComponent((encodeURL));
console.log(decodeURL);

// eval
eval("function say(){console.log(111)}")
say();

eval("let msg = 'hello world';");
// console.log(msg);


// Math
console.log(Math.ceil(2.1));
console.log(Math.ceil(2.6));
console.log(Math.floor(2.1));
console.log(Math.floor(2.6));
console.log(Math.round(2.1));
console.log(Math.round(2.6));
console.log(Math.fround(2.1));
console.log(Math.fround(2.6));

// 0~~1
console.log(Math.random());
// 1~~10
console.log(Math.floor(Math.random() * 10 + 1));
// 2~10 //[0, 1) * 9 = [0, 9)
console.log(Math.floor(Math.random() * 9 + 2));

// 通过函数控制计算可选最大值和最小值(2, 10)
function selectMath(min, max) { // 观察输入输出和相似性
  let temp = max - min + 1;
  return Math.floor(Math.random() * temp + min);
}

let colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
let color = colors[selectMath(0, colors.length-1)];
console.log(color);

console.log(Crypto);