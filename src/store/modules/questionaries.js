export default {
  state: {
    questionaries: [],
    selectedQuestionary: []
  },
  getters: {
    getQuestionaries: (state) => {
      return state.questionaries;
    },
    getSelectedQuestionary: (state) => {
      return state.selectedQuestionary;
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
    }
  },
  actions: {
    setAllQuestionaries: ({ commit }, payload) => {
      commit('SET_ALL_QUESTIONARIES', payload);
    },
    setSelectedQuestionary: ({ commit }, payload) => {
      commit('SET_SELECTED_QUESTIONARY');
    },
    resetSelectedQuestionary: ({ commit }) => {
      commit('RESET_SELECTED_QUESTIONARY');
    }
  }
};
