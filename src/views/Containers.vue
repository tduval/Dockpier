<template>
<div>
    <v-layout row justify-center>
        <v-flex xs5>
        </v-flex>
        <v-avatar color="teal" size="36">
            <span class="white--text headline">{{ CONTAINERS.length }}</span>
        </v-avatar>
        <h1 class="ml-2">Containers</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-flex xs3>
            <v-text-field placeholder="Search..." append-icon="search"
            single-line clearable v-model="searchValue">
            </v-text-field>
        </v-flex>
    </v-layout>

    <v-container fluid grid-list-xl>
        <v-layout row justify-space-around wrap>
            <vue-element-loading :active="loading" color="#42b983"/>

            <v-flex v-for="container in CONTAINERS" :key="container.id" xs3>
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
  data() {
    return {
      searchValue: '',
    };
  },
  mounted() {
    this.refreshData();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    CONTAINERS() {
      if (this.searchValue) {
        return this.$store.state.containers.filter(c =>
          c.Name.toString().includes(this.searchValue.toString().toLowerCase()));
      }
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
