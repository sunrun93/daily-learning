# Promise

1. 什么是promise

   promise是一种异步编程解决方案，可以将它看作异步代码的容器，该容器中保存着在将来某个时间结束的事件。从语法上看，promise是一种可以获取异步操作消息的对象。

   promise的特点：

   + 对象的状态不受外界影响：pending、fulfilled、rejected三种状态不受外界的影响，promise保证其不会被外界改变
   + 对象状态一旦改变，就不会再变，结果固定。即pending > fulfilled或pending>rejected两种状态变化

2. promise的优点

   + 通过promise可以将异步操作以同步的流程表现出来，避免层层回调（回调地狱）
   + promise为对象提供统一的借口，方便维护

3. promise的缺点

   + promise新建即执行，无法中途取消
   + 如果不设置错误情况的回调，内部的错误会被promise吃掉，而不暴露到外部

4. 基本用法

   ```javascript
   promise.then(function(value) {
     // success
   }, function(error) {
     // failure
   });
   ```

   promise对象简单例子:

   ```javascript
   function timeout(ms) {
     return new Promise((resolve, reject) => {
       setTimeout(resolve, ms, 'done');
     });
   }
   
   timeout(100).then((value) => {
     console.log(value);
   });
   ```

   异步加载图片，成功则调用resolve方法，失败则调用reject方法：

   ```javascript
   function loadImage(url) {
     return new Promise((resolve, reject) => {
       const image = new Image();
   
       image.onload = () => {
         resolve(image);
       }
   
       image.onerror = () => {
         reject(new Error('fail to upload image' + url))
       }
       
       image.src = url;
     })
   }
   ```

5. 常用方法

   + then链式调用

   ```javascript
   function promise_1(ms) {
     return new Promise((resolve, reject) => {
       setTimeout(resolve, ms, 'promise_1');
     });
   }
   
   function promise_2(ms){
     return new Promise((resolve, reject) => {
       setTimeout(resolve, ms, 'promise_2');
     })
   }
   
   promise_1(1000)
   .then(val => {return console.log(val)}) //return
   .then(() => promise_2(2000))
   .then(val => {return console.log(val)}) //return
   .catch(err => console.log(err))
   ```

   + Catch 捕获异常，相当于then(null, rejection) 或 then(undefined, rejection)

     不建议使用reject回调处理异常，建议使用catch进行捕获；promise的error会冒泡，因此错误总能被下一个catch捕获，或error出现在resolve之后，则状态已经变为resolved，无法进行捕获

     ```javascript
     getJSON('/post/1.json').then(function(post) {
       return getJSON(post.commentURL);
     }).then(function(comments) {
       // some code
     }).catch(function(error) {
       // 处理前面三个Promise产生的错误
     });
     ```

     catch方法返回的还是promise，可继续链式调用

     ```javascript
     someAsyncThing()
     .catch(function(error) {
       console.log('oh no', error);
     })
     .then(function() {
       console.log('carry on');
     });
     ```

     

   + Finally(), 无论promise的最终状态如何，都会执行的方法

     ```javascript
     promise
     .then(result => {···})
     .catch(error => {···})
     .finally(() => {···});
     ```

   + Promise.all()

   + Promise.race()

6. 注意点：

   + return 保证返回一个promise,才能使用then
   + promise 会吃掉没有被捕获的错误，不暴露到外部
   + 使用catch处理异常，而不是reject回调

