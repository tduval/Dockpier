<template>
<div id="app">
    <v-app>

        <v-navigation-drawer v-model="drawer" clipped fixed app>
        </v-navigation-drawer>

        <v-toolbar clipped-left fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-avatar>
                <img src="/logo/icons8-docker-filled-50.svg">
            </v-avatar>

            <v-toolbar-title>Dockpier</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn flat to="/home">Home</v-btn>
                <v-btn flat to="/containers">
                    <v-badge color="teal">
                      <span slot="badge" small>{{ CONTAINERS.length }}</span>
                      <span>Containers</span>
                    </v-badge>
                </v-btn>
                <v-btn flat to="/images">
                    <v-badge color="teal">
                      <span slot="badge" small>{{ IMAGES.length }}</span>
                      <span>Images</span>
                    </v-badge>
                </v-btn>
                <v-btn flat to="/networks">
                    <v-badge color="teal">
                      <span slot="badge" small>{{ NETWORKS.length }}</span>
                      <span>Networks</span>
                    </v-badge>
                </v-btn>
                <v-btn flat to="/volumes">
                    <v-badge color="teal">
                      <span slot="badge" small>{{ VOLUMES.length }}</span>
                      <span>Volumes</span>
                    </v-badge>
                </v-btn>
                <v-btn flat icon href="https://github.com/tduval/Dockpier" target="_blank" >
                  <img src="/logo/github-circle.svg" />
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>
        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</div>
</template>

<style>
</style>

<script>
import http from './http';

export default {
  data: () => ({
    drawer: false,
    hostname: window.location.hostname,
  }),
  created() {
    http.defaults.baseURL = (process.env.VUE_APP_API_BASE_HOST) ? http.defaults.baseURL : `http://${window.location.hostname}:5000`;
    // eslint-disable-next-line
    console.log(http.defaults.baseURL);
    this.$store.commit('SET_LOADING_STATE', true);
    this.$store.dispatch('getSysInfo');
    this.$store.dispatch('getSysVersion');
    this.$store.dispatch('getSysDf');
    // this.$store.dispatch('getSysEvents');
    this.$store.dispatch('getImages');
    this.$store.dispatch('getNetworks');
    this.$store.dispatch('getVolumes');
    this.$store.dispatch('getContainers');
  },
  computed: {
    CONTAINERS() {
      return this.$store.state.containers;
    },
    IMAGES() {
      return this.$store.state.images;
    },
    NETWORKS() {
      return this.$store.state.networks;
    },
    VOLUMES() {
      return this.$store.state.volumes;
    },
  },
};
</script>
