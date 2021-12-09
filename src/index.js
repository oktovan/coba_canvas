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

    // context.fillStyle = '#000'
    // context.fillRect(0, 0, width, height)

    // context.font = 'bold 70pt Menlo'
    // context.textAlign = 'center'
    // context.textBaseline = 'top'
    // context.fillStyle = '#3574d4'

    // const text = 'Hello, World!'

    // const textWidth = context.measureText(text).width
    // context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
    // context.fillStyle = '#fff'
    // context.fillText(text, 600, 170)

    // context.fillStyle = '#fff'
    // context.font = 'bold 30pt Menlo'
    // context.fillText('flaviocopes.com', 600, 530)

    loadImage("./certif2.png").then((image) => {
      context.drawImage(image, 0, 0, width, height);
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync("./test.png", buffer);
      res.write(buffer); //dd
      res.end();
    });
  })
  .listen(8080); //the server object listens on port 8080
