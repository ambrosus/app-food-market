var ipfsAPI = require('ipfs-api');

let ipfs = null;

export const withIPFS = (callback) => {
  if (ipfs === null) {
    ipfs = ipfsAPI({host: 'amb.482.solutions/ipfs', port: '443', protocol: 'https'});
  }

  callback(ipfs);
};
