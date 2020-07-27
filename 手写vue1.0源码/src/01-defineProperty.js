// 数组响应式
const orginyProto = Array.prototype;
const arrayProto = Object.create(orginyProto);

const methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'];

methods.forEach(method => {
  arrayProto[method] = function () {
    orginyProto[method].apply(this, arguments)
    Array.from(arguments).forEach(arg => observe(arg));
    console.log('数组执行' + method + '操作');
  }

})
// 数据响应式：
// Object.defineProperty()


function defineReactive(obj, key, val) {

  // val可能还是对象，此时我们需要递归
  observe(val)

  // 参数3是描述对象
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log('set', key);
        // 防止newVal是对象，提前做一次observe
        observe(newVal)
        val = newVal
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }

  if (Array.isArray(obj)) {
    obj.__proto__ = arrayProto
    for(let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }
  }
  else {
    // 遍历
    Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
  }

}

// 对于新加入属性，需要单独处理他的响应式
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

// const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 } }
// observe(obj)
// defineReactive(obj, 'foo', 'foo')
// obj.foo
// obj.foo = 'fooooooooo'
// obj.bar
// obj.bar = 'barrrrrrrr'

// obj.baz.a = '10'

// obj.baz = {a: 10}
// obj.baz.a = 100

// 新添加一些属性
// obj.dong = 'dong' // no ok
// set(obj, 'dong', 'dong')
// obj.dong

// 前面的方法对于数组是不支持

const arr = [{name: 'gg'}];
observe(arr);
arr[0].name = 'jj';
arr.push({age: 18});
arr[1].age = 20;
// arr.push(1);
// 思路：拦截数组7个变更方法push、pop。。。，扩展他们，使他们在变更数据的同时
// 额外的执行一个通知更新的任务