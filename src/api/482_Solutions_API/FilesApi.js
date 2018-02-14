import Base from '../Base.js';
import { getSignature } from '../../utils/utils';

export default class FilesApi extends Base {
  async uploadFile(id, file, itemType) {
    const [user] = web3.eth.accounts;
    const signature = await getSignature(user, id);
    const [encoded, fileData] = file.split(',');
    const mimeType = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64*/)[1];
    return this.apiClient.post(`files/${itemType}`, {
      [`${itemType}Id`]: id,
      file: fileData,
      signature,
      contentType: mimeType,
    });
  }
}
