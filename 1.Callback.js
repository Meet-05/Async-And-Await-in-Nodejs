//In this program we read a dog breed from a file
//,send a request to the dog api an save the response in a file by writing

const fs = require("fs");
const superagent = require("superagent");

//Level 1 callback
fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
  console.log(data);

  //level 2 call back
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) {
        return console.log(err.message);
      }
      console.log(res.body.message);
      //level 3 callback

      fs.writeFile("dog-img.txt", res.body.message, (err) => {
        if (err) {
          return console.log(err.message);
        }
        console.log("random dog image saved");
      });
    });
});
