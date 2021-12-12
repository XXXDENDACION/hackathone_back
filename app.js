const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const request = require('request');
const bodyParser = require('body-parser');
const pinFileToIPFS = require("./pinata/send.js");
const mintNFT = require("./scripts/mint-nft.js");
const imageToBase64 = require('image-to-base64');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/link', async(req, res) => {
  console.log('DATA', req.body);
  const { description, url } = req.body;
  console.log('URL', url);
  console.log('DESCRIPTION', description);
  if(!url && !description) {
    throw 'UNDEFINED';
  }
  const obj = {
    url,
    description
  }
  fs.writeFile('file.json', JSON.stringify(obj), (err, data) => {
    if (err) throw err;
    console.log('OK');
    res.send('OK');
  })
});

app.get('/', async(req, res) => {
  let link = '';
  const downloadImage = (url, filename, callback) => {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
  }
  fs.readFile('file.json', (err, data) => {
    if(err) throw err;
    link = JSON.parse(data).url;
    link = link + '.png';
    console.log(link);
    downloadImage(link, 'image.png', () => console.log('HI'));
    res.send('LINK');
  });
})

app.get('/getImages', async(req, res) => {
  let description = '';
  let img = '';
  imageToBase64('image.png').then(
    (response) => {
      console.log(response);
      img = response;
      fs.readFile('image.png', (err, data) => {
        if (err) throw err;
        console.log(data);
        fs.readFile('file.json', (err, data) => {
          if(err) throw err;
          description = JSON.parse(data).description;
          console.log(description);
          const obj = {
            img,
            description
          }
          res.json(obj);
        })
      })
    }
  )
})

const uploadNft = async () => {
  try {
    pinFileToIPFS("./assets/dali.png").then(async (res) => {
      console.log(res);
      console.log("waiting for 5 sec");
      mintNFT(res);
      console.log("SUCCESS");
    });
  } catch (err) {
    console.log(err);
  }
};
// uploadNft();

app.listen(process.env.PORT || 3000, () => console.log('START'));
