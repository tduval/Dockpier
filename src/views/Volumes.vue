<template>
<div>
    <v-layout row justify-center>
        <h1>Volumes</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>

    <v-layout row justify-space-around>
        <vue-element-loading :active="loading" color="#42b983"/>

        <v-flex v-for="(volume, index) in VOLUMES" :key="volume.id" xs3>
            <h2>{{ volume.Name }}</h2>
            <p><strong>Scope : </strong>{{ volume.Scope }}</p>
            <p><strong>Driver : </strong>{{ volume.Driver }}</p>
            <v-data-table
                :items="(Object.entries(VOLUMES_ARRAY[index][1]).map(value => (value)))"
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
    VOLUMES_ARRAY() {
      return Object.entries(this.VOLUMES).map(value => (value));
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
