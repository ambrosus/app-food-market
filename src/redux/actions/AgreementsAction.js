import Ambrosus from 'ambrosus';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import { MAX_TRADES_AMOUNT } from '../../constants';

const TRADES_LIST = [];
const IMAGES_LIST = [
  'QmT6Po7e6DRZf1BHxXm7GLudrEvsf7tzBBibTGZ87caCGw',
  'QmbfQ6fhMfRYUVZy5aQGsrqgVLnYhPQTxmK7Y8DRoJwz1R',
  'QmSmSaoWAfbZHons4tCGL1QpEqTVR9xAs4rGBEfdyYaEFw',
  'QmWAQfnF8WqsvafzYSNMmD8Z512mrV5z2kcD2uLvCx8Fs7',
  'QmXhQr2UXUL2Wo38TuKPSUCMBFeuzb5yfGeAu4mZ7Y8ead',
  'QmVv6kNDgwSYw6Xk6dpv1uQLrAWDYy5fYb3NiFS3XEJCk7',
  'QmS23P1FkGpFAfwJRXzvrKaWo8DvCavEBYz6YYsHGmZr7N',
];
const NAMES_LIST = [
  'Colombian Supremo',
  'City Roast Colombian Supremo',
  'Ethiopian Yirgacheffe',
  'Italian Roast Espresso',
  'Dark Sumatra Mandheling',
  'Breakfast Blend',
  'Kenya AA',
  'Ethiopian Yirgacheffe',
  'French Roast',
  'Dark Brazilian Santos',
  'Dark Brazilian Santos',
];
const IMAGES_LENGTH = IMAGES_LIST.length;
const NAMES_LENGTH = NAMES_LIST.length;

for (let i = 0; i < 45; i++) {
  TRADES_LIST.push({
    id: i,
    name: NAMES_LIST[Math.floor(Math.random() * (NAMES_LENGTH - 1))],
    origin: '',
    category: 'Coffee',
    seller: `0x0056bd78b3c0d85e0ceb4a7634368845a21d${Math.random()}ea38`,
    customer: '0x4bf9a0cdfeaa638620e96e356593bc2ab395f10a222',
    imageHash: IMAGES_LIST[Math.floor(Math.random() * (IMAGES_LENGTH - 1))],
    status: (Math.random() * (10 - 1) + 1) > 5 ? 'finished' : 'pending',
    packageWeight: Math.round(Math.random() * (200 - 60) + 60),
    pricePerPackage: parseFloat((Math.random() * (200 - 60) + 60), 2),
    measurementsAddress: '0xe3fa9f8dc84c3f1629d94f6b969b197920cea712',
    requirementsAddress: '0xe18bd8f3674b3903eeb5c0331319e12f83fb519b',
    validatorAddress: '0x0000000000000000000000000000000000000000',
    address: `0x0000000000000000000000${Math.random()}000000000000000000`,
    pricePerUnit: 100,
    quantity: Math.round(Math.random() * (20 - 2) + 20),
    quality: 'High',
  });
};

export const fetchMyAgreements = (marketAddress) => async function (dispatch, getState) {
  const { paginationPage } = getState().market;
  await waitForAmbrosus();
  let profile = await new Ambrosus.ProfileRepository().getMyProfileFromMarket(marketAddress);
  let profileAddress = profile.getAddress();

  // TODO: remove mocked data
  // let agreements = await new Ambrosus.AgreementRepository(marketAddress).getUserAgreements(profileAddress);
  const startIndex = paginationPage * MAX_TRADES_AMOUNT;
  const endIndex = startIndex + MAX_TRADES_AMOUNT;
  const orders = TRADES_LIST.slice(startIndex, endIndex);
  dispatch({ type: 'FETCH_AGREEMENTS_SUCCESS', orders, ordersAmount: TRADES_LIST.length });
};
