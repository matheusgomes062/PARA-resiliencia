export default {
    state: {
      notices: null,
      noticeId: null
    },
    getters: {
      getNotices: (state) => {
        return state.notices;
      },
      getNoticeId: (state) => {
        return state.noticeId;
      }
    },
    mutations: {
      SET_NOTICES: (state, payload) => {
        state.notices = payload
      },
      SET_NOTICE_ID: (state, payload) => {
        state.noticeId = payload
      }
    },
    actions: {
      setNotices: ({ commit }, payload) => {
          commit('SET_NOTICES', payload)
      },
      setNoticeId: ({ commit }, payload) => {
        commit('SET_NOTICE_ID', payload)
      }
    }
};
  