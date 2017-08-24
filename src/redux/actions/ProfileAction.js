import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';

export const fetchUsername = (marketAddress) => async function (dispatch) {
  await waitForAmbrosus();
  let profile = await new Ambrosus.ProfileRepository().getMyProfileFromMarket(marketAddress);
  let name = await profile.getUserName();
  dispatch({ type: 'FETCH_USERNAME_SUCCESS', username: name });
};

export const changeUsername = (marketAddress, newName) => async function (dispatch) {
  await waitForAmbrosus();
  let profileRepo = await new Ambrosus.ProfileRepository();
  new TransactionBuilder(dispatch, profileRepo.setUserName.bind(profileRepo)).
    setTitle('Changing name').
    setArguments(marketAddress, newName).
    onSuccessCallback(()=>dispatch(fetchUsername(marketAddress))).
    send();
};
