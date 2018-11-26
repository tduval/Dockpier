<template>
<div>
    <v-layout row justify-center>
        <h1>System</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>

    <v-layout row justify-space-around wrap>
        <vue-element-loading :active="loading" color="#42b983"/>

        <v-flex v-if="SYS_VERSION" xs3>
            <h2 class="text-md-center">Docker Version</h2>
            <v-data-table :items="SYS_VERSION_ARRAY" hide-headers hide-actions>
                <template slot="items" slot-scope="props">
                    <td><strong>{{ props.item[0] }}</strong></td>
                    <td class="text-xs-left"><code>{{ props.item[1] }}</code></td>
                </template>
            </v-data-table>
        </v-flex>

        <v-flex v-if="SYS_DF" xs3>
            <h2 class="text-md-center">Docker Stats</h2>
            <v-data-table :items="SYS_DF_ARRAY" hide-headers hide-actions>
                <template slot="items" slot-scope="props">
                    <td><strong>{{ props.item[0] }}</strong></td>
                    <td class="text-xs-left"><code>{{ props.item[1] }}</code></td>
                </template>
            </v-data-table>
        </v-flex>

        <v-flex v-if="SYS_INFO" ma-2 xs3>
            <h2 class="text-md-center">Docker Info</h2>
            <v-data-table :items="SYS_INFO_ARRAY" hide-headers hide-actions>
                <template slot="items" slot-scope="props">
                    <td><strong>{{ props.item[0] }}</strong></td>
                    <td class="text-xs-left"><code>{{ props.item[1] }}</code></td>
                </template>
            </v-data-table>
        </v-flex>

    </v-layout>
</div>
</template>

<style>
</style>

<script>
// import VueElementLoading from 'vue-element-loading';

export default {
  name: 'system',
  mounted() {
    this.refreshData();
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    SYS_INFO() {
      return this.$store.state.sys_info;
    },
    SYS_INFO_ARRAY() {
      return Object.entries(this.SYS_INFO).map(value => (value));
    },
    SYS_VERSION() {
      return this.$store.state.sys_version;
    },
    SYS_VERSION_ARRAY() {
      return Object.entries(this.SYS_VERSION).map(value => (value));
    },
    SYS_DF() {
      return this.$store.state.sys_df;
    },
    SYS_DF_ARRAY() {
      return Object.entries(this.SYS_DF).map(value => (value));
    },
  },
  methods: {
    refreshData() {
      this.$store.commit('SET_LOADING_STATE', true);
      this.$store.dispatch('getSysInfo');
      this.$store.dispatch('getSysVersion');
      this.$store.dispatch('getSysDf');
    },
  },
};
</script>
