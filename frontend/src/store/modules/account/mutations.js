const mutations = {
  MUTATE_SET_ACCOUNT: (state, account) => {
    state.account = account;
  },
  MUTATE_SET_TOTAL_REWARD: (state, totalReward) => {
    state.totalReward = totalReward;
  },
  MUTATE_SET_WINNER: (state, winner) => {
    state.winner = winner;
  },
};

export default mutations;
