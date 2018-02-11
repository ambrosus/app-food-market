import ApiClient       from './apiClient';
import StatementsAPI   from './482_Solutions_API/StatementsApi';
import AuthorizeAPI    from './Ambrosus_API/AuthorizeApi';
import AssetsAPI    from './Ambrosus_API/AssetsApi';
import EventsAPI    from './Ambrosus_API/EventsApi';

function getApi() {
  const apiSolutions = new ApiClient({ prefix: 'https://amb.482.solutions' });
  const apiAmbrosus = new ApiClient({ prefix: 'https://network.ambrosus.com' });
  return {
    statements: new StatementsAPI({ apiClient: apiSolutions }),
    authorize: new AuthorizeAPI({ apiClient: apiAmbrosus }),
    assets: new AssetsAPI({ apiClient: apiAmbrosus }),
    events: new EventsAPI({ apiClient: apiAmbrosus }),
  };
};

export default getApi();
