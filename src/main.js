import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueElementLoading from 'vue-element-loading';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.component('VueElementLoading', VueElementLoading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
