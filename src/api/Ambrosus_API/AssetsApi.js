import Base from '../Base.js';
import { getStringForSign, getSignature } from '../../utils/utils';

export default class AssetsApi extends Base {
  async createAsset(asset) {
    const [owner] = web3.eth.accounts;
    const assetData = {
      content: {
        data: {
          name: asset.name,
          owner,
          creator: owner,
          createdAt: +new Date(),
          identifiers: {
            isbn: '978-3-16-148410-0',
            ean8: '96385074',
            gtin: '00788932473277',
          },
        },
      },
    };
    const string = getStringForSign(assetData);
    const signature = await getSignature(owner, string);
    const body = { ...assetData, content: { ...assetData.content, signature } };
    return this.apiClient.post('assets/', body);
  }
}
