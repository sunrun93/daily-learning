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

function promise_3(ms){
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'promise_3');
  })
}

promise_1(1000)
.then(val => {return console.log(val)})
.then(() => promise_2(2000))
.then(val => {return console.log(val)})
.then(() => promise_3(3000))
.then(val => {return console.log(val)})


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