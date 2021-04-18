import Vue from 'vue';
import Vuex from 'vuex';
import Plans from './modules/plans';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    plans: Plans
  }
});
