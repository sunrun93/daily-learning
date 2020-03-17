// (async function async_demo() {
//   return 'this is a async function'
// })().then(res => console.log(res));

(async function await_demo() {
  let s = await 'this is await demo';
  console.log(s);
})();
console.log('function after await_demo');


const hello = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello')
    }, 1000)
  })
}

const name = function (hello) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(hello + ' Reina')
    }, 1000)
  })
}

const stop = function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(name + ' !')
      throw(new Error('Something wrong'))
    }, 1000)
  })
}

const sayHello = function () {
  hello()
  .then(res=>{return name(res)})
  .then(res=>{return stop(res)})
  .then(res=>{console.log(res)})
}

// sayHello(); // Hello Reina

const sayHello_1 = async function () {
  try {
    const first = await hello();
    const second = await name(first);
    const res = await stop(second);
    console.log(res);
    
  } catch (error) {
    console.log('Error: ' + error);
  }
}

sayHello_1();