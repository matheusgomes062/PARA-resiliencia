import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';

import { Collapse, CollapseItem, Button } from 'element-ui';

import Loading from 'element-ui/lib/loading';
import Notification from 'element-ui/lib/notification';

export default {
  config() {
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Button);

    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$notify = Notification;
  }
};
