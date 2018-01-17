const mapToArray = (object) => {
  let result = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(object[key]);
    }
  }

  return result;
};

export const getSignature = async (address, string) => {
  if (!address || !string) return 'wrongData';
  const signature = await web3.eth.sign(address, web3.sha3(string), (err, res) => res || err);
  return signature ? signature : 'wrongData';
};

export default {
  mapToArray,
};
