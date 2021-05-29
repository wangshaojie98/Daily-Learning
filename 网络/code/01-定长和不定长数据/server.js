const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Content-Length', 10);
    res.setHeader('cache-control', 'max-age=31536000');
    
    // res.setHeader('Content-Length', 5);
    // res.setHeader('Content-Length', 15);
    // res.write("helloworld"); // 可以多次发送
    res.end("helloworld"); // 代表响应已经发送完成，必须包含
  }
})

server.listen(8081, () => {
  console.log("成功启动");
})
