// //es6
// class Parent{
//   constructor(name){
//     this.name = name;//实例的私有属性
//   }
// // 静态属性是类的属性
//     static hello(){
//       console.log('hello')
//     }
//   //属于实例的公有属性，也就是相当于原型上的属性
//   getName(){
//     console.log(this.name);
//   }
// }

// let p = new Parent('zfpx');
// p.getName();

//es5

// var _createClass = function(){
//   //target目标,props是属性对象数组
//   function defineProperties(target,props){
//     for(var i = 0; i < props.length; i++){
//       //取出每个属性描述器
//       var descriptor = props[i];
//       //可枚举
//       descriptor.enumerable = descriptor.enumerable || false;
//       //可配置 可以通过delete删除此属性
//       descriptor.configurable = true;
//       //可修改值
//       if("value" in descriptor) descriptor.writable = true;
//       //真正向Parent类的原型对象上增加属性
//       Object.defineProperty(target,descriptor.key,descriptor);
//     }
//   }
//   //第一个参数是构造函数，第二个是原型上的属性(通过原型实例来调用)，第三个是静态属性(类上的属性,通过类名来调用)
//   return function(Constructor,protoProps,staticProps){
//     //如果有原型属性的话,
//     if(protoProps) defineProperties(Constructor.prototype,protoProps);
//     if(staticProps) defineProperties(Constructor,staticProps);
//     return Constructor;
//   }
// }()
// //类调用检查， 第一个参数是累的实例，第二个是参数构造函数
// function _classCallCheck(instance,Constructor){
//   //如果这个实例不是这个构造函数的实例的话，就报错，不能把一个类当成普通函数来调用（想要用这个构造函数必须new调用，例如Parent('zfpx')）
//   if(!(instance instanceof Constructor)){
//     throw new TypeError("Cannot call a class as a function");
//   }
// }

// var Parent = function(){
//   //先定义函数，对应es6的constructor
//   function Parent(name){

//     _classCallCheck(this,Parent);
//     this.name = name;
//   }
//   //属于实例的公有属性，也就是相当于原型上的属性
//   _createClass(Parent,[{
//     key:"getName",
//     value:function getName(){
//       console.log(this.name);
//     }
//   }]);
// }

//es6继承
class Parent {
  constructor(name) {
    this.name = name; //实例的私有属性
  }
  // 静态属性是类的属性
  static hello() {
    console.log("hello");
  }
  //属于实例的公有属性，也就是相当于原型上的属性
  getName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    //super指的是父类的构造函数
    super(name);
    this.age = age;
  }
  getAge() {
    console.log(this.age);
  }
}

//以上代码es5版
("use strict");

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = (function() {
  function Parent(name) {
    _classCallCheck(this, Parent);

    this.name = name; //实例的私有属性
  }
  // 静态属性是类的属性

  _createClass(
    Parent,
    [
      {
        key: "getName",

        //属于实例的公有属性，也就是相当于原型上的属性
        value: function getName() {
          console.log(this.name);
        }
      }
    ],
    [
      {
        key: "hello",
        value: function hello() {
          console.log("hello");
        }
      }
    ]
  );

  return Parent;
})();

var Child = (function(_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    _classCallCheck(this, Child);

    var _this = _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name)
    );
    //super指的是父类的构造函数

    _this.age = age;
    return _this;
  }

  _createClass(Child, [
    {
      key: "getAge",
      value: function getAge() {
        console.log(this.age);
      }
    }
  ]);

  return Child;
})(Parent);
