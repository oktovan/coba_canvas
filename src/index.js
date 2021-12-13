const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const qrcode= require('qrcode');
// const qr_image = require('qr-image');  

app.use(bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());
app.use(express.static('public'));

var nama = '';
var ktp = '';

app.post('/cert', (req, res) => {
  nama = req.body.nama;
  ktp = req.body.ktp;
  console.log(nama+ktp);
  loadImage("./certif2.png").then((image) => {
    const width = 1280;
    const height = 917;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    const qrcanvas = createCanvas(115, 115);
    qrcode.toCanvas(qrcanvas, nama+ktp, {
      width: 115,
      margin: 0
    });
    context.textAlign = "center";
    context.fillStyle = "#fff";
    context.drawImage(image, 0, 0, width, height);
    context.drawImage(qrcanvas, 827, 412, 115, 115);
    context.font = "bold 20pt Arial";
    context.fillText(nama, 570, 445);
    context.font = "16pt Arial";
    context.fillText(ktp, 570, 513);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./public/"+nama+ktp+".png", buffer);
  });
  res.send("http://116.193.190.125:3000/"+nama+ktp)
})



app.listen(3000,() => {
  console.log('Server running');
});

  