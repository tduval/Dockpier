<template>
<div>
    <v-layout row justify-center>
        <h1>Images</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>

    <v-container fluid grid-list-xl>
        <v-layout row justify-space-around wrap>
            <vue-element-loading :active="loading" color="#42b983"/>

            <v-flex v-for="image in IMAGES" :key="image.id">
                <ImageCard :img='image' />
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<style>
</style>

<script>
import ImageCard from '@/components/ImageCard.vue';

export default {
  name: 'images',
  components: {
    ImageCard,
  },
  mounted() {
    this.refreshData();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    IMAGES() {
      return this.$store.state.images;
    },
  },
  methods: {
    refreshData() {
      this.$store.commit('SET_LOADING_STATE', true);
      this.$store.dispatch('getImages');
    },
  },
};
</script>
