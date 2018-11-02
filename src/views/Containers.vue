<template>
<div>
    <v-layout row justify-center>
        <h1>Containers</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>

    <v-layout row justify-space-around>
        <vue-element-loading :active="loading" color="#42b983"/>

        <v-flex v-for="(container, index) in CONTAINERS" :key="container.id" xs3>
            <h2>{{ container.Name }}</h2>
            <p><strong>ID : </strong>{{ container.Id }}</p>
            <p><strong>Image : </strong>{{ container.Image }}</p>
            <p><strong>Image Name : </strong>
                {{ $store.getters.getImageById(container.Image).RepoTags[0] }}
            </p>
            <v-data-table
                :items="(Object.entries(CONTAINERS_ARRAY[index][1]).map(value => (value)))"
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
    CONTAINERS_ARRAY() {
      return Object.entries(this.CONTAINERS).map(value => (value));
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
