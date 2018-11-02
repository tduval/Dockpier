<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Containers</h1>
        <md-button class="md-icon-button md-primary" v-on:click="refreshData">
            <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-top-center">
        <vue-element-loading :active="loading" color="#42b983"/>

        <div class="md-layout-item md-size-30" v-for="container in CONTAINERS" :key="container.id">
            <div>
                <h3>{{ container.Name }}</h3>
                <p><strong>ID : </strong>{{ container.Id }}</p>
                <p><strong>Image : </strong>{{ container.Image }}</p>
                <p><strong>Image Name : </strong>
                    {{ $store.getters.getImageById(container.Image).RepoTags[0] }}
                </p>
                <md-table md-card style="text-align: left;">
                    <md-table-toolbar>
                        <h1 class="md-title">Container Details</h1>
                    </md-table-toolbar>
                    <md-table-row>
                        <md-table-head>Key</md-table-head>
                        <md-table-head>Value</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(value, key) in container" :key="key.id">
                        <md-table-cell><strong>{{ key }}</strong></md-table-cell>
                        <md-table-cell><span class="md-caption">{{ value }}</span></md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
        </div>
    </div>
</div>
</template>

<style>
</style>

<script>

export default {
  name: 'containers',
  mounted() {
    this.refreshData();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    CONTAINERS() {
      return this.$store.state.containers;
    },
  },
  methods: {
    refreshData() {
      this.$store.commit('SET_LOADING_STATE', true);
      this.$store.dispatch('getContainers');
    },
  },
};
</script>
