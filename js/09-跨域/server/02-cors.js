// //server2.js
let express = require('express')
let app = express()
app.use(function(req, res, next) {
  let origin = req.headers.origin
  console.log(origin)
    // 设置哪个源可以访问我
    res.setHeader('Access-Control-Allow-Origin', origin) // 这个localhost和
    // 允许携带cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    // 允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'name')
    // 处理预检请求
    if (req.method === 'OPTIONS') {
      // 允许携带哪个头访问我
      res.setHeader('Access-Control-Allow-Headers', 'name')
      // 允许哪个方法访问我
      res.setHeader('Access-Control-Allow-Methods', "POST, GET,PUT, OPTIONS, DELETE")
      
      // 预检的存活时间
      res.setHeader('Access-Control-Max-Age', 6)

      res.end() // OPTIONS请求不做任何处理
    }
  next()
})
app.get('/cookie', (req, res, next) => {
  // 读取cookieParser解析的Cookie
  // console.log(req.cookies)
  res.cookie('userName', 'lee', {
    // 设置该Cookie只可以由服务端访问，即前端JavaScript无法访问document.cookie获取该值，但控制台还是可以查看和修改
    // httpOnly: true,
    // 只有通过HTTPS请求的Cookie才被使用，否则都认为是错误的Cookie
    // secure: true,
    // 设置保存Cookie的域名，浏览器查找Cookie时，子域名（如translate.google.com）可以访问主域名（google.com）下的Cookie，而主域名（google.com）不可以访问子域名（如translate.google.com）下的Cookie
    // 本地测试可直接设置为localhost
    domain: 'localhost', // TODO只有设置localhost才有用
    // 设置保存Cookie的路径，浏览器查找Cookie时，子路径（如/map）可以访问根路径（'/'）下设置的Cookie，而根路径（'/'）无法访问子路径（如/map）下设置的Cookie
    path: '/',
    // 通过expires设置Cookie过期时间为14天后
    // expires: new Date(new Date().getTime() + 14 * 86400000),
    // 通过maxAge设置Cookie过期时间为14天后
    maxAge: 14 * 86400000,
  })
  res.send(`cookies: ${JSON.stringify(req.cookies)}`)
})
app.get('/getData', function(req, res) {
  // console.log(req.headers)
  res.setHeader('name', 'jw') //返回一个响应头，后台需设置
  res.end('我不爱你')
})
app.post('/postData', function(req, res) {
  // console.log(req.headers)
  res.end('我不爱222你')
})
app.use(express.static(__dirname))
app.listen(4000)

// var  express  =  require("express");
// var  cors  =  require('cors')

// var  app  =  express();
// var  cookieParser  =  require('cookie-parser')
// var  corsOptions  = {
//     origin: 'http://127.0.0.1:5500',
//     credentials: true,
//     maxAge: '1728000'
//     //这一项是为了跨域专门设置的
// }

// app.use(cors(corsOptions))

// app.use(cookieParser())
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials",true); //带cookies
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
// app.get("/cookie", function(req, res) {
//     // console.log(req.cookies,req.cookies.remebreme);
//     res.cookie("rememberme", "2", {
//         expires: new  Date(Date.now() +  900000),
//         domain: 'localhost'
//     });
//     res.send({ a: 1 }); 
// });

// app.get('/getData', function(req, res) {
//   // console.log(req.headers)
//   res.setHeader('name', 'jw') //返回一个响应头，后台需设置
//   res.end('我不爱你')
// })
// app.get('/getData', function(req, res) {
//   // console.log(req.headers)
//   res.end('我不爱你')
// })

// app.listen(4000)
// let express = require('express');
// let app = new express();
// const bodyParser = require('body-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// let cookieParser=require("cookie-parser")
// // cookieParser记得要加()
// app.use(cookieParser())

// //需要安装并且引入中间件cors
// const cors = require('cors');

// var corsOptions = {
//   origin: 'http://localhost:5500',
//   // 允许跨域情况下发送cookie
//   credentials: true,
//   maxAge: '1728000'
// }
// app.use(cors(corsOptions))


// app.get('/cookie', function(req, res){
//   res.cookie('username',"Larmy")
//         res.cookie('login',true)
//     console.log();
//     res.send(req.cookies)
    
// })
// app.get('/getData', function(req, res) {
//   // console.log(req.headers)
//   res.end('我不爱你')
// })
// app.post('/postData', function(req, res) {
//   // console.log(req.headers)
//   res.send({
//     msg: 'set演示'
// })
// })
// // 监听端口
// app.listen(4000,() => {
//     console.log("4000端口已启用")
// })