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
  return key === '0xf4c738e05deaea760db1d35684959e9e5db36fdb'
    ? '0x168d401aa593b23457d77ba3a5e4d4b21920e840705f3efe9481871053fe0619'     // main account secret
    : '0xadc3782cc637b0b72e22fe539a9d047b91be3d2262c70f996ef6cdb2278bf4fd';    // additional account secret'
};

export default {
  mapToArray,
};

