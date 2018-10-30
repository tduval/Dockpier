import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Containers from './views/Containers.vue';
import Images from './views/Images.vue';
import Networks from './views/Networks.vue';
import Swarm from './views/Swarm.vue';

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
      path: '/swarm',
      name: 'swarm',
      component: Swarm,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
