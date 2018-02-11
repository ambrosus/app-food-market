import Base from '../Base.js';
import { getSecret } from '../../utils/utils';

export default class EventsApi extends Base {
  async createEvent(assetId, type, creator) {
    if (!assetId) return null;
    const secret = getSecret(creator);
    const body = {
      content: {
        data: {
          type,
          subject: assetId,
          creator,
          created_at: Date.now(),
        },
        secret,
      },
    };
    return this.apiClient.post(`assets/${assetId}/events`, body);
  }
}
