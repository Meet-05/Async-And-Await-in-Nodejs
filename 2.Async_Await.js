//Understanding Aync and Await
//while consuming a promise ,the promise initially returns a pending promise and after tahat it returns a resolved promise.
//resolved promise can be fulfilled(succesfull and handled by then ) or rejected(error handled by catch).
// using the then  and catch  we still use callbacks .
// in  our code we will consume promises rather than creaing them.
// Async and await are used for this.
// before decalaring the function we use async keyword that means the function will run in background  without blocking event loop
// inside async funtion we can have one or more await expressions.
// The async  function itself returns a promise
// The await function will block the execution of the code until the promise is resolved .
// And then assign the result of expression to the constant.
// This makes the code look synchronous but still making it asynchronous behin the scene

const fs = require("fs");
const superagent = require("superagent");
//a custo promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😢");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed:${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro(`dog-img.txt`, res.body.message);
    console.log("Rnadom dog image saved to file!");
  } catch (err) {
    console.log(err);
  }
  return "2:Ready";
};

console.log("1.Ready to get Dog pic");
const x = getDogPic();
console.log(x);
console.log("3.Done Getting the pic");

//-----------output----------------------
// 1.Ready to get Dog pic
// Promise { <pending> }
// 3.Done Getting the pic
// Breed:labrador
// https://images.dog.ceo/breeds/labrador/n02099712_4965.jpg
// Rnadom dog image saved to file!

//Why this output?
// The first line is executed as its first in sequence
// In the second line we call the async method which returns a promise.
// But at this point the promise is not resolved it is still pending and the async function starts executing in the background
// in the background out of the Single main thread.
//So the main process exectues the next lines in sequence
//And after that we see result of async process async process executes
