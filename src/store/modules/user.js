export default {
  state: {
    token: ''
  },
  getters: {

  },
  mutations: {
    RESET_USER_TOKEN: (state) => {
      state.token = '';
    },
    SET_USER_TOKEN: (state, payload) => {
      state.token = payload;
    }
  },
  actions: {
    loginUser: ({ commit }, payload) => {
      commit('RESET_USER_TOKEN');
      commit('SET_USER_TOKEN', payload);
      localStorage.removeItem('token');
      localStorage.clear();
      localStorage.setItem('token', payload);
    },
    logoutUser: ({ commit }) => {
      commit('RESET_USER_TOKEN');
      localStorage.removeItem('token');
      localStorage.clear();
    }
  }
};
