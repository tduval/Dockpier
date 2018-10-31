<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Images</h1>
        <md-button class="md-icon-button md-primary" v-on:click="getImagesList">
            <md-icon>cached</md-icon>
         </md-button>
    </div>

    <div class="md-layout md-alignment-center">
        <div v-if="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div class="md-layout-item" v-for="image in images" :key="image.id">
            <ImageCard :img='image' />
        </div>
    </div>
    <md-snackbar :md-active.sync="showSnackbar">
        <span>
            <md-icon class="md-accent">error_outline</md-icon>
            {{ errorSnackbar }} -
            Please verify your configuration and retry the operation.
        </span>
    </md-snackbar>
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
import axios from 'axios';
import ImageCard from '@/components/ImageCard.vue';

export default {
  name: 'images',
  components: {
    ImageCard,
  },
  data() {
    return {
      images: [],
      loading: false,
      showSnackbar: false,
      errorSnackbar: null,
    };
  },
  methods: {
    getImagesList() {
      this.loading = true;
      axios.get('http://192.168.255.200:5000/images')
        .then((response) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log(response.data);
          this.images = response.data;
        }, (error) => {
          this.loading = false;
          this.showSnackbar = true;
          // eslint-disable-next-line
          console.log('Error Axios : ', error);
          this.errorSnackbar = error.message;
        });
    },
  },
};
</script>
