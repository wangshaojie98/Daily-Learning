function curry(fn, ...args) {
  let length = fn.length;
  return function (...fnArgs) {
    let _arg = [...args, ...fnArgs];
    if (_arg.length < length) {
      return curry.call(this, fn, ..._arg);
    } else {
      fn.apply(this, _arg);
    }
  }
}

var fn = curry(function(a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]