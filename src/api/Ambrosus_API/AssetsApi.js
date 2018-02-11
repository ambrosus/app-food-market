import Base from '../Base.js';
import { getSecret } from '../../utils/utils';

export default class AssetsApi extends Base {
  async createAsset(asset) {
    if (!asset) return;
    const { name, quality, category, packageWeight, pricePerPackage } = asset;
    const [owner] = web3.eth.accounts;
    const secret = getSecret(owner);

    const body = {
      content: {
        data: {
          name,
          owner,
          creator: owner,
          created_at: Date.now(),
          identifiers: { quality, category, packageWeight, pricePerPackage },
        },
        secret,
      },
    };
    return this.apiClient.post('assets', body);
  }
}
