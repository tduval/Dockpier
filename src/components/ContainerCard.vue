<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-progress-linear :indeterminate="true" v-if='loading'></v-progress-linear>
            <v-card-title primary-title>
                <div>
                    <div class="headline mb-3">
                        <v-speed-dial absolute direction="right"
                        v-model="fab" style="z-index: auto;">
                            <v-btn fab small slot="activator" v-model="fab"
                            v-if='getContainerStatus === "paused"' color="warning">
                                <v-icon>pause</v-icon>
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-btn fab small slot="activator" v-model="fab"
                            v-else-if='getContainerStatus === "running"' color="success">
                                <v-icon>play_arrow</v-icon>
                                <v-icon>close</v-icon>
                            </v-btn>
                            <v-btn fab small slot="activator" v-model="fab"
                            v-else color="error">
                                <v-icon>stop</v-icon>
                                <v-icon>close</v-icon>
                            </v-btn>

                            <v-tooltip top color="warning" transition="scale-transition">
                                <v-btn fab dark small color="warning"
                                     v-if='getContainerStatus === "running"'
                                     slot="activator"
                                     @click='statusContainer("pause")'>
                                  <v-icon>pause</v-icon>
                                </v-btn>
                                <span>Pause</span>
                            </v-tooltip>
                            <v-tooltip top transition="scale-transition">
                                <v-btn fab small
                                    v-if='getContainerStatus === "paused"'
                                    slot="activator"
                                    @click='statusContainer("unpause")'>
                                    <v-icon>pause</v-icon>
                                </v-btn>
                                <span>Unpause</span>
                            </v-tooltip>
                            <v-tooltip top color="error" transition="scale-transition">
                                <v-btn fab dark small color="error"
                                     v-if='getContainerStatus === "running"'
                                     slot="activator"
                                     @click='statusContainer("stop")'>
                                    <v-icon>stop</v-icon>
                                </v-btn>
                                <span>Stop</span>
                            </v-tooltip>
                            <v-tooltip top color="success" transition="scale-transition">
                                <v-btn fab dark small color="success"
                                     v-if='getContainerStatus === "stopped"'
                                     slot="activator"
                                     @click='statusContainer("start")'>
                                    <v-icon>play_arrow</v-icon>
                                </v-btn>
                                <span>Start</span>
                            </v-tooltip>
                            <v-tooltip top color="primary" transition="scale-transition">
                                <v-btn fab dark small color="primary"
                                     v-if='getContainerStatus === "running"
                                     || getContainerStatus === "paused"'
                                     slot="activator"
                                     @click='statusContainer("restart")'>
                                    <v-icon>replay</v-icon>
                                </v-btn>
                                <span>Restart</span>
                            </v-tooltip>
                        </v-speed-dial>
                        <v-divider vertical class="mx-4"></v-divider>
                        <span class="text-truncate">{{ cntr.Name.substring(1) }}</span>
                    </div>
                    <span class="grey--text">Based on image :
                        <strong v-if="getImage.RepoTags[0]">{{ getImage.RepoTags[0] }}</strong>
                        <span v-else>&lt;missing tag&gt;</span>
                    </span><br>
                    <span class="grey--text">Run CMD :
                        <code>{{ cntr.Config.Cmd.join(' ') }}</code>
                    </span><br>
                    <v-tooltip top>
                        <span v-if='getContainerStatus != "stopped"' slot="activator"
                        class="font-italic grey--text">
                            Container started {{ cntr.State.StartedAt | moment("from") }}
                        </span>
                        <span>{{ cntr.State.StartedAt | moment("YYYY/MM/DD HH:mm:ss") }}</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <span v-if='getContainerStatus === "stopped"' slot="activator"
                        class="font-italic grey--text">
                            Container stopped {{ cntr.State.FinishedAt | moment("from") }}
                        </span>
                        <span>{{ cntr.State.StartedAt | moment("YYYY/MM/DD HH:mm:ss") }}</span>
                    </v-tooltip>
                </div>
            </v-card-title>

            <v-divider inset></v-divider>

            <v-card-text>
                <v-layout row justify-space-between wrap px-3>
                    <strong v-if='getContainerStatus != "stopped"'>Published Ports</strong>
                    <strong v-else>Exposed Ports</strong>
                    <span v-if="cntr.Config.ExposedPorts != null">
                        <span
                        v-for="item in (Object.entries(cntr.NetworkSettings.Ports)
                        .map(value => (value)))" :key="item.id" class="ml-3">
                            <span v-if="item[1] != null">
                                {{ item[1][0].HostIp }}:{{ item[1][0].HostPort }}
                                 =>
                            </span>
                            <span v-else>
                                    <v-icon>report</v-icon>
                                    <span class="font-italic">Unpublished  => </span>
                            </span>
                        </span>
                        <span>{{ Object.keys(cntr.Config.ExposedPorts)[0] }}</span>
                    </span>
                    <span v-else class="ml-3">
                        <v-icon>report</v-icon>
                        <span class="font-italic">Unexposed</span>
                    </span>
                </v-layout>

                <v-layout row justify-space-between wrap px-3>
                    <strong>Networks</strong>
                    <span v-if="cntr.NetworkSettings.Networks != null">
                        <span v-for="item in (Object.entries(cntr.NetworkSettings.Networks)
                            .map(value => (value)))" :key="item.id" class="ml-3">
                            <span>
                                {{ item[0] }}
                            </span>
                        </span>
                    </span>
                    <span v-else class="ml-3">
                        <v-icon>report</v-icon>
                        <span class="font-italic">No network assigned</span>
                    </span>
                </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-btn flat @click="inspectDialog = true">Inspect</v-btn>
              <v-btn flat @click="deleteDialog = true" color="error">Delete</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="show">
                  something...
              </v-card-text>
            </v-slide-y-transition>
        </v-card>
    </v-hover>

    <v-dialog v-model="inspectDialog" width="1200px" scrollable >
        <v-card>
            <v-card-title class="headline">Inspect details</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <code>{{ cntr }}</code>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click.native="inspectDialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">Do you want to delete this container?</v-card-title>
            <v-card-text>
                <h3>{{ cntr.Name.substring(1) }}</h3>
                <span class="grey--text">Based on image :
                    <strong v-if="getImage.RepoTags[0]">{{ getImage.RepoTags[0] }}</strong>
                    <span v-else>&lt;missing tag&gt;</span>
                </span><br>
                <span class="grey--text">Run CMD :
                    <code>{{ cntr.Config.Cmd.join(' ') }}</code>
                </span>
            </v-card-text>
            <v-card-actions>
                <v-btn @click.native="deleteDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click.native="deleteContainer()" color="error">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-snackbar v-model="alerting" :color="alertConfig.color" top multi-line>
        {{ alertConfig.message }}
        <v-btn dark flat @click="alerting = false">
            Close
        </v-btn>
    </v-snackbar>

</div>
</template>

<script>
import http from '@/http';

export default {
  name: 'ContainerCard',
  props: {
    cntr: null,
  },
  data() {
    return {
      show: false,
      loading: false,
      fab: false,
      inspectDialog: false,
      deleteDialog: false,
      cntrStatus: false,
      alerting: false,
      alertConfig: {
        color: '',
        title: '',
        message: '',
      },
    };
  },
  computed: {
    getImage() {
      return this.$store.getters.getImageById(this.cntr.Image);
    },
    getContainerStatus() {
      if (this.cntr.State.Running && !this.cntr.State.Paused) {
        return 'running';
      } else if (this.cntr.State.Paused) {
        return 'paused';
      } else if (!this.cntr.State.Running) {
        return 'stopped';
      }
      return null;
    },
  },
  methods: {
    statusContainer(operation) {
      // eslint-disable-next-line
      console.log('statusContainer : ', this.cntr.Name, operation);
      this.loading = true;
      http.put(`/containers/${this.cntr.Id}/status`, { status: operation })
        .then((response) => {
          this.$store.dispatch('getContainers');
          // eslint-disable-next-line
          console.log(response.data);
          this.loading = false;
        }, (error) => {
          this.loading = false;
          // eslint-disable-next-line
          console.error(error.message, error.response);
        });
    },
    deleteContainer() {
      // eslint-disable-next-line
      console.log('Delete : ', this.cntr.Name);
      this.loading = true;
      http.delete(`/containers/${this.cntr.Id}`)
        .then((response) => {
          this.$store.dispatch('getContainers');
          // eslint-disable-next-line
          console.log(response.data);
          this.alertConfig = {
            color: 'success',
            title: 'Success',
            message: 'The container has been successfully deleted.',
          };
          this.alerting = true;
          this.loading = false;
        }, (error) => {
          // eslint-disable-next-line
          console.error(error.message, error.response);
          this.alertConfig = {
            color: 'error',
            title: 'Error',
            message: error.response.data.message,
          };
          this.alerting = true;
          this.loading = false;
        });
      this.deleteDialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
