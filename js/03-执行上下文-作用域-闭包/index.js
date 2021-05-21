function foo() {
  let f1 = 'aaa'
  console.log(f1)
}

function init() {
  debugger
  let i1 = 'bbb'
  foo()
  console.log(i1)
}
init()