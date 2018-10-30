import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

let docker = require('./dockerapi');

console.log('main.js');
console.log(docker.info());

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
