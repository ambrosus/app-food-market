import IPFS from 'ipfs';

let ipfs = null;

export const withIPFS = (callback) => {
  if (ipfs == null) {
    ipfs = new IPFS();
  }

  if (ipfs.isOnline())
    callback(ipfs);
  else
    ipfs.on('ready', () => callback(ipfs));
};
