### 加载 Blob 文件
```js
const imageElement = document.querySelector('img');
fetch('my-image.png')
 .then((response) => response.blob())
 .then((blob) => {
 imageElement.src = URL.createObjectURL(blob);
 });
```

// TODO:解释上述说明
...

### 中断请求
```js
let abortController = new AbortController();
fetch('wikipedia.zip', { signal: abortController.signal })
 .catch(() => console.log('aborted!');
// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10);
// 已经中断 
```
// TODO:解释上述说明
...

## Headers对象
what?
how?


### navigator.sendBeacon()
https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon
通常在页面关闭时想服务器发送数据，进行分析用户行为。在页面关闭完成也会发送。