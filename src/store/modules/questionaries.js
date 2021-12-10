export default {
  state: {
    questionaries: [],
    noticesQuestionaries: [],
    selectedQuestionary: null
  },
  getters: {
    getQuestionaries: (state) => {
      return state.questionaries;
    },
    getSelectedQuestionary: (state) => {
      return state.selectedQuestionary;
    },
    getNoticesQuestionaries: (state) => {
      return state.noticesQuestionaries;
    }
  },
  mutations: {
    SET_ALL_QUESTIONARIES: (state, payload) => {
      state.questionaries = payload;
    },
    SET_SELECTED_QUESTIONARY: (state, payload) => {
      state.selectedQuestionary = payload;
    },
    RESET_SELECTED_QUESTIONARY: (state) => {
      state.selectedQuestionary = [];
    },
    SET_NOTICE_QUESTIONARY: (state, payload) => {
      state.noticesQuestionaries = payload;
    },
    RESET_NOTICE_QUESTIONARY: (state) => {
      state.noticesQuestionaries = [];
    }
  },
  actions: {
    setAllQuestionaries: ({ commit }, payload) => {
      commit('SET_ALL_QUESTIONARIES', payload);
    },
    setSelectedQuestionary: ({ commit }, payload) => {
      commit('SET_SELECTED_QUESTIONARY', payload);
    },
    resetSelectedQuestionary: ({ commit }) => {
      commit('RESET_SELECTED_QUESTIONARY');
    },
    setNoticeQuestionary: ({ commit }, payload) => {
      commit('SET_NOTICE_QUESTIONARY', payload);
    },
    resetNoticeQuestionary: ({ commit }) => {
      commit('RESET_NOTICE_QUESTIONARY');
    }
  }
};
