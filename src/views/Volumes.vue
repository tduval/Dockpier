<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Volumes</h1>
        <md-button class="md-icon-button md-primary" v-on:click="refreshData">
          <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div v-if="loading">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

    <div class="md-layout md-gutter md-alignment-center">
        <div v-for="volume in VOLUMES" :key="volume.id">
            <div>
                <h3>{{ volume.Name }}</h3>
                <p><strong>ID : </strong>{{ volume.Id }}</p>
                <p><strong> : </strong></p>
                <p><strong> : </strong></p>
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
