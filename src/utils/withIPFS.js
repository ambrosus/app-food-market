var ipfsAPI = require('ipfs-api');

let ipfs = null;

export const withIPFS = (callback) => {
  if (ipfs === null) {
    ipfs = ipfsAPI({host: 'amb.482.solutions/ipfs', port: '', protocol: 'https'});
  }

  callback(ipfs);
};
