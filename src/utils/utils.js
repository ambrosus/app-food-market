import stringify from 'json-stable-stringify';

const mapToArray = (object) => {
  let result = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(object[key]);
    }
  }

  return result;
};

export const getStringForSign = body => stringify(body, { space: '' });

export const getSignature = (address, string) => {
  if (!address || !string) return 'wrongData';
  return new Promise(function (resolve, reject) {
    web3.eth.sign(address, web3.sha3(string), function (error, result) {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

export function promisify(context, method, ...args) {
  return new Promise((resolve, reject) => {
    context[method](...args, (err, res) => {
      if (err) reject(null);
      else resolve(res);
    });
  });
};

// temporary method
export function getSecret(key) {
  return key === '0xc2465857254404ff1e4edb4d9086b8d72e2fda32'
    ? '0x802febcc49da6ea66dc3e6ad3594b49e3d390b2447a2dd5eae78cb5009fc968a'     // seller account secret
    : '0x91c3aaa38251c1908b45605f3b749442fdf8a4655f902699bcb066205462ab25';    // customer account secret'
};

export default {
  mapToArray,
};

