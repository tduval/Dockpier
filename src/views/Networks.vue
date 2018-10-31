<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Networks</h1>
        <md-button class="md-icon-button md-primary" v-on:click="getNetworksList">
          <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-center">
        <div v-if="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div v-for="network in networks" :key="network.id">
            <div>
                <h3>{{ network.Name }}</h3>
                <p><strong>ID : </strong>{{ network.Id }}</p>
                <p><strong>Scope : </strong>{{ network.Scope }}</p>
                <p><strong>Drive : </strong>{{ network.Driver }}</p>
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
  name: 'networks',
  data() {
    return {
      networks: [],
      loading: false,
    };
  },
  methods: {
    getNetworksList() {
      this.loading = true;
      axios.get('http://192.168.255.200:5000/networks')
        .then((response) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log(response.data);
          this.networks = response.data;
        }, (error) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log('Error Axios : ', error);
        });
    },
  },
};
</script>
