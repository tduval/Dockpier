<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Containers</h1>
        <md-button class="md-icon-button md-primary" v-on:click="refreshData">
            <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div v-if="loading">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </div>

    <div class="md-layout md-alignment-center">
        <div class="md-layout-item" v-for="container in CONTAINERS" :key="container.id">
            <div>
                <h3>{{ container.Name }}</h3>
                <p><strong>ID : </strong>{{ container.Id }}</p>
                <p><strong>Image : </strong>{{ container.Image }}</p>
                <p><strong>Image Name : </strong>
                    {{ $store.getters.getImageById(container.Image).RepoTags[0] }}
                </p>
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
