<template>
<div>
    <v-layout row justify-center>
        <h1>Enter the IP address of the Docker Engine Host</h1>
    </v-layout>

    <v-layout row justify-center>
        <v-form ref="form">
            <v-text-field v-model="host_input" label="IP Address" required>
            </v-text-field>

            <v-btn @click="submit">
                submit
            </v-btn>
        </v-form>
    </v-layout>
</div>
</template>

<style>
</style>

<script>
import http from '@/http';

export default {
  name: 'home',
  data() {
    return {
      host_input: null,
    };
  },
  methods: {
    submit() {
      // eslint-disable-next-line
      console.log('Default config = ', http.defaults);
      http.defaults.baseURL = `http://${this.host_input}:5000`;
      // eslint-disable-next-line
      console.log('New config = ', http.defaults);
      http.get('/system/info')
        .then((response) => {
          // eslint-disable-next-line
          console.log('getSysInfo = ', response.data);
          return true;
        }, (error) => {
          // eslint-disable-next-line
          console.error('Error getSysInfo = ', error);
          return false;
        });
    },
  },
};
</script>
