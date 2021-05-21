class Parent {
	constructor(name){
    this.name = name
    }
  
  getName(){
  	return this.name
  }
}


class Child extends Parent {
	constructor(name, age){
    super(name);
      this.age = age
    }
  
  getAge() {
  	return this.age
  }
}

let c = new Child('wsj', '22')

// TODO 核心
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // 实现原型
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  // Object.setPrototypeOf是把一个对象的__proto__指向第二个参数
  // 每一个function其实也是一个new Function（）对象
  // 继承superClass的静态方法
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}
var Child = /*#__PURE__*/function (_Parent) {
  _inherits(Child, _Parent);

  var _super = _createSuper(Child);

  function Child(name, age) {
    var _this;

    _classCallCheck(this, Child);

    _this = _super.call(this, name);
    _this.age = age;
    return _this;
  }

  _createClass(Child, [{
    key: "getAge",
    value: function getAge() {
      return this.age;
    }
  }]);

  return Child;
}(Parent);

var c = new Child('wsj', '22');