1. 什么是async

   saync是generate的语法糖，表明函数中有异步操作，且函数永远返回promise，可以使用then方法调用；函数中的返回值，会成为then方法的参数。

   ```javascript
   (async function async_demo() {
     return 'this is an async function'
   })().then(res => console.log(res))
   // this is an async function
   ```

   以上示例中定义了一个async的自执行函数，函数体中返回了静态信息，其会作为参数传递到then方法中。

2. 什么是await

   await配合async一起使用，且await只能在async的方法中使用，await后面是一个promise对象，如果不是，则会将其转化成一个立即resolve的promise对象。在函数执行的时，一旦遇到`await`就会先返回，待异步操作完成，再接着执行函数体内后面的语句。

   ```javascript
   (async function await_demo() {
     let s = await 'this is await demo';
     console.log(s);
   })();
   console.log('function after await_demo');
   // function after await_demo
   // this is await demo
   ```

   上例中首先定义了一个自执行函数，执行过程中遇到await则返回，先打印function after await_demo内容后，在执行await之后的语句。

3. 具体应用

   + async/await结合，进一步优化异步调用

     以下示例中，通过函数表达式的方式，返回三个promise对象。

     ```javascript
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
         }, 1000)
       })
     }
     ```

     通过promise/then的方式可以如下调用：

     ```javascript
     const sayHello = function () {
       hello()
       .then(res=>{return name(res)})
       .then(res=>{return stop(res)})
       .then(res=>{console.log(res)})
     }
     
     sayHello(); // Hello Reina !
     ```

     使用async/await的方式调用如下：

     ```javascript
     const sayHello_1 = async function () {
       const first = await hello();
       const second = await name(first);
       const res = await stop(second);
       console.log(res);
     }
     
     sayHello_1(); // Hello Reina !
     ```

   + async/await 错误处理

     Await命令后面的promise对象，运行结果可能是rejected，建议把await命令放在try...catch代码块中。

     ```javascript
     async function () {
       try {
         const first = await hello();
         const second = await name(first);
         const res = await stop(second);
         console.log(res);
         
       } catch (error) {
         console.log('Error: ' + error);
       }
     }
     ```

     