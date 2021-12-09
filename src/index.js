var http = require("http");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

// create a server object:
http
  .createServer(function (req, res) {
    const width = 1280;
    const height = 917;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    context.textAlign = "center";
    const nama = "OKTOVAN REZMAN";
    const no_ktp = "3275039393039";
    context.fillStyle = "#fff";

    loadImage("./certif2.png").then((image) => {
      context.drawImage(image, 0, 0, width, height);
      context.font = "bold 20pt Arial";
      context.fillText(nama, 570, 445);
      context.font = "16pt Arial";
      context.fillText(no_ktp, 570, 513);
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./test.png", buffer);
      res.write(buffer); //dd
      res.end();
    });
  })
  .listen(8080); //the server object listens on port 8080
