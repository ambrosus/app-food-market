import abi from './abi.json';
import { CONTRACT_ADDRESS } from './../constants';

class ContractClient {
  async init() {
    const MyContract = web3.eth.contract(abi);
    this.contract = await MyContract.at(CONTRACT_ADDRESS);
  }

  getInstance() {
    const { contract } = this;
    if (!contract) return;
    return contract;
  }

  run(name, ...args) {
    return new Promise((resolve, reject) => {
      this.contract[name](...args, (err, res) => {
        if (!err) resolve(res);
        else reject(err);
      });
    });
  }
}

const singleton = new ContractClient();

export default singleton;
