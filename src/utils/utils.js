const mapToArray = (object) => {
  let result = [];
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(object[key]);
    }
  }

  return result;
};

export const getSignature = async (address, message) => {
  return address && message
    ? await web3.eth_sign(address, web3.sha3(message))
    : message;
};

export default {
  mapToArray,
};
