import Ambrosus from 'ambrosus';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import { MAX_TRADES_AMOUNT } from '../../constants';

const TRADES_LIST = [];
const imagesList = [
  'QmaKvEfCut6mpVXywUKy7Mq1za5XYYLoVPMDRm6rffGaCj',
  'QmR8hNEGvUMjgCtm7YX2fivV3v2aZnYhVeD7Ms1TWZHVDB',
  'QmaKvEfCut6mpVXywUKy7Mq1za5XYYLoVPMDRm6rffGaCj',
  'QmSkifJ8ZRry8c3AxcSFCEhcYM26yqRkoebAvphW7nx9fz',
  'QmW9Te6vi1nNvnxAV7SDm7FiJWj9rphjyMJnYH947GY5Za',
  'QmVPMUYVooLw9XRgEWFnKZLyaZeWBM18EX7X3g6hrQBDqB',
  'QmborzJi5VeSRVccFHMhfPYzXUxysSLPTEft2ijDTt3ApC',
  'QmWmGgwY7EhvzwRW3Fctrx4dQ2HoFP8mGQDYVFufqasRwo',
];
const imagesLength = imagesList.length;

for (let i = 0; i < 45; i++) {
  TRADES_LIST.push({
    name: 'Salmon',
    origin: '',
    category: 'Salmon',
    seller: `0x0056bd78b3c0d85e0ceb4a7634368845a21d${Math.random()}ea38`,
    imageHash: imagesList[Math.floor(Math.random() * (imagesLength - 1))],
    status: 'finished',
    packageWeight: 2,
    pricePerPackage: 200,
    measurementsAddress: '0xe3fa9f8dc84c3f1629d94f6b969b197920cea712',
    requirementsAddress: '0xe18bd8f3674b3903eeb5c0331319e12f83fb519b',
    validatorAddress: '0x0000000000000000000000000000000000000000',
    address: `0x0000000000000000000000${Math.random()}000000000000000000`,
    pricePerUnit: 100,
    quantity: Math.random() * (100 - 20) + 20,
    quality: 'High',
  });
};

export const fetchMyAgreements = (marketAddress) => async function (dispatch, getState) {
  const { paginationPage } = getState().market;
  await waitForAmbrosus();
  let profile = await new Ambrosus.ProfileRepository().getMyProfileFromMarket(marketAddress);
  let profileAddress = profile.getAddress();

  // TODO: gromick - remove mocked data
  // let agreements = await new Ambrosus.AgreementRepository(marketAddress).getUserAgreements(profileAddress);
  const startIndex = paginationPage * MAX_TRADES_AMOUNT;
  const endIndex = startIndex + MAX_TRADES_AMOUNT;
  const orders = TRADES_LIST.slice(startIndex, endIndex);
  dispatch({ type: 'FETCH_AGREEMENTS_SUCCESS', orders, ordersAmount: TRADES_LIST.length });
};
