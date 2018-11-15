import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueElementLoading from 'vue-element-loading';
import Vue2Filters from 'vue2-filters';
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.component('VueElementLoading', VueElementLoading);
Vue.use(Vue2Filters);
Vue.use(vueNumeralFilterInstaller);
Vue.use(require('vue-moment-jalaali'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
