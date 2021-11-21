export default {
    state: {
      notices: null
    },
    getters: {
      getNotices: (state) => {
        return state.notices;
      }
    },
    mutations: {
      SET_NOTICES: (state, payload) => {
        state.notices = payload
      }
    },
    actions: {
      setNotices: ({ commit }, payload) => {
          commit('SET_NOTICES', payload)
      }
    }
};
  