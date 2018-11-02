<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Volumes</h1>
        <md-button class="md-icon-button md-primary" v-on:click="refreshData">
            <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-top-center">
        <vue-element-loading :active="loading" color="#42b983"/>
        <div v-for="volume in VOLUMES" :key="volume.id">
            <div>
                <h3>{{ volume.Name }}</h3>
                <p><strong>Scope : </strong>{{ volume.Scope }}</p>
                <p><strong>Driver : </strong>{{ volume.Driver }}</p>
                <md-table md-card style="text-align: left;">
                    <md-table-toolbar>
                        <h1 class="md-title">Volume Details</h1>
                    </md-table-toolbar>
                    <md-table-row>
                        <md-table-head>Key</md-table-head>
                        <md-table-head>Value</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(value, key) in volume" :key="key.id">
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
  name: 'volumes',
  mounted() {
    this.refreshData();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    VOLUMES() {
      return this.$store.state.volumes;
    },
  },
  methods: {
    refreshData() {
      this.$store.commit('SET_LOADING_STATE', true);
      this.$store.dispatch('getVolumes');
    },
  },
};
</script>
