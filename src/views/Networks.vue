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

    <v-layout row justify-space-around wrap>
        <vue-element-loading :active="loading" color="#42b983"/>

        <v-flex v-for="(network, index) in NETWORKS" :key="network.id" xs3>
            <h2>{{ network.Name }}</h2>
            <p><strong>ID : </strong>{{ network.Id }}</p>
            <p><strong>Scope : </strong>{{ network.Scope }}</p>
            <p><strong>Driver : </strong>{{ network.Driver }}</p>
            <v-data-table
                :items="(Object.entries(NETWORKS_ARRAY[index][1]).map(value => (value)))"
                hide-headers hide-actions>
                <template slot="items" slot-scope="props">
                    <td><strong>{{ props.item[0] }}</strong></td>
                    <td class="text-xs-left"><code>{{ props.item[1] }}</code></td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
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
