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

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

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

app.post('/nft', async(req, res) => {
  console.log('DATA', req.body);
  const { img } = req.body;
  console.log('URL', img);
  if(!img) {
    throw 'No image';
  }
  const base64 = img.split(';base64,').pop();;
  console.log(base64);
  fs.writeFile('currentNFTimage.png', base64, {encoding: 'base64'}, async (err, data) => {
    if (err) throw err;
    await uploadNft('currentNFTimage.png');
    res.send('OK');
  })
});

const uploadNft = async (img) => {
  try {
    pinFileToIPFS(img).then(async (res) => {
      console.log(res);
      console.log("waiting for 5 sec");
      mintNFT(res);
      console.log("SUCCESS");
    });
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT || 3000, () => console.log('START'));
