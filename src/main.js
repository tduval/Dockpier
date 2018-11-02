import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueElementLoading from 'vue-element-loading';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueMaterial);
Vue.use(Vuetify);
Vue.component('VueElementLoading', VueElementLoading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
