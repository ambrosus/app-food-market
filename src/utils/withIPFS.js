var ipfsAPI = require('ipfs-api');

let ipfs = null;

export const withIPFS = (callback) => {
  if (ipfs === null) {
    ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001');
  }

  callback(ipfs);
};
