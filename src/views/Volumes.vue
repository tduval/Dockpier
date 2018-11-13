<template>
<div>
    <v-layout row justify-center>
        <v-avatar color="teal" size="36">
            <span class="white--text headline">{{ VOLUMES.length }}</span>
        </v-avatar>
        <h1 class="ml-2">Volumes</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>

    <v-container fluid grid-list-xl>
        <v-layout row justify-space-around wrap>
            <vue-element-loading :active="loading" color="#42b983"/>

            <v-flex v-for="volume in VOLUMES" :key="volume.id" xs3>
                <VolumeCard :vol='volume' />
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<style>
</style>

<script>
import VolumeCard from '@/components/VolumeCard.vue';

export default {
  name: 'volumes',
  components: {
    VolumeCard,
  },
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
