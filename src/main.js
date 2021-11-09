import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vuelidate from 'vuelidate';
import VueToastify from 'vue-toastify';
import VueTheMask from 'vue-the-mask';

import { BootstrapVue } from 'bootstrap-vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

import ElementConfig from './element-config';

ElementConfig.config();

Vue.use(VueTheMask);
Vue.use(vuelidate);
Vue.use(VueToastify, {
  canTimeout: true,
  duration: 2000,
  hideProgressbar: true,
  theme: 'light'
});

Vue.config.productionTip = false;

Vue.directive('clickOutside', {
  bind(el, binding) {
    el.__ClickOutsideHandler__ = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('click', el.__ClickOutsideHandler__);
  },
  unbind(el) {
    document.body.removeEventListener('click', el.__ClickOutsideHandler__);
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
