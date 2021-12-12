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
  let link = '';
  const downloadImage = (url, filename, callback) => {
    request.head(url, (err, res, body) => {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
    })
  }

  const { description, url } = req.body;
  const obj = {
    url,
    description
  }
  fs.writeFile('file.json', JSON.stringify(obj), (err, data) => {
    if (err) throw err;
    fs.readFile('file.json', (err, data) => {
      if(err) throw err;
      link = JSON.parse(data).url;
      link = link + '.png';
      console.log(link);
      downloadImage(link, 'image.png', () => console.log('HI'));
      res.send('LINK');
    });
  })
});

app.get('/', async(req, res) => {
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
