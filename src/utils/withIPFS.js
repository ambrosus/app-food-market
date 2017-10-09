var ipfsAPI = require('ipfs-api');

let ipfs = null;

export const withIPFS = (callback) => {
  if (ipfs === null) {
    ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });
  }

  callback(ipfs);
};
