export default {
  state: {
    whereTo: 'Dashboard'
  },
  getters: {
    getWhereTo: (state) => {
      return state.whereTo;
    }
  },
  mutations: {
    SET_WHERE_TO: (state, payload) => {
      state.whereTo = payload;
    },
    RESET_WHERE_TO: (state) => {
      state.whereTo = null;
    }
  },
  actions: {
    setWhereTo: ({ commit }, payload) => {
      commit('SET_WHERE_TO', payload);
    },
    resetWhereTo: ({ commit }) => {
      commit('RESET_WHERE_TO');
    }
  }
};
