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
                <v-btn flat to="/containers">Containers</v-btn>
                <v-btn flat to="/images">Images</v-btn>
                <v-btn flat to="/networks">Networks</v-btn>
                <v-btn flat to="/volumes">Volumes</v-btn>
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
};
</script>
