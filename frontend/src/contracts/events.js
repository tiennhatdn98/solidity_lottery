import Web3 from 'web3';
import { webSocketInfura } from './provider';
import { abi, addressSC } from './token';
import store from '@/store';

const provider = new Web3.providers.WebsocketProvider(webSocketInfura);
const web3Infura = new Web3(provider);
const contractInfura = new web3Infura.eth.Contract(abi, addressSC);
console.log(contractInfura);

const enterLottery = () => {
  contractInfura.events.Enter(
    { filter: {}, fromBlock: 'latest' },
    function (error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log('Data: ', data);
        store.commit('MUTATE_SET_TOTAL_REWARD', data.returnValues);
      }
    }
  );
};

export { enterLottery };
