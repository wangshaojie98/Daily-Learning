let num = 10;

// 返回指定基数的字符串格式
console.log(num.toString());
console.log(num.toString(2));
console.log(num.toString(8));
console.log(num.toString(10));
console.log(num.toString(16));
console.log(num.toString(2));

// 格式化数值
// 为小数点的字符串
console.log(num.toFixed(2));
let num1 = 10.005;
console.log(num1.toFixed(2));
console.log(0.1 + 0.2);

// 科学计数法
console.log(num1.toExponential(1));
let num2 = 99;
console.log(num2.toPrecision(1));
console.log(num2.toPrecision(2));
console.log(num2.toPrecision(3));

//