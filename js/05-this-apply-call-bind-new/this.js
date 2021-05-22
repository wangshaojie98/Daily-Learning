var name = 'join'
var student = {
  name: 'wsj',
  doSth: function(){
      console.log('arrowFn', this.name); // arrowFn wsj
      const arrowDoSth = () => {
        console.log('arrowFn:', this.name); // arrowFn: wsj
      }
      arrowDoSth()
  },
  doSth1: function(){
    console.log('arrowFn1', this.name); // arrowFn1 wsj
    return () => {
        console.log('arrowFn2', this.name); // arrowFn2 wsj
    }
  },
  doSth2: () => {
    console.log('arrowFn2:', this.name); // arrowFn2: join
  }
}

let person = {
  name: 'gy'
}

student.doSth()
student.doSth1().call(person)

student.doSth2()

function sayAge() {
  (() => {
    (() => {
      console.log(this.age) // 12
    })()
  })()
}
let p = {
  age: 12
}

sayAge.call(p)