<template>
  <div>
    <router-link :to="{ name: 'sign-up' }">Sign Up</router-link>
    <p>Wallet Address: {{ account }}</p>
    <button class="btnMetamask" @click="connectToMetamask">
      Connect to Metamask
    </button>
    <div>
      <button class="btnBuyLottery" :disabled="!account" @click="buyLottery">
        Buy Lottery
      </button>
    </div>
    <div>Total Reward: {{ totalReward }}</div>
  </div>
</template>

<script>
import Web3 from 'web3';
import { abi, addressSC, contractInfura } from '@/contracts/provider.js';
import { enterLottery } from '@/contracts/events.js';
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  data() {
    return {
      metamask: false,
      // account: '',
      // totalReward: 0,
    };
  },
  computed: {
    ...mapGetters({
      account: 'account/GET_ACCOUNT',
      totalReward: 'account/GET_TOTAL_REWARD',
    }),
  },
  methods: {
    async connectToMetamask() {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.account = accounts[0];
    },
    async buyLottery() {
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, addressSC);
      const tx = await contract.methods.enter().send({
        from: this.account,
        // 0,0000002 ETH
        value: 200000000000,
      });
      console.log(tx);
    },
  },
  mounted() {
    window.ethereum ? (this.metamask = true) : (this.metamask = false);

    if (this.metamask) {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      // // Create contract on Metamask
      const contractMetamask = new web3.eth.Contract(abi, addressSC);
      console.log(contractMetamask);
      window.ethereum.on('accountsChanged', (account) => {
        this.account = account[0];
      });
      console.log('Contract: ', contractInfura);
    }

    enterLottery();
  },
};
</script>

<style scoped>
.btnMetamask {
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background: aquamarine;
}
.btnBuyLottery {
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background: red;
}
</style>
