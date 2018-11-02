<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Networks</h1>
        <md-button class="md-icon-button md-primary" v-on:click="refreshData">
            <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-top-center">
        <vue-element-loading :active="loading" color="#42b983"/>
        <div class="md-layout-item md-size-30" v-for="network in NETWORKS" :key="network.id">
            <div>
                <h3>{{ network.Name }}</h3>
                <p><strong>ID : </strong>{{ network.Id }}</p>
                <p><strong>Scope : </strong>{{ network.Scope }}</p>
                <p><strong>Driver : </strong>{{ network.Driver }}</p>
                <md-table md-card style="text-align: left;">
                    <md-table-toolbar>
                        <h1 class="md-title">Network Details</h1>
                    </md-table-toolbar>
                    <md-table-row>
                        <md-table-head>Key</md-table-head>
                        <md-table-head>Value</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(value, key) in network" :key="key.id">
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
  name: 'networks',
  mounted() {
    this.refreshData();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    NETWORKS() {
      return this.$store.state.networks;
    },
  },
  methods: {
    refreshData() {
      this.$store.commit('SET_LOADING_STATE', true);
      this.$store.dispatch('getNetworks');
    },
  },
};
</script>
