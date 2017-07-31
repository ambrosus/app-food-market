import IPFSUploader from 'ipfs-image-web-upload';
import { withIPFS } from './with_ipfs.js';

export const loadImage = (domElement, imageHash) => {
  if (!imageHash)
    return;
  withIPFS((ipfs)=>{
    var uploader = new IPFSUploader(ipfs);
    uploader.loadImage(domElement, imageHash);
  });
}