<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Images</h1>
        <md-button class="md-icon-button md-primary" v-on:click="refreshData">
            <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-top-center">
        <vue-element-loading :active="loading" color="#42b983"/>
        <div class="md-layout-item md-size-30" v-for="image in IMAGES" :key="image.id">
            <ImageCard :img='image' />
        </div>
    </div>
</div>
</template>

<style>
.md-layout {
    margin: 30px;
}

.md-layout-item {
    margin: 20px;
}
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
