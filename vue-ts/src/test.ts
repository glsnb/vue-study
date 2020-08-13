// 类型注解
let var1: string;
// var1 = 1 // no ok
var1 = '开课吧'

// 类型推论
let var2 = true; // boolean类型
// var2 = 'true' // no ok

// 类型数组
let arr: string[];
arr = ['tom', 'jerry']

// 任意类型: 不受约束
let varAny: any;
varAny = 'str'
varAny = 1

// any类型也可以用于数组
let anyArr: any[]
anyArr = [1, true, 'free']

// 函数中的类型: 形参和返回值类型约束
function greet(person: string): string {
  return 'hello, ' + person
}
// 无返回类型void
function warn(): void {

}

// 类型别名（2.7）
type ObjType = { foo: string, bar: string }
const obj: ObjType = {
  foo: 'fooo',
  bar: 'barr'
}

// 接口形式
interface Select {
  selected: boolean
}

// 类型别名和接口俩者没有任何差异，通用的库最好是用接口。

// 联合类型：有个变量的类型是多种类型其中之一
let union: string | number;
union = '1'
union = 1

// 交叉类型：由多种类型合成的类型
type First = {first: number}
type Second = {second: number}
type FirstAndSecond = First & Second


// 函数
// 1.必填参数: 参数一旦声明就要传入
// 2.可选参数：加个问号，参数变为可选
// 3.默认值，可选参数和默认值是互斥的
function greeting(person: string, msg: string = ''): string {
  return '...'
}

greeting('tom')

// 函数重载：以参数数量或者类型或返回值类型区分多个同名函数
// 先声明，再实现
function watch(cb1: () => void): void; // 声明
function watch(cb1: () => void, cb2: (v1: any, v2: any) => void): void; // 声明
// 实现
function watch(cb1: () => void, cb2?: (v1: any, v2: any) => void): void {
  if (cb1 && cb2) {
    console.log('执行重载2');
    
  } else {
    console.log('执行重载1');
    
  }
}
// watch()

// 面向接口编程
interface Foo {
  foo:string
}
class Bar implements Foo {
  foo:string = ''
}
class Baz implements Foo {
  foo:string = ''
}
function abc(a: Foo) {
  a.foo
}

// 泛型
// 是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。依次，增加代码通用性

// 如下，不够通用性
// interface Result {
//   ok: 0 | 1;
//   data: Feature[];
// }

interface Result<T> { // <>动态指定类型
  ok: 0 | 1;
  data: T;
}

// 泛型方法
function getResult<T>(data: T): Result<T> {
  return {ok: 1, data};
}

// 装饰器,工厂函数，如果需要配置，再套一层
// function log(target: Function) {
//   target.prototype.log = function(key: string) {
//     console.log(this[key]);
//   }
// }

// 类装饰器
function log(fn: (key: string) => void) {
  return function (target: Function) {
    target.prototype.log = function(key: string) {
      fn(this[key])
    }
  }
}

@log(console.log)
class Foo2 {
  bar = 'bar'
}

const foo2 = new Foo2()
// @ts-ignore
foo2.log('bar')

class Parent {
  private _foo = 'foo'; // 私有属性，不能在类的外部访问
  protected bar = 'bar'; // 保护属性，可以在子类中访问
  // public tua = 'tua'; // 哪都可以访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = 'tua') {}

  // 方法也有修饰符
  private someMethods() {}

  // 存取器：属性方式访问，可添加额外逻辑，控制读写性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }

}