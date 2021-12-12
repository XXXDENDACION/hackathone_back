const pinFileToIPFS = require("./pinata/send.js");
const mintNFT = require("./scripts/mint-nft.js");

const wait = () => {
  return new Promise((res) => {
    setTimeout(res, 10000);
  });
};
const uploadNft = async () => {
  try {
    pinFileToIPFS("./assets/giphy.gif").then(async (res) => {
      console.log(res);
      console.log("waiting for 5 sec");
      await wait();
      mintNFT(res);
      console.log("SUCCESS");
    });
  } catch (err) {
    console.log(err);
  }
};
uploadNft();
