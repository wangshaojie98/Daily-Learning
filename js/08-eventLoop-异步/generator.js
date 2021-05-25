function example1() {
  function *createInterator() {
    yield 1;

    yield 2;
    yield 3;
  }

  let iterator = createInterator();
  console.log(iterator);
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}

// example1()


function example2() {
  function *createInterator(items) {
    for (let i = 0; i < items.length; i++) {
      yield items[i]
      console.log('i:', i)
    }
  }

  let iterator = createInterator([1, 2, 3, 4]);
  console.log(iterator);
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
}

// example2()


// 【yield的使用限制】
// yield关键字确实在createIterator()函数内部，但是它与return关键字一样，二者都不能穿透函数边界
function example3() {
  function *createInterator(items) {
    items.forEach((item) => {
      // yield item // SyntaxError Error
    })
  }

  let iterator = createInterator()

  console.log(iterator.next())
}
// example3()

// 【创建可迭代对象】
function example4() {
  let o = {
    items: [],
    *[Symbol.iterator]() {
      for (let i = 0; i < this.items.length; i++) {
        yield this.items[i]
      }
    }
  }

  o.items.push(1)
  o.items.push(2)
  o.items.push(3)
  o.items.push(4)

  let arr = [...o]
  console.log(arr)
}
// example4()

function example5() {
  let o = {
    items: [],
    [Symbol.iterator]() {
      let i = 0;
      return {
        next: () => {
          let done = i >= this.items.length;
          let value = !done ? this.items[i++] : undefined;

          return {
            done,
            value
          }
        }
      }
    }
  }

  o.items.push(1)
  o.items.push(2)
  o.items.push(3)
  o.items.push(4)

  let arr = [...o]
  console.log(arr)
}
// example5()

// 参数
function example6() {
  function *createInterator() {
   let first = yield 100;
   console.log(first) // 4
   let second = yield first + 2;
   console.log(second) // 5
   yield first + second
  }
  let iterator = createInterator()
  console.log(iterator.next())
  console.log(iterator.next(4))
  console.log(iterator.next(5))
  console.log(iterator.next())

}
// example6()


// 【委托生成器】
function example7() {
  function *createNumberIterator() {
    yield 100
    yield 200
    return 3 // 能当做函数的返回值
  }

  function *createRepeatingIterator(count) {
    for (var i = 0; i < count; i++) {
      yield "repeat"
    }
  }

  function *createCombinedIterator() {
    let count = yield* createNumberIterator()
    yield 333
    yield* createRepeatingIterator(count)
  }
  let iterator = createCombinedIterator()
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
  console.log(iterator.next())
}
// example7()


