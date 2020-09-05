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
    throw err;
    console.log(err);
  }
  return "2:Ready";
};

(async () => {
  try {
    console.log("1.will get dog pics");
    const x = await getDogPic();
    console.log(x);
    console.log("3.Done Getting the pic");
  } catch (err) {
    console.log("Error");
  }
})();

//Output:
// 1.will get dog pics
// Breed:labrador
// https://images.dog.ceo/breeds/labrador/n02099712_7414.jpg
// Rnadom dog image saved to file!
// 2:Ready
// 3.Done Getting the pic

//The aysnc method returns a promise .
//but since we return something explicitly it is always considered as a successfull promise.Hence we define a catch block with throw.
//The await keyword before calling the async method stops the executon unil the pending promise is resolved.
//Hence we see the output in sequence.
