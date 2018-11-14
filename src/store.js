import Vue from 'vue';
import Vuex from 'vuex';
import http from './http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: true,
    sys_info: null,
    sys_version: null,
    sys_df: null,
    sys_events: null,
    images: null,
    containers: null,
    networks: null,
    volumes: null,
  },
  mutations: {
    SET_LOADING_STATE(state, payload) {
      // eslint-disable-next-line
      state.loading = payload
    },
    SET_SYS_INFO(state, payload) {
      // eslint-disable-next-line
      state.sys_info = payload;
    },
    SET_SYS_VERSION(state, payload) {
      // eslint-disable-next-line
      state.sys_version = payload;
    },
    SET_SYS_DF(state, payload) {
      // eslint-disable-next-line
      state.sys_df = payload;
    },
    SET_SYS_EVENTS(state, payload) {
      // eslint-disable-next-line
      state.sys_events = payload;
    },
    SET_IMAGES(state, payload) {
      // eslint-disable-next-line
      state.images = payload;
    },
    SET_CONTAINERS(state, payload) {
      // eslint-disable-next-line
      state.containers = payload;
    },
    SET_NETWORKS(state, payload) {
      // eslint-disable-next-line
      state.networks = payload;
    },
    SET_VOLUMES(state, payload) {
      // eslint-disable-next-line
      state.volumes = payload;
    },
  },
  getters: {
    getImageById: state => id => state.images.find(image => image.Id === id),
  },
  actions: {
    getSysInfo({ commit }) {
      commit('SET_LOADING_STATE', true);
      console.log(http);
      http.get('/system/info')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysInfo = ', response.data);
          commit('SET_SYS_INFO', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getSysInfo = ', error);
          return false;
        });
    },
    getSysVersion({ commit }) {
      commit('SET_LOADING_STATE', true);
      http.get('/system/version')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysVersion = ', response.data);
          commit('SET_SYS_VERSION', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getSysVersion = ', error);
          return false;
        });
    },
    getSysDf({ commit }) {
      commit('SET_LOADING_STATE', true);
      http.get('/system/df')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysDf = ', response.data);
          commit('SET_SYS_DF', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getSysDf = ', error);
          return false;
        });
    },
    getSysEvents({ commit }) {
      commit('SET_LOADING_STATE', true);
      http.get('/system/events')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysEvents = ', response.data);
          commit('SET_SYS_EVENTS', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getSysEvents = ', error);
          return false;
        });
    },
    getImages({ commit }) {
      commit('SET_LOADING_STATE', true);
      http.get('/images')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getImages = ', response.data);
          commit('SET_IMAGES', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getImages = ', error);
          return false;
        });
    },
    getContainers({ commit }) {
      commit('SET_LOADING_STATE', true);
      http.get('/containers')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getContainers = ', response.data);
          commit('SET_CONTAINERS', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getContainers = ', error);
          return false;
        });
    },
    getNetworks({ commit }) {
      commit('SET_LOADING_STATE', true);
      http.get('/networks')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getNetworks = ', response.data);
          commit('SET_NETWORKS', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getNetworks = ', error);
          return false;
        });
    },
    getVolumes({ commit }) {
      commit('SET_LOADING_STATE', true);
      http.get('/volumes')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getVolumes = ', response.data);
          commit('SET_VOLUMES', response.data);
          commit('SET_LOADING_STATE', false);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getVolumes = ', error);
          return false;
        });
    },
  },
});
