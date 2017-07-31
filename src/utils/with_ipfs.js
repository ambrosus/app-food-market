import IPFS from 'ipfs';

var ipfs = null;

export const withIPFS = (callback) => {
  if (ipfs == null){
    ipfs = new IPFS();
  }
  if (ipfs.isOnline())
    callback(ipfs);
  else
    ipfs.on('ready', () => callback(ipfs));
}