import IPFSUploader from 'ipfs-image-web-upload';
import IPFS from 'ipfs';

export const loadImage = (domElement, imageHash) => {
  if (!imageHash)
    return;
  var ipfs = new IPFS();
  ipfs.on('ready', () => {
    var uploader = new IPFSUploader(ipfs);

    uploader.loadImage(domElement, imageHash);
  });
}