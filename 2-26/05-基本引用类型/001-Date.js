// 获取当前时间戳
let timestamp = Date.parse(new Date());
console.log(timestamp);
timestamp = (new Date()).valueOf();
console.log(timestamp);
timestamp = new Date().getTime();
console.log(timestamp);

// 获取指定时间戳
let timestamp1 = new Date("2021/2/24 11:04:32").getTime()
console.log(timestamp1);

// 获取当前时间的前一天/后一天的时间戳
let timestamp2 = new Date().getTime() -  24 * 60 * 60 * 1000;
console.log(timestamp2);
let timestamp3 = new Date().getTime() +  24 * 60 * 60 * 1000;
console.log(timestamp3);

console.log(new Date(timestamp3));

