<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Containers</h1>
        <md-button class="md-icon-button md-primary" v-on:click="getContainersList">
            <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-alignment-center">
        <div v-if="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div class="md-layout-item" v-for="container in containers" :key="container.id">
            <div>
                <h3>{{ container.Name }}</h3>
                <p><strong>ID : </strong>{{ container.Id }}</p>
                <p><strong>Image : </strong>{{ container.Image }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<style>
</style>

<script>
import axios from 'axios';

export default {
  name: 'containers',
  data() {
    return {
      containers: [],
      loading: false,
    };
  },
  methods: {
    getContainersList() {
      this.loading = true;
      axios.get('http://192.168.255.200:5000/containers')
        .then((response) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log(response.data);
          this.containers = response.data;
        }, (error) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log('Error Axios : ', error);
        });
    },
  },
};
</script>
