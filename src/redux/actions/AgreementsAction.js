import Ambrosus from 'ambrosus';
import { waitForAmbrosus } from '../../utils/waitForAmbrosus';
import { MAX_TRADES_AMOUNT } from '../../constants';


const TRADES_LIST = [
  {
    "name":"Salmon",
    "origin":"",
    "category":"Salmon",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmShTBNm54av2WejMFmF3QTcWtouP3rNuWrZPWRvzpiQpe",
    "packageWeight":2,
    "pricePerPackage":200,
    "measurementsAddress":"0xe3fa9f8dc84c3f1629d94f6b969b197920cea712",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0xf4dfhc1ce7f47893a959a3de8fad2331cd5233f1f0123b",
    "pricePerUnit":100,
    "quality":"High"
  },
  {"name":"Atlantic Salmon",
    "origin":"",
    "category":"Salmon",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmR8hNEGvUMjgCtm7YX2fivV3v2aZnYhVeD7Ms1TWZHVDB",
    "packageWeight":10,
    "pricePerPackage":990,
    "measurementsAddress":"0xdeda4a949ac6c06f2ca407d400aed55c283235e8",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0xa5sdfsf8238942e2f10123123aea9e45aa406ea04df1cc038d5",
    "pricePerUnit":99,
    "quality":"High"
  },
  {
    "name":"Chinook salmon",
    "origin":"",
    "category":"Salmon",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmaKvEfCut6mpVXywUKy7Mq1za5XYYLoVPMDRm6rffGaCj",
    "packageWeight":5,
    "pricePerPackage":350,
    "measurementsAddress":"0xcb3dd7fe64afead4e413e663ace8aaecf0574db2",
    "requirementsAddress":"0xbcec05d118bd182374565d0c58e7baa90bf86a07",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0dvsdvxf0730c6ec65123123ede71cc21c677d55c8b86cfabafca",
    "pricePerUnit":70,
    "quality":"Low"
  },
  {"name":"Atlantic Horse Mackerel",
    "origin":"",
    "category":"Markel",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmSkifJ8ZRry8c3AxcSFCEhcYM26yqRkoebAvphW7nx9fz",
    "packageWeight":10,
    "pricePerPackage":490,
    "measurementsAddress":"0x1d687375ac21f80d1f891152c842c43bcf308673",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0x8c7d8b8ceaasdgsdg2131239e64aa8c4ab9af63b9b1df71b63d3",
    "pricePerUnit":49,
    "quality":"High"
  },
  {
    "name":"Chub Mackerel",
    "origin":"",
    "category":"Markel",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmW9Te6vi1nNvnxAV7SDm7FiJWj9rphjyMJnYH947GY5Za",
    "packageWeight":5,
    "pricePerPackage":700,
    "measurementsAddress":"0x75cc31d32d2b60032543ff608943350169fc15c1",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0xkhkg243c9bed5213123b6fe6c5f7f97037f9766a003feeb143",
    "pricePerUnit":140,
    "quality":"High"
  },
  {
    "name":"Skipjack tuna",
    "origin":"","category":"Tuna",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmVPMUYVooLw9XRgEWFnKZLyaZeWBM18EX7X3g6hrQBDqB",
    "packageWeight":20,
    "pricePerPackage":1950,
    "measurementsAddress":"0x48d52a6d66bf6a3e6bdef703bac5144667ac27ef",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0x460ghkghk053bb1231232cda21160c85800c2fd2a4b4939ddd04a9",
    "pricePerUnit":97.5,
    "quality":"High"
  },
  {
    "name":"Euthynnus","origin":"","category":"Tuna","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmbgwerfsGNFnfgDAhY7yscryGArn76uXNrwDv4jYaYvDk","packageWeight":5,"pricePerPackage":650,"measurementsAddress":"0xadd21078dbb3efdcd649b4174e8e1f2dbce31618","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0gkgsdfsdkx2be412549743a55ce846896012459a85089b4ae7","pricePerUnit":130,"quality":"High"},{"name":"European Anchovy","origin":"","category":"Anchovies","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmborzJi5VeSRVccFHMhfPYzXUxysSLPTEft2ijDTt3ApC","packageWeight":1,"pricePerPackage":55,"measurementsAddress":"0xae03304fbb4566250c97b4e30760ac0acdf079ed","requirementsAddress":"0xbcec05d118bd182374565d0c58e7baa90bf86a07","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x2085asdadsc1fe9885830560c586f10f387bc75ed2a2a1","pricePerUnit":55,"quality":"Low"
  },
  {
    "name":"Engraulis",
    "origin":"",
    "category":"Anchovies",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmWmGgwY7EhvzwRW3Fctrx4dQ2HoFP8mGQDYVFufqasRwo",
    "packageWeight":10,"pricePerPackage":330,
    "measurementsAddress":"0xa85c29d50ba3980bff07c0ed78ed256a8a2466fe",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0x12323basdad40c3a644b8e676c603dd5986462b1120bb39e43",
    "pricePerUnit":33,
    "quality":"High"
  },
  {
    "name":"Salmon",
    "origin":"",
    "category":"Salmon",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmShTBNm54av2WejMFmF3QTcWtouP3rNuWrZPWRvzpiQpe",
    "packageWeight":2,
    "pricePerPackage":200,
    "measurementsAddress":"0xe3fa9f8dc84c3f1629d94f6b969b197920cea712",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0xf4c1ce7f4DDA7893a959a3de8fad2331cd5233f1f0b",
    "pricePerUnit":100,
    "quality":"High"
  },
  {"name":"Atlantic Salmon",
    "origin":"",
    "category":"Salmon",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmR8hNEGvUMjgCtm7YX2fivV3v2aZnYhVeD7Ms1TWZHVDB",
    "packageWeight":10,
    "pricePerPackage":990,
    "measurementsAddress":"0xdeda4a949ac6c06f2ca407d400aed55c283235e8",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0xa58238ASDADS942e2f10aea9e45aa406ea04df1cc038d5",
    "pricePerUnit":99,
    "quality":"High"
  },
  {
    "name":"Chinook salmon",
    "origin":"",
    "category":"Salmon",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmaKvEfCut6mpVXywUKy7Mq1za5XYYLoVPMDRm6rffGaCj",
    "packageWeight":5,"pricePerPackage":350,
    "measurementsAddress":"0xcb3dd7fe64afead4e413e663ace8aaecf0574db2",
    "requirementsAddress":"0xbcec05d118bd182374565d0c58e7baa90bf86a07",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0xf0730ASFSAFc6ec65ede71cc21c677d55c8b86cfabafca",
    "pricePerUnit":70,"quality":"Low"
  }
  ,{"name":"Atlantic Horse Mackerel",
    "origin":"","category":"Markel",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmSkifJ8ZRry8c3AxcSFCEhcYM26yqRkoebAvphW7nx9fz",
    "packageWeight":10,"pricePerPackage":490,
    "measurementsAddress":"0x1d687375ac21f80d1f891152c842c43bcf308673",
    "requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b",
    "validatorAddress":"0x0000000000000000000000000000000000000000",
    "address":"0x8c7d8bASDADS8ceaa9e64aa8c4ab9af63b9b1df71b63d3",
    "pricePerUnit":49,"quality":"High"
  },
  {
    "name":"Chub Mackerel",
    "origin":"",
    "category":"Markel",
    "seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38",
    "imageHash":"QmW9Te6vi1nNvnxAV7SDm7FiJWj9rphjyMJnYH947GY5Za",
    "packageWeight":5,"pricePerPackage":700,"measurementsAddress":"0x75cc31d32d2b60032543ff608943350169fc15c1","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x243c9beSFSFDd5b6fe6c5f7f97037f9766a003feeb143","pricePerUnit":140,"quality":"High"},{"name":"Skipjack tuna","origin":"","category":"Tuna","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmVPMUYVooLw9XRgEWFnKZLyaZeWBM18EX7X3g6hrQBDqB","packageWeight":20,"pricePerPackage":1950,"measurementsAddress":"0x48d52a6d66bf6a3e6bdef703bac5144667ac27ef","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x460053bbSDFSDF2cda260c85800c2fd2a4b4939ddd04a9","pricePerUnit":97.5,"quality":"High"},{"name":"Euthynnus","origin":"","category":"Tuna","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmbgwerfsGNFnfgDAhY7yscryGArn76uXNrwDv4jYaYvDk","packageWeight":5,"pricePerPackage":650,"measurementsAddress":"0xadd21078dbb3efdcd649b4174e8e1f2dbce31618","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x2be412549SFDFDFS743a55ce846896012459a85089b4ae7","pricePerUnit":130,"quality":"High"},{"name":"European Anchovy","origin":"","category":"Anchovies","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmborzJi5VeSRVccFHMhfPYzXUxysSLPTEft2ijDTt3ApC","packageWeight":1,"pricePerPackage":55,"measurementsAddress":"0xae03304fbb4566250c97b4e30760ac0acdf079ed","requirementsAddress":"0xbcec05d118bd182374565d0c58e7baa90bf86a07","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x2085c1fe98858SDFSDFSD30560c586f10f387bc75ed2a2a1","pricePerUnit":55,"quality":"Low"},{"name":"Engraulis","origin":"","category":"Anchovies","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmWmGgwY7EhvzwRW3Fctrx4dQ2HoFP8mGQDYVFufqasRwo","packageWeight":10,"pricePerPackage":330,"measurementsAddress":"0xa85c29d50ba3980bff07c0ed78ed256a8a2466fe","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0xb40c3a644b8e676c603dSGSDGd5986462b1120bb39e43","pricePerUnit":33,"quality":"High"},{"name":"Salmon","origin":"","category":"Salmon","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmShTBNm54av2WejMFmF3QTcWtouP3rNuWrZPWRvzpiQpe","packageWeight":2,"pricePerPackage":200,"measurementsAddress":"0xe3fa9f8dc84c3f1629d94f6b969b197920cea712","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0xf4c1ce7f478AFASFAF93a959a3de8fad2331cd5233f1f0b","pricePerUnit":100,"quality":"High"},{"name":"Atlantic Salmon","origin":"","category":"Salmon","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmR8hNEGvUMjgCtm7YX2fivV3v2aZnYhVeD7Ms1TWZHVDB","packageWeight":10,"pricePerPackage":990,"measurementsAddress":"0xdeda4a949ac6c06f2ca407d400aed55c283235e8","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0xa58238942e2fAASGHF10aea9e45aa406ea04df1cc038d5","pricePerUnit":99,"quality":"High"},{"name":"Chinook salmon","origin":"","category":"Salmon","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmaKvEfCut6mpVXywUKy7Mq1za5XYYLoVPMDRm6rffGaCj","packageWeight":5,"pricePerPackage":350,"measurementsAddress":"0xcb3dd7fe64afead4e413e663ace8aaecf0574db2","requirementsAddress":"0xbcec05d118bd182374565d0c58e7baa90bf86a07","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0xf0730c6ecUIOUOU65ede71cc21c677d55c8b86cfabafca","pricePerUnit":70,"quality":"Low"},{"name":"Atlantic Horse Mackerel","origin":"","category":"Markel","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmSkifJ8ZRry8c3AxcSFCEhcYM26yqRkoebAvphW7nx9fz","packageWeight":10,"pricePerPackage":490,"measurementsAddress":"0x1d687375ac21f80d1f891152c842c43bcf308673","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x8c7d8b8ceaa9e64aa8c4abFGGFHGF9af63b9b1df71b63d3","pricePerUnit":49,"quality":"High"},{"name":"Chub Mackerel","origin":"","category":"Markel","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmW9Te6vi1nNvnxAV7SDm7FiJWj9rphjyMJnYH947GY5Za","packageWeight":5,"pricePerPackage":700,"measurementsAddress":"0x75cc31d32d2b60032543ff608943350169fc15c1","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x243c9bed5b6fe6c5fHJHGHLKHL7f97037f9766a003feeb143","pricePerUnit":140,"quality":"High"},{"name":"Skipjack tuna","origin":"","category":"Tuna","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmVPMUYVooLw9XRgEWFnKZLyaZeWBM18EX7X3g6hrQBDqB","packageWeight":20,"pricePerPackage":1950,"measurementsAddress":"0x48d52a6d66bf6a3e6bdef703bac5144667ac27ef","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x460053bb2cda260c85800c2fd2a4bGHGFFGH4939ddd04a9","pricePerUnit":97.5,"quality":"High"},{"name":"Euthynnus","origin":"","category":"Tuna","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmbgwerfsGNFnfgDAhY7yscryGArn76uXNrwDv4jYaYvDk","packageWeight":5,"pricePerPackage":650,"measurementsAddress":"0xadd21078dbb3efdcd649b4174e8e1f2dbce31618","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x2be412549743a55ce846896012459a85GFJGJF089b4ae7","pricePerUnit":130,"quality":"High"},{"name":"European Anchovy","origin":"","category":"Anchovies","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmborzJi5VeSRVccFHMhfPYzXUxysSLPTEft2ijDTt3ApC","packageWeight":1,"pricePerPackage":55,"measurementsAddress":"0xae03304fbb4566250c97b4e30760ac0acdf079ed","requirementsAddress":"0xbcec05d118bd182374565d0c58e7baa90bf86a07","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0x2085c1fe9885830560c586f10f38FHFJGJKKF7bc75ed2a2a1","pricePerUnit":55,"quality":"Low"},{"name":"Engraulis","origin":"","category":"Anchovies","seller":"0x0056bd78b3c0d85e0ceb4a7634368845a21dea38","imageHash":"QmWmGgwY7EhvzwRW3Fctrx4dQ2HoFP8mGQDYVFufqasRwo","packageWeight":10,"pricePerPackage":330,"measurementsAddress":"0xa85c29d50ba3980bff07c0ed78ed256a8a2466fe","requirementsAddress":"0xe18bd8f3674b3903eeb5c0331319e12f83fb519b","validatorAddress":"0x0000000000000000000000000000000000000000","address":"0xb40c3a644b81434e676c603dd5986462b1120bb39e43","pricePerUnit":33,"quality":"High"}];

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
