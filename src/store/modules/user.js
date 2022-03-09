export default {
  state: {
    token: '',
    fullscreenLoading: false,
    userInfo: {}
  },
  getters: {
    getUserInfo: (state) => state.userInfo,
    getToken: (state) => state.token
  },
  mutations: {
    RESET_USER_TOKEN: (state) => {
      state.token = '';
    },
    SET_USER_TOKEN: (state, payload) => {
      state.token = payload;
    },
    SET_FULLSCREEN_LOADING: (state, payload) => {
      state.fullscreenLoading = payload;
    },
    RESET_USER_INFO: (state) => {
      state.userInfo = {};
    },
    SET_USER_INFO: (state, payload) => {
      state.userInfo = payload;
    },
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
      localStorage.removeItem('userInfo');
      localStorage.clear();
    },
    setFullscreenLoading: ({ commit }, payload) => {
      commit('SET_FULLSCREEN_LOADING', payload);
    },
    setUserInfo: ({commit}, payload) => {
      commit('RESET_USER_INFO');
      commit('SET_USER_INFO', payload);
    }
  }
};
