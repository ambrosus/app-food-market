import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import Ambrosus from 'ambrosus';
import TransactionBuilder from '../../utils/transactionBuilder';
import { withIPFS } from '../../utils/withIPFS';
import { showModal, hideModal } from './ModalAction.js';

export const addMeasurements = (measurementsAddress, measurements, history) => async function (dispatch) {
  measurements = measurements.map(measurement => ({ ...measurement, timestamp: Date.now() }));
  await waitForAmbrosus();
  withIPFS(async (ipfs) => {
    dispatch(showModal('TransactionProgressModal', { title: 'Uploading measurements' }));
    let storage = await new Ambrosus.MeasurementRepository(ipfs).fromAddress(measurementsAddress);
    for (let measurement of measurements) {
      await storage.addMeasurement(new Ambrosus.Measurement(
        measurement.id,
        measurement.value,
        measurement.event,
        measurement.timestamp,
        measurement.farmerId,
        measurement.batchId,
        measurement.device,
      ));
    }

    new TransactionBuilder(dispatch, storage.updateHash.bind(storage)).
      setTitle('Updating measurements').
      onSuccessCallback(() => {
        history.push('market');
      }).
      send();

  });
};

export const fetchMeasurements = (measurementsAddress) => async function (dispatch) {
  await waitForAmbrosus();
  console.log(measurementsAddress)
  withIPFS(async (ipfs) => {
    let storage = await new Ambrosus.MeasurementRepository(ipfs).fromAddress(measurementsAddress);
    var measurements = await storage.doGetMeasurements(); // TODO validate
    dispatch({ type: 'FETCH_MEASUREMENTS_SUCCESS', measurements });
  });
};

