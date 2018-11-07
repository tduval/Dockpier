<template>
<div>
    <v-layout row justify-center>
        <h1>Containers</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>
    <v-layout row justify-center>
        <span class="text-xs-center grey--text">
        {{ CONTAINERS.length }} {{ CONTAINERS.length | pluralize('Container') }} currently exists
        </span>
    </v-layout>

    <v-container fluid grid-list-xl>
        <v-layout row justify-space-around wrap>
            <vue-element-loading :active="loading" color="#42b983"/>

            <v-flex v-for="container in CONTAINERS" :key="container.id">
                <ContainerCard :cntr='container' />
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<style>
</style>

<script>
import ContainerCard from '@/components/ContainerCard.vue';

export default {
  name: 'containers',
  components: {
    ContainerCard,
  },
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
