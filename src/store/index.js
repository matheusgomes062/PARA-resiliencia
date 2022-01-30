import Vue from 'vue';
import Vuex from 'vuex';
import Dashboard from './modules/dashboard.js';
import User from './modules/user';
import Questionaries from './modules/questionaries';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dashboard: Dashboard,
    user: User,
    questionaries: Questionaries
  }
});
