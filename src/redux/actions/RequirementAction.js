import { statusAddFailedTransaction,
statusAddPendingTransaction,
statusAddSuccessTransaction } from './TransactionStatusAction.js';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import { hideModal, showModal } from './ModalAction.js';
import Ambrosus from 'ambrosus';

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
        requirementsRepository.create(name, marketAddress, requirements, (transactionHash) => {
            dispatch(statusAddPendingTransaction({
                address: transactionHash,
                caption: 'Creating contract',
                url: 'ads',
              }));
            dispatch(responseCreateRequirement(transactionHash));
            dispatch(showModal('TransactionProgressModal'));
          }).then((requirements) => {
            dispatch(statusAddSuccessTransaction({
                address: requirements.contract.transactionHash,
                caption: 'Creating contract',
                url: 'ads',
              }));
            dispatch(successCreateRequirement(requirements.contract.address));
            dispatch(hideModal());
            history.push('market');
          }).catch((err) => {
            dispatch(statusAddFailedTransaction({
                address: '',
                caption: 'Creating contract', errors: err,
              }));
            dispatch(showModal('ErrorModal', { reason: err }));
          });
      };
