export default {
  state: {
    plans: {}
  },
  getters: {
    token(state) {
      return state.token;
    },
    plans(state) {
      return state.plans;
    }
  },
  mutations: {
    SET_STATE_PLANS: (state, payload) => {
      state.plans = payload;
    }
  },
  actions: {
    setPlans(context, payload) {
      context.commit('SET_STATE_PLANS', payload);
    }
  }
};
