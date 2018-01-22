const mapToArray = (object) => {
  let result = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(object[key]);
    }
  }

  return result;
};

export const getStringForSign = body => JSON.stringify(body).toLowerCase();

export const getSignature = (address, string) => {
  if (!address || !string) return 'wrongData';
  return new Promise (function (resolve, reject) {
    web3.eth.sign(address, web3.sha3(string), function (error, result) {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

export default {
  mapToArray,
};
