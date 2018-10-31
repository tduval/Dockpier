<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Info</h1>
        <md-button class="md-icon-button md-primary" v-on:click="getAll">
          <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-top-center">

        <md-empty-state v-if="version == null && info == null"
            md-rounded
            md-icon="cached"
            md-label="No data retrieved"
            md-description="Refresh the data to get the latest information.">
         </md-empty-state>

        <div v-if="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <div v-if="version" class="md-layout-item md-size-30">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">Docker Version</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>Key</md-table-head>
                    <md-table-head>Value</md-table-head>
                </md-table-row>
                <md-table-row v-for="(value, key) in version" :key="key.id">
                    <md-table-cell><strong>{{ key }}</strong></md-table-cell>
                    <md-table-cell><span class="md-caption">{{ value }}</span></md-table-cell>
                </md-table-row>
            </md-table>
        </div>

        <div v-if="info" class="md-layout-item md-size-30">
            <md-table md-card>
                <md-table-toolbar>
                    <h1 class="md-title">Docker Engine Info</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>Key</md-table-head>
                    <md-table-head>Value</md-table-head>
                </md-table-row>
                <md-table-row v-for="(value, key) in info" :key="key.id">
                    <md-table-cell><strong>{{ key }}</strong></md-table-cell>
                    <md-table-cell><span class="md-caption">{{ value }}</span></md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</div>
</template>

<style>
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      info: null,
      version: null,
      loading: false,
    };
  },
  methods: {
    getAll() {
      this.loading = true;
      this.getVersion();
      this.getInfo();
    },
    getVersion() {
      this.loading = true;
      axios.get('http://192.168.255.200:5000/version')
        .then((response) => {
          this.loading = false;
          // eslint-disable-next-line
        console.log(response.data);
          this.version = response.data;
        }, (error) => {
          this.loading = false;
          // eslint-disable-next-line
        console.log('Error Axios : ', error);
        });
    },
    getInfo() {
      this.loading = true;
      axios.get('http://192.168.255.200:5000/info')
        .then((response) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log(response.data);
          this.info = response.data;
        }, (error) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log('Error Axios : ', error);
        });
    },
  },
};
</script>
