import IPFSUploader from 'ipfs-image-web-upload';
import { withIPFS } from './withIPFS.js';

export const loadImage = (domElement, imageHash) => {
  if (!imageHash)
    return;	
  withIPFS((ipfs)=>{
    let uploader = new IPFSUploader(ipfs);
    uploader.loadImage(domElement, imageHash);
  });
};