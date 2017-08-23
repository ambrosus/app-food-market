import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';

export const requestCreateRequirement = (name, requirement) => ({
  type: 'CREATE_REQUIREMENT_REQUEST',
  data: {
    name: name,
    requirement,
  },
});

export const responseCreateRequirement = (address) => ({
  type: 'CREATE_REQUIREMENT_RESPONSE',
  address,
});

export const successCreateRequirement = (address) => ({
  type: 'CREATE_REQUIREMENT_SUCCESS',
  address,
});

export const failedCreateRequirement = (address) => ({
  type: 'CREATE_REQUIREMENT_FAIL',
  address,
});

export const createRequirement = (name, requirements, marketAddress, history) => async function (dispatch) {
  dispatch(requestCreateRequirement());
  await waitForAmbrosus();
  let requirementsRepository = new Ambrosus.RequirementsRepository();

  new TransactionBuilder(dispatch, requirementsRepository.create.bind(requirementsRepository)).
    setTitle('Transfer to ESCROW').
    setArguments(name, marketAddress, requirements).
    onTxCallback((tx) => dispatch(responseCreateRequirement(tx))).
    onSuccessCallback((requirements) => {
      dispatch(successCreateRequirement(requirements.contract.address));
      history.push('market');
    }).
    send();
};
