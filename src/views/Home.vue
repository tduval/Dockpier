<template>
<div>
    <div class="md-layout md-gutter md-alignment-center">
        <h1>Info</h1>
        <md-button class="md-icon-button md-primary" v-on:click='refreshData'>
            <md-icon>cached</md-icon>
        </md-button>
    </div>

    <div class="md-layout md-gutter md-alignment-top-center">
        <vue-element-loading :active="loading" color="#42b983"/>

        <div v-if="SYS_VERSION" class="md-layout-item md-size-30">
            <md-table md-card style="text-align: left;">
                <md-table-toolbar>
                    <h1 class="md-title">Docker Version</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>Key</md-table-head>
                    <md-table-head>Value</md-table-head>
                </md-table-row>
                <md-table-row v-for="(value, key) in SYS_VERSION" :key="key.id">
                    <md-table-cell><strong>{{ key }}</strong></md-table-cell>
                    <md-table-cell><span class="md-caption">{{ value }}</span></md-table-cell>
                </md-table-row>
            </md-table>
        </div>

        <div v-if="SYS_DF" class="md-layout-item md-size-30">
            <md-table md-card style="text-align: left;">
                <md-table-toolbar>
                    <h1 class="md-title">Docker Summary</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>Key</md-table-head>
                    <md-table-head>Value</md-table-head>
                </md-table-row>
                <md-table-row v-for="(value, key) in SYS_DF" :key="key.id">
                    <md-table-cell><strong>{{ key }}</strong></md-table-cell>
                    <md-table-cell><span class="md-caption">{{ value }}</span></md-table-cell>
                </md-table-row>
            </md-table>
        </div>

        <div v-if="SYS_INFO" class="md-layout-item md-size-30">
            <md-table md-card style="text-align: left;">
                <md-table-toolbar>
                    <h1 class="md-title">Docker Engine Info</h1>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head>Key</md-table-head>
                    <md-table-head>Value</md-table-head>
                </md-table-row>
                <md-table-row v-for="(value, key) in SYS_INFO" :key="key.id">
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
// import VueElementLoading from 'vue-element-loading';

export default {
  name: 'home',
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
    SYS_VERSION() {
      return this.$store.state.sys_version;
    },
    SYS_DF() {
      return this.$store.state.sys_df;
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
