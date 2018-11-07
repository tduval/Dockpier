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
                <v-btn flat to="/">Home</v-btn>
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
export default {
  data: () => ({
    drawer: false,
  }),
  created() {
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
