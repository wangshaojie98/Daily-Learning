let http = require('http'),
fs = require('fs'),
path = require('path'),
url = require("url")
http.createServer((req,res)=>{
  let pathname = __dirname + url.parse(req.url).pathname; // 获取文件路径
  let statusCode = 200 // 响应头状态码
  let extname = path.extname(pathname) // 获取文件扩展名
  let headType = 'text/html' // 内容类型
  if( extname){
    switch(extname){
      case '.html':
       headType = 'text/html'
      break;
      case '.js':
        headType = 'text/javascript'
      break;
    }
  }
  fs.readFile(pathname, function (err, data) {
    res.writeHead(statusCode, {
      'Content-Type': headType,
      'Expires':new Date(Date.now() + 10000).toUTCString() // 设置文件过期时间为10秒后
    });
    res.end(data);
  });
}).listen(3000)

console.log("Server running at http://127.0.0.1:3000/");
