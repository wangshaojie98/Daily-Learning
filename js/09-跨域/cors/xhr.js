let xhr = new XMLHttpRequest()
// document.cookie = 'name=wsj'

xhr.withCredentials = true;
xhr.open('PUT', 'http://localhost:4000/getData', true) // 第三个参数为async,true是异步
xhr.setRequestHeader('name', 'aaa')
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
//      0：未初始化（Uninitialized）。尚未调用 open()方法。
//  1：已打开（Open）。已调用 open()方法，尚未调用 send()方法。
//  2：已发送（Sent）。已调用 send()方法，尚未收到响应。
//  3：接收中（Receiving）。已经收到部分响应。
//  4：完成（Complete）。已经收到所有响应，可以使用了。
    if  ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response)

      console.log(xhr.getResponseHeader('name'))
    }
  }
}

xhr.send()