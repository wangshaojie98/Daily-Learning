// Date构造函数与Date.parse解析
console.log(1)
let now = new Date();
console.log(now);
const hour = now.getHours();
console.log(hour);
const minutes = now.getMinutes();
console.log(minutes);
const year = now.getFullYear();
console.log(year);
const month = now.getMonth() + 1;
console.log(month);
const day = now.getDate();
console.log(day);

const time = `${month}/${day}/${year}`
console.log(time);

// 基于其它日期创建
console.log(Date.parse(time));
console.log(Date.parse(`2/23/2021`));
console.log(Date.parse(`2 23, 2021`));
console.log(Date.UTC(2021, 1, 23));
console.log(Date.UTC(2021, 1, 23, 14, 39));

// new Date内部解析流程是基于Date.parse/Date.UTC
console.log(new Date(2021, 1, 23).getTime());
console.log(new Date(`2/23/2021`).getTime());

// 当前执行的毫秒数
console.log(Date.now());

// 本地时区、带时区
console.log(new Date().toLocaleString());
console.log(new Date().toString());

// 格式化方法
const Now = new Date();
console.log(Now.toDateString());
console.log(Now.toLocaleDateString());

console.log(Now.toTimeString());
console.log(Now.toLocaleTimeString());

console.log(Now.toUTCString());
