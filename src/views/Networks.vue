<template>
<div>
    <v-layout row justify-center>
        <h1>Networks</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>
    <v-layout row justify-center>
        <span class="text-xs-center grey--text">
        {{ NETWORKS.length }} {{ NETWORKS.length | pluralize('Network') }} currently exists
        </span>
    </v-layout>

    <v-container fluid grid-list-xl>
        <v-layout row justify-space-around wrap>
            <vue-element-loading :active="loading" color="#42b983"/>

            <v-flex v-for="network in NETWORKS" :key="network.id">
                <NetworkCard :net='network' />
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<style>
</style>

<script>
import NetworkCard from '@/components/NetworkCard.vue';

export default {
  name: 'networks',
  components: {
    NetworkCard,
  },
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
    NETWORKS_ARRAY() {
      return Object.entries(this.NETWORKS).map(value => (value));
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
