<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Networks</h1>
        <md-button class="md-icon-button md-primary" v-on:click="refreshData">
          <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-center">
        <div v-if="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-for="network in NETWORKS" :key="network.id">
            <div>
                <h3>{{ network.Name }}</h3>
                <p><strong>ID : </strong>{{ network.Id }}</p>
                <p><strong>Scope : </strong>{{ network.Scope }}</p>
                <p><strong>Drive : </strong>{{ network.Driver }}</p>
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
      this.$store.commit('SET_LOADING_STATE', false);
    },
  },
};
</script>
