<template>
<div>
    <v-layout row justify-center>
        <h1>Home</h1>
        <v-btn flat icon color="blue" v-on:click='refreshData'>
            <v-icon>cached</v-icon>
        </v-btn>
    </v-layout>

    <v-layout row justify-space-around wrap>
        <vue-element-loading :active="loading" color="#42b983"/>

        <v-flex shrink sm2>
            <v-card to="/containers" ripple hover>
                <v-card-title primary-title>
                    <v-avatar color="teal">
                        <span class="white--text headline">{{ SYS_INFO.Containers }}</span>
                    </v-avatar>
                    <div class="headline pl-3">Containers</div>
                </v-card-title>
                <v-card-text>
                    <v-layout row justify-space-around wrap px-3 pb-3>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                {{ SYS_INFO.ContainersRunning }} running
                            </div>
                        </v-flex>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                {{ SYS_INFO.ContainersStopped }} stopped
                            </div>
                        </v-flex>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                {{ SYS_INFO.ContainersPaused }} paused
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex shrink sm2>
            <v-card to="/images" ripple hover>
                <v-card-title primary-title>
                    <v-avatar color="teal">
                        <span class="white--text headline">{{ SYS_DF.Images.length }}</span>
                    </v-avatar>
                    <div class="headline pl-3">Images</div>
                </v-card-title>
                <v-card-text>
                    <v-layout row justify-space-around wrap px-3 pb-3>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                {{ SYS_DF.LayersSize | bytes }}
                            </div>
                        </v-flex>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                <span v-for="(value, key) in SYS_INFO.RegistryConfig.IndexConfigs"
                                :key="key">
                                    <strong>{{ key }}</strong>
                                </span>
                                default Registry
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-flex shrink sm2>
            <v-card to="/system" ripple hover>
                <v-card-title primary-title>
                    <v-chip color="indigo" text-color="white">
                        <v-avatar>
                            <v-icon>build</v-icon>
                        </v-avatar>
                        {{ SYS_VERSION.Version }}
                    </v-chip>
                    <span class="headline pl-3">Engine</span>
                </v-card-title>
                <v-card-text>
                    <v-layout row justify-space-around wrap px-3 pb-3>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                {{ SYS_INFO.OperatingSystem }}
                            </div>
                        </v-flex>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                {{ SYS_INFO.NCPU }}CPU
                            </div>
                        </v-flex>
                        <v-flex shrink>
                            <div class="font-weight-light">
                                {{ SYS_INFO.MemTotal | bytes }} RAM
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

    </v-layout>
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
