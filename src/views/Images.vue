<template>
<div>
    <v-layout row justify-center>
        <v-flex xs5>
        </v-flex>
        <v-avatar color="teal" size="36">
            <span class="white--text headline">{{ IMAGES.length }}</span>
        </v-avatar>
        <h1 class="ml-2">Images</h1>
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

            <v-flex v-for="image in IMAGES" :key="image.id" xs3>
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
    IMAGES() {
      if (this.searchValue) {
        return this.$store.state.images.filter(i =>
          i.RepoTags.toString().includes(this.searchValue.toString().toLowerCase()));
      }
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
