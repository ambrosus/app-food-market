import Ambrosus from 'ambrosus';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';

export const fetchMyAgreements = (marketAddress) => async function (dispatch) {
  await waitForAmbrosus();
  let profile = await new Ambrosus.ProfileRepository().getMyProfileFromMarket(marketAddress);
  let profileAddress = profile.getAddress();
  let agreements = await new Ambrosus.AgreementRepository(marketAddress).getUserAgreements(profileAddress);
  dispatch({ type: 'FETCH_AGREEMENTS_SUCCESS', agreements });
};
