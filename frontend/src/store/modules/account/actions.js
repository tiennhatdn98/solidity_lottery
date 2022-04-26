const actions = {
  ACT_SIGN_IN: ({ commit }, payload) => {
    const account = payload.account;
    commit('MUTATE_SET_ACCOUNT', account);
  },
};

export default actions;
