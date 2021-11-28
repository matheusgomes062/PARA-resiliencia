import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/pt-br';
import locale from 'element-ui/lib/locale';

locale.use(lang);

import {
  Collapse,
  CollapseItem,
  Button,
  Input,
  Form,
  FormItem,
  Select,
  Option,
  Checkbox,
  Dialog,
  DatePicker
} from 'element-ui';

import Loading from 'element-ui/lib/loading';
import Notification from 'element-ui/lib/notification';

export default {
  config() {
    Vue.use(Collapse);
    Vue.use(CollapseItem);
    Vue.use(Button);
    Vue.use(Input);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Checkbox);
    Vue.use(Dialog);
    Vue.use(DatePicker);
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$notify = Notification;
  }
};
