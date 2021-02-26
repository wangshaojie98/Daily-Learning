let fooSymbol = Symbol('foo')
const otherFooSymbol = Symbol('foo')

console.log(fooSymbol);
console.log(otherFooSymbol);

console.log(fooSymbol === otherFooSymbol);