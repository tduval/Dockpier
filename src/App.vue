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
                <v-btn flat to="/swarm">Swarm</v-btn>
                <v-btn flat to="/about">About</v-btn>
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
};
</script>
