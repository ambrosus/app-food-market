import Ambrosus from 'ambrosus';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';

export const fetchAttributes = (requirementsAddress) => async function (dispatch) {
  await waitForAmbrosus();
  const requirementsRepo = new Ambrosus.RequirementsRepository();
  const requirements = await requirementsRepo.fromAddress(requirementsAddress);
  const attributes = await requirements.getAttributes();
  dispatch({ type: 'FETCH_ATTRIBUTES_SUCCESS', attributes });
};

export const fetchAttributesFromQualityName = (name, marketAddress) => async (dispatch) => {
  await waitForAmbrosus();
  const market = await new Ambrosus.MarketRepository().fromAddress(marketAddress);
  try {
    const requirements = await new Ambrosus.RequirementsRepository().findQualityByName(name, market);
    const attributes = await requirements.getAttributes();
    dispatch({ type: 'FETCH_ATTRIBUTES_SUCCESS', attributes });
  }
  catch (e) {
    dispatch({ type: 'FETCH_ATTRIBUTES_SUCCESS', attributes: [] });
  }
};
