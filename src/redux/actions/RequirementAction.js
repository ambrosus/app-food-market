import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';

export const requestCreateRequirement = (name, requirements) => ({
  type: 'CREATE_REQUIREMENT_REQUEST',
  data: {
    name: name,
    requirements: requirements,
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
  dispatch(requestCreateRequirement(name, requirements));
  await waitForAmbrosus();
  let requirementsRepository = new Ambrosus.RequirementsRepository();

  new TransactionBuilder(dispatch, requirementsRepository.create.bind(requirementsRepository)).
    setTitle('Creating requirement').
    setArguments(name, marketAddress, requirements).
    onTxCallback((tx) => dispatch(responseCreateRequirement(tx))).
    onSuccessCallback((requirements) => {
      dispatch(successCreateRequirement(requirements.contract.address));
      history.push('market');
    }).
    send();
};

export const fillRequirementForm = (defaultForm) => ({ type: 'SET_REQUIREMENTS_FORM', form: defaultForm });

export const resetRequirementForm = () => ({ type: 'RESET_REQUIREMENTS_FORM' });
