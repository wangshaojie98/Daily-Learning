### try catch
如果 try 块中有代码发生错误，代码会立即退出执行，并跳到 catch 块中。

错误对象中暴露的实际信息因浏览器而异，但至少包含保存错误消息的 message属性。
```
try {
 window.someNonexistentFunction();
} catch (error){
 console.log(error.message);
} 
```
try 或catch 块无法阻止 finally 块执行，包括 return 语句。(只要代码中包含了 finally 子句，try 块或 catch 块中的 return 语句就会被忽略)

### 错误类型
1. Error
2. InternalError// 没有该类型对象
3. EvalError
4. RangeError
5. ReferenceError
6. SyntaxError
7. TypeError
8. URIError

function handleError(error) {
  if (error instanceof EvalError) {
    console.log(`EvalError错误：eval函数错误！`)
  } else if (error instanceof RangeError ) {
    console.log(`RangeError错误：数值越界或者数值类型其它错误！`)
  } else if (error instanceof ReferenceError ) {
    console.log(`ReferenceError错误：引用错误，或许引用了一个不存在的对象或者变量`)
  } else if (error instanceof SyntaxError ) {
    console.log(`SyntaxError错误：语法错误，语句使用错误，`)
  } else if (error instanceof TypeError ) {
    console.log(`TypeError错误：变量不是预期类型，在给函数传参数之前没有验证其类型的情况下，比如不是函数的变量当成函数调用？`)
  } else if (error instanceof URIError ) {
    console.log(`URIError错误：使用 encodeURI()或 decodeURI()但传入了格式错误的URI 时发生？`)
  }
}

try {
  window.someNonexistentFunction();
} catch(error) {
  handleError(error)
}

如果你明确知道自己的代码会发生某种错误，那么就不适合使用 try/catch 语句。例如，如果给
函数传入字符串而不是数值时就会失败，就应该检查该函数的参数类型并采取相应的操作。这种情况下，
没有必要使用 try/catch 语句。

## 抛出错误
what?how?why?
用于在任何时候抛出自定义错误。throw 操作符必须有一个值，但值的类型不限。
使用 throw 操作符时，代码立即停止执行，除非 try/catch 语句捕获了抛出的值。
class CustomError extends Error {
 constructor(message) {
  super(message);
  this.name = "CustomError";
  this.message = message;
 }
} 

什么时候使用抛出错误和使用捕获错误？P681

### error事件
错误处理最后一道防线window.onerror?

### 错误处理策略

### 识别错误

- 类型转换错误
- 数据类型错误
- 通信错误

1.静态代码分析器：是 JSHint、JSLint、Google Closure 和 TypeScript。

2.类型转换错误
function concat(str1, str2, str3) {
  let result = str1 + str2;
  if (str3) { // 不要！
    result += str3;
  }
  return result;
}

function concat(str1, str2, str3){
  let result = str1 + str2;
  if (typeof str3 === "string") { // 恰当的比较
    result += str3;
  }
  return result;
}

3. 数据类型错误
因为 JavaScript 是松散类型的，所以变量和函数参数都不能保证会使用正确的数据类型。开发者需要自己检查数据类型，确保不会发生错误。数据类型错误常发生在将意外值传给函数的时候
// 不安全的函数，任何非字符串值都会导致错误
function getQueryString(url) {
  const pos = url.indexOf("?");
  if (pos > -1){
    return url.substring(pos +1);
  }
  return "";
}
function getQueryString(url) {
  if (typeof url === "string") { // 通过类型检查保证安全
    let pos = url.indexOf("?");
    if (pos > -1) {
      return url.substring(pos +1);
    }
  }
  return "";
}

4. 通信错误
特指Ajax
encodeURIComponent编码有什么用？
我们能看到的是
http://www.yourdomain.com/?redir=http://www.someotherdomain.com?a=b&c=d 
默认浏览器会在发送给后端请求是
http://www.example.com/?redir=http%3A%2F%2Fwww.someotherdomain.com%3Fa%3Db%26c%3Dd 
可以在任意浏览器地址栏，粘贴下来看看
https://www.zhihu.com/search?q=%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F&utm_content=search_suggestion&type=content

### 区分重大与非重大错误
于非重大错误
- 不会影响用户的主要任务；
 只会影响页面中某个部分；
 可以恢复；
 重复操作可能成功
另一方面，重大错误具备如下特性：
 应用程序绝对无法继续运行；
 错误严重影响了用户的主要目标；
 会导致其他错误发生。

### 把错误记录到服务器中
function logError(sev, msg) {
  let img = new Image(),
  encodedSev = encodeURIComponent(sev),
  encodedMsg = encodeURIComponent(msg);
  img.src = 'log.php?sev=${encodedSev}&msg=${encodedMsg}';
}
logError()函数接收两个参数：严重程度和错误消息。严重程度可以是数值或字符串，具体取决
于使用的日志系统。这里使用 Image 对象发送请求主要是从灵活性方面考虑的。
只要是使用 try/catch 语句的地方，都可以把相关错误记录下来。下面是一个例子：
for (let mod of mods){
  try {
    mod.init();
  } catch (ex){
    logError("nonfatal", 'Module init failed: ${ex.message}');
  }
}

## 调试技术
单击 DOM 树中一个节点，就可以在 Console（控制台）标签页中使用$0 引用该节点的 JavaScript实例。
console.log({$0})