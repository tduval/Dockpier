import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Containers from './views/Containers.vue';
import Images from './views/Images.vue';
import Networks from './views/Networks.vue';
import Volumes from './views/Volumes.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/containers',
      name: 'containers',
      component: Containers,
    },
    {
      path: '/images',
      name: 'images',
      component: Images,
    },
    {
      path: '/networks',
      name: 'networks',
      component: Networks,
    },
    {
      path: '/volumes',
      name: 'volumes',
      component: Volumes,
    },
  ],
});
