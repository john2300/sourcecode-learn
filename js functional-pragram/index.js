// let Container = function (x){
//     this.__value = x
// }
// Container.of = x => new Container(x)

// Container.prototype.map = function(f){
//     return Container.of(f(this.__value))
// }

// console.log(Container)

// Container.of(3)
//     .map(x=> x+1)

// console.log(Container)

// let Maybe = function(x){
//     this.__value = x
// }

// Maybe.of = x => new Maybe(x)

// Maybe.prototype.map = function(f){
//     return this.isNothing?Maybe.of(null) : Maybe.of(f(this.__value))
// }
// Maybe.prototype.isNothing = function(){
//     return (this.__value === null || this.__value === undefined)
// }
let Functor = function(x){
    this.__value = x;
}

Functor.of = function(value){
    return new Functor(value);
}

Functor.prototype.map = function(f){
    return Functor.of(f(this.__value));
}

function addTwo(x){
    return x+2;
}

function Ap(val){
    Functor.call(this,val);
}

Ap.of = function(val){
    return new Ap(val);
}

// Ap.prototype = new Functor();
Ap.prototype.ap = function(f){
    // console.log(f.__value)
    console.log(this.__value)
    console.log(this.__value(f.__value));
    return Ap.of(this.__value(f.__value));
}

const A = Functor.of(2);
const B = Ap.of(addTwo);
// console.log(A);
// console.log(B);
console.log(B.ap(A));