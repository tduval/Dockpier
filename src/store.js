import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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
      // eslint-disable-next-line
      console.log('LOADING = '+payload);
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
  actions: {
    getSysInfo({ commit }) {
      // commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/system/info')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysInfo = '+response.data);
          commit('SET_SYS_INFO', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getSysInfo = ', error);
          return false;
        });
      // commit('SET_LOADING_STATE', false);
    },
    getSysVersion({ commit }) {
      // commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/system/version')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysVersion = '+response.data);
          commit('SET_SYS_VERSION', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getSysVersion = ', error);
          return false;
        });
      // commit('SET_LOADING_STATE', false);
    },
    getSysDf({ commit }) {
      // commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/system/df')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysDf = '+response.data);
          commit('SET_SYS_DF', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getSysDf = ', error);
          return false;
        });
      // commit('SET_LOADING_STATE', false);
    },
    getSysEvents({ commit }) {
      commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/system/events')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysEvents = '+response.data);
          commit('SET_SYS_EVENTS', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getSysEvents = ', error);
          return false;
        });
      commit('SET_LOADING_STATE', false);
    },
    getImages({ commit }) {
      commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/images')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getImages = '+response.data);
          commit('SET_IMAGES', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getImages = ', error);
          return false;
        });
      commit('SET_LOADING_STATE', false);
    },
    getContainers({ commit }) {
      commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/containers')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getContainers = '+response.data);
          commit('SET_CONTAINERS', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getContainers = ', error);
          return false;
        });
      commit('SET_LOADING_STATE', false);
    },
    getNetworks({ commit }) {
      commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/networks')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getNetworks = '+response.data);
          commit('SET_NETWORKS', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getNetworks = ', error);
          return false;
        });
      commit('SET_LOADING_STATE', false);
    },
    getVolumes({ commit }) {
      commit('SET_LOADING_STATE', true);
      axios.get('http://192.168.255.200:5000/volumes')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getVolumes = '+response.data);
          commit('SET_VOLUMES', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.log('Error getVolumes = ', error);
          return false;
        });
      commit('SET_LOADING_STATE', false);
    },
  },
});
