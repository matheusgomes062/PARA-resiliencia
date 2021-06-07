import Vue from 'vue';
import Vuex from 'vuex';
import Dashboard from './modules/dashboard.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dashboard: Dashboard
  }
});
