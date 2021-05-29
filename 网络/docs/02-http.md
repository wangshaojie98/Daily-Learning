## 001.DNS是如何解析得到IP的？

比如访问“www.baidu.com”，就要进行下面三次查询

1. 先访问根域名服务器查询“com”顶级域名服务器在哪
2. 然后访问“com”顶级域名服务器，“baidu.com”域名服务器在哪
3. 最后再访问“baidu.com”域名服务器，拿到“www.baidu.com”的IP

为了缓解DNS服务器压力，通常使用缓存，两种思路：

1. 许多公司就近建立自己的DNS服务器，作为DNS代理的查询，代替用户访问核心DNS服务器，可以缓存之前的结果，有了这些结果直接返回IP地址给用户。比如Google的"8.8.8.8"，Microsoft的“4.2.2.1”等。
2. 操作系统也会做DNS解析结果的缓存，比如之前访问过“www.apple.com”，那下一次直接从操作系统拿IP了
3. 如果操作系统缓存的没有DNS记录还有可以找到一个主机映射文件，在 Windows 里是“C:\WINDOWS\system32\drivers\etc\hosts”，如果操作系统在缓存里找不到 DNS 记录，就会找这个文件。

## 002.HTTP 报文结构是怎么样的？

![请求报文](./images/2-2.png)

HTTP是`header + body`的结构，具体而言：

```
起始行 + 头部 + 空行 + 实体
```

因为请求报文和响应报文是由一定区别的，我们分开介绍。

### 起始行

对于请求报文，起始行一般长这样

```tex
POST /serv/v1/xxxx HTTP/1.1
```

也就是**方法 + 路径 + http版本**。

而响应报文是这样

```text
HTTP/1.1 200 OK
```

响应报文起始行也叫状态行，表示服务器响应的状态，由**http版本 + 状态码 + 原因**三部分组成。

值得注意的是，在起始行中，每两个部分之间用**空格**隔开，最后一个部分后面应该接一个**换行**，严格遵循`ABNF`语法规范。

### 头部

![](./images/2-3.png)

### 空行

同样很重要，用来区分`头部`和`实体`。

**问题：如果拼 HTTP 报文的时候，在头字段后多加了一个 CRLF，导致出现了一个空行，会发生什么？**

空行后面的部分会当做实体。

### 实体

就是具体的数据，也就是`body`部分。

## 003. 如何理解HTTP请求方法？

### 有哪些请求方法？

`http/1.1`规定了以下8种方法，（注意，都是大写的形式）：

1. GET：通常用来获取资源。
2. HEAD：获取资源的元信息，（只传回响应头，`HEAD` 方法的响应不应包含响应正文）。
3. POST：通常提交数据，即上传数据。
4. PUT：修改数据。
5. DELETE：删除资源（几乎用不到）。
6. CONNECT：建立特殊的连接隧道。
7. OPTIONS：列出可对资源实行的方法，（跨域的预检请求，检测服务器支持哪些 HTTP 方法）。
8. RACE：追踪请求 - 响应的传输路径。

### GET和POST有哪些区别？

最直观的语义区别，一个查询另一个新增资源。

还有一些具体的差别：

- 从**缓存**的角度，GET请求会被浏览器主动缓存下来，而POST默认不会缓存。
- 从**编码**的角度，GET请求只能进行URL编码也就是ASCII字符，而POST没有限制。（具体看下方分析）
- 从**安全**角度，GET请求拼接在URL中，因此不安全，POST放在请求当中，适合传输敏感信息。
- 从**幂等性**角度，`GET`是幂等的，而`POST`不是。（**幂等**表示执行相同的操作，结果也是相同的，GET请求一般查询结果只要参数相同，结果也相同，而POST一般意味着新增，参数相同也可能会新增数据）。
- 从**TCP**的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(**火狐**浏览器除外，它的 POST 请求只发一个 TCP 包)

### GET请求为什么要进行URL编码？

1. 会引起歧义，比如`name=P&G&age=25`。其中P&G表示的是一个name，并不是以`&`分割的键值对，因此为了避免这种歧义，就要进行编码，例如编码的符号有`&、=`。
2. 非法字符：URL 的编码格式采用的是 ASCII 码，而不是 Unicode，这也就是说你不能在 URL 中包含任何非 ASCII 字符，例如中文。否则如果客户端浏览器和服务端浏览器支持的字符集不同的情况下，中文可能会造成问题。

name如何编码：`escape、encodeURI、encodeURIComponent`，如果使用`axios`，默认已经进行GET请求进行编码。

### 为什么POST请求编码没有限制？

因为`Content-Type`字段表示数据类型，post请求可以提交**json类型，表单类型，文件类型**等。具体看：[请求-xhr-fetch-axios](https://github.com/wangshaojie98/Daily-Learning/blob/main/js/docs/10-%E8%AF%B7%E6%B1%82-xhr-fetch-axios.md)

### 如果让你用请求完成增删改查，你会使用那些方法？

- 增：POST
- 删：DELETE
- 改：PUT
- 查：GET

## 004. 如何理解HTTP状态码？

- **1xx**: 表示目前是协议处理的中间状态，还需要后续操作。
- **2xx**: 表示成功状态。
- **3xx**: 重定向状态，资源位置发生变动，需要重新请求。
- **4xx**: 请求报文有误。
- **5xx**: 服务器端发生错误。

### 1xx

**101 Switching Protocols**。在`HTTP`升级为`WebSocket`的时候，如果服务器同意变更，就会发送状态码 101。

### 2xx

**200 OK**成功状态码。通常在响应体放有数据。

**204 No Content**含义与 200 相同，但响应头后没有 body 数据。

**206 Partial Content**顾名思义，表示部分内容，场景是HTTP分块下载和断点续传，当然也会带上响应头字段`Content-Range`

### 3xx

**301 Moved Permanently**即永久重定向

**302 Found **临时重定向

比如你的网站从www.a.com换到www.high.com，或者从http升级到https，就应该返回301表示永久重定向，这样浏览器会做缓存，下次访问a.com的时候自动访问重定向那个地址。（重定向要带有location字段）

如果只是服务器升级，暂时访问一个代理域名上，返回302即可，浏览器不会做缓存。（重定向要带有location字段）

![重定向要带有location字段](./images/2-4.png)

**304 NotModified**：当缓存命中会返回这个状态码。详见浏览器缓存

### 4xx

**400 Bad Request**: 开发者经常看到一头雾水，只是笼统地提示了一下错误，并不知道哪里出错了。

**403 Forbidden**: 这实际上并不是请求报文出错，而是服务器禁止访问，原因有很多，比如法律禁止、信息敏感。

**404 Not Found**: 资源未找到，表示没在服务器上找到相应的资源。（可能路径书写有误）

**405 Method Not Allowed**: 请求方法不被服务器端允许。

**406 Not Acceptable**: 资源无法满足客户端的条件。

**408 Request Timeout**: 服务器等待了太长时间。

**409 Conflict**: 多个请求发生了冲突。

**413 Request Entity Too Large**: 请求体的数据过大。

**414 Request-URI Too Long**: 请求行里的 URI 太大。

**429 Too Many Request**: 客户端发送的请求过多。

**431 Request Header Fields Too Large**请求头的字段内容太大。

### 5xx

**500 Internal Server Error**: 仅仅告诉你服务器出错了，出了啥错咱也不知道。

**501 Not Implemented**: 表示客户端请求的功能还不支持。

**502 Bad Gateway**: 服务器自身是正常的，但访问的时候出错了，啥错误咱也不知道。

**503 Service Unavailable**: 表示服务器当前很忙，暂时无法响应服务。

## 005. 对http头字段了解多少？

对于`Accept`系列字段的介绍分为四个部分: **数据格式**、**压缩方式**、**支持语言**和**字符集**。

### 数据类型与编码(MIME type)

对于http的特点之一数据类型非常多，那么到达服务端之后，怎么判断它的类型呢？

当然，数据都是有固定格式的，可以根据前几个字节进行猜它是文本，还是GIF图片。不想猜可以吗？

**MIME（Multipurpose Internet Mail Extensions）多用途互联网邮件扩展**，早起在电子邮件系统中使用，让电子邮件可以发送 ASCII 码以外的任意数据，后来HTTP截取一部分代表HTTP Body 部分的数据类型，具体体现在`Content-Type`字段，当然这是针对于发送端而言，接收端想要收到特定类型的数据，可以用`Accep`这个字段。

具体而言，这两个字段可以取下面的值：

1. text：即文本格式的可读数据，我们最熟悉的应该就是 text/html 了，表示超文本文档，此外还有纯文本 text/plain、样式表 text/css 等。
2. image：即图像文件，有 image/gif、image/jpeg、image/png 等。
3. audio/video：音频和视频数据，例如 audio/mpeg、video/mp4 等。
4. application：数据格式不固定，可能是文本也可能是二进制，必须由上层应用程序来解释。常见的有 application/json，application/javascript、application/pdf 等，另外，如果实在是不知道数据是什么类型，像刚才说的“黑盒”，就会是 application/octet-stream，即不透明的二进制数据。

```text
// 发送端
Content-Type: text/html

// 接收端
Accept: text/html,application/xml,image/webp,image/png
```

### 压缩方式(Encoding type )

当然一般这些数据都是会进行编码压缩的，采取什么样的压缩方式就体现在了发送方的`Content-Encoding`字段上， 同样的，接收什么样的压缩方式体现在了接受方的`Accept-Encoding`字段上。这个字段的取值有下面几种：

- gzip: 当今最流行的压缩格式
- deflate: 另外一种著名的压缩格式
- br: 一种专门为 HTTP 发明的压缩算法

```
// 发送方
Content-Encoding: gzip

// 接收方
Accpet-Encoding: gzip,deflate, br
```

### 语言类型

对于发送方而言，还有一个`Content-Language`字段，在需要实现国际化的方案当中，可以用来指定支持的语言，在接受方对应的字段为`Accept-Language`。如:

```
// 接收端
Accept-Language: zh-CN, zh, en

// 发送端
Content-Language: zh-CN
```

### 字符集

比较特殊，接收端有对应的字段，而发送端没有，而是直接放到`Content-Type`中了，以chartset属性指定。

```
// 发送端
Content-Type: text/html; charset=utf-8
// 接收端
Accept-Charset: charset=utf-8
```

最后看一张图吧

![](./images/2-5.png)

## 006. 对于定长和不定长的数据，HTTP怎么传输的？

### 定长数据

对于定长包体，发送端在传输时使用`Content-Length`设置传输的长度。

```js
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', 10);
    res.write("helloworld");
  }
})

server.listen(8081, () => {
  console.log("成功启动");
})
```

启动后访问: **localhost:8081**。

浏览器中显示如下:

```
helloworld
```

这是长度正确的情况，那不正确的情况是如何处理的呢？

我们试着把这个长度设置的小一些:

```js
res.setHeader('Content-Length', 8);
```

重启服务，再次访问，现在浏览器中内容如下:

```
hellowor
```

那后面的`ld`哪里去了呢？实际上在 http 的响应体中直接被截去了。

然后我们试着将这个长度设置得大一些:

```js
res.setHeader('Content-Length', 12);
```

此时浏览器显示如下:

![](./images/2-6.png)

直接无法显示了。可以看到`Content-Length`对于 http 传输过程起到了十分关键的作用，如果设置不当可以直接导致传输失败。

### 不定长数据

上述是针对于`定长包体`，那么对于`不定长包体`而言是如何传输的呢？

这里就必须介绍另外一个 http 头部字段了:

```
Transfer-Encoding: chunked
复制代码
```

表示分块传输数据，设置这个字段后会自动产生两个效果:

- Content-Length 字段会被忽略
- 基于长连接持续推送动态内容

我们依然以一个实际的例子来模拟分块传输，nodejs 程序如下:

```js
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', 10);
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write("<p>来啦</p>");
    setTimeout(() => {
      res.write("第一次传输<br/>");
    }, 1000);
    setTimeout(() => {
      res.write("第二次传输");
      res.end()
    }, 2000);
  }
})

server.listen(8009, () => {
  console.log("成功启动");
})
```

效果：

![](./images/2-7.gif)

用 telnet 抓到的响应如下:

![](./images/2-8.png)

注意，`Connection: keep-alive`及之前的为响应行和响应头，后面的内容为响应体，这两部分用换行符隔开。

响应体的结构比较有意思，如下所示:

```
chunk长度(16进制的数)
第一个chunk的内容
chunk长度(16进制的数)
第二个chunk的内容
......
0

```

最后是留有有一个`空行`的，这一点请大家注意。

以上便是 http 对于**定长数据**和**不定长数据**的传输方式。

## 007. HTTP1.1 如何解决 HTTP 的队头阻塞问题？

### 什么是 HTTP 队头阻塞？

从前面的小节可以知道，HTTP 传输是基于`请求-应答`的模式进行的，报文必须是一发一收，但值得注意的是，里面的任务被放在一个任务队列中串行执行，一旦队首的请求处理太慢，就会阻塞后面请求的处理。这就是著名的`HTTP队头阻塞`问题。

### 并发连接

对于一个域名允许分配多个长连接，那么相当于增加了任务队列，不至于一个队伍的任务阻塞其它所有任务。在RFC2616规定过客户端最多并发 2 个连接，不过事实上在现在的浏览器标准中，这个上限要多很多，Chrome 中是 6 个。

但其实，即使是提高了并发连接，还是不能满足人们对性能的需求。

### 域名分片

一个域名不是可以并发 6 个长连接吗？那我就多分几个域名。

比如 content1.sanyuan.com 、content2.sanyuan.com。

这样一个`sanyuan.com`域名下可以分出非常多的二级域名，而它们都指向同样的一台服务器，能够并发的长连接数更多了，事实上也更好地解决了队头阻塞的问题。

## 008. 如何理解HTTP缓存以及缓存代理？

为什么设置cache-contorl之后，刷新浏览器还看不到缓存标识，比如`from memory`等？

已经解决了，是刷新的问题。手动刷新按F5会强制浏览器走服务器，只要在新窗口重新打开当前页面就能看到`200 (from cache)`了，或者自动跳转也行。

