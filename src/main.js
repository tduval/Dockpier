import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
console.log(docker.info());
