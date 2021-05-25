function createIterator(items) {
  let i = 0;
  return {
    next() {
      let done = items.length <= i;
      let value = !done ? items[i++] : undefined;

      return {
        value,
        done
      }
    }
  }
}

let iterator = createIterator([1, 2, 3])
console.log(iterator.next()) // { value: 1, done: false } 
console.log(iterator.next()) // { value: 2, done: false } 
console.log(iterator.next()) // { value: 3, done: false } 
console.log(iterator.next()) // { value: undefined, done: true } 
console.log(iterator.next()) // { value: undefined, done: true } 