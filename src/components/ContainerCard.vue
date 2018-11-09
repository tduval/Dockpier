<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-progress-linear :indeterminate="true" v-if='loading'></v-progress-linear>
            <v-card-title primary-title>
                <div>
                    <v-speed-dial absolute right direction="left" v-model="fab">
                        <v-btn fab dark small slot="activator" v-model="fab">
                            <v-icon>menu</v-icon>
                            <v-icon>close</v-icon>
                        </v-btn>
                        <v-tooltip top color="warning" transition="scale-transition">
                            <v-btn fab dark small color="warning"
                                 v-if='cntr.State.Running && !cntr.State.Paused'
                                 slot="activator"
                                 @click='statusContainer("pause")'>
                              <v-icon>pause</v-icon>
                            </v-btn>
                            <span>Pause</span>
                        </v-tooltip>
                        <v-tooltip top transition="scale-transition">
                            <v-btn fab small
                                v-if='cntr.State.Paused'
                                slot="activator"
                                @click='statusContainer("unpause")'>
                                <v-icon>pause</v-icon>
                            </v-btn>
                            <span>Unpause</span>
                        </v-tooltip>
                        <v-tooltip top color="error" transition="scale-transition">
                            <v-btn fab dark small color="error"
                                 v-if='cntr.State.Running && !cntr.State.Paused'
                                 slot="activator"
                                 @click='statusContainer("stop")'>
                                <v-icon>stop</v-icon>
                            </v-btn>
                            <span>Stop</span>
                        </v-tooltip>
                        <v-tooltip top color="success" transition="scale-transition">
                            <v-btn fab dark small color="success"
                                 v-if='!cntr.State.Running'
                                 slot="activator"
                                 @click='statusContainer("start")'>
                                <v-icon>play_arrow</v-icon>
                            </v-btn>
                            <span>Start</span>
                        </v-tooltip>
                        <v-tooltip top color="primary" transition="scale-transition">
                            <v-btn fab dark small color="primary"
                                 v-if='cntr.State.Running || cntr.State.Paused'
                                 slot="activator"
                                 @click='statusContainer("restart")'>
                                <v-icon>replay</v-icon>
                            </v-btn>
                            <span>Restart</span>
                        </v-tooltip>
                    </v-speed-dial>
                <div class="headline">
                    <v-tooltip top>
                        <v-avatar color='warning' slot="activator" size="26px"
                                    v-if='cntr.State.Paused'>
                          <v-icon dark small>pause</v-icon>
                        </v-avatar>
                        <v-avatar color='success' slot="activator" size="26px"
                                    v-if='cntr.State.Running && !cntr.State.Paused'>
                          <v-icon dark small>play_arrow</v-icon>
                        </v-avatar>
                        <v-avatar color='error' slot="activator" size="26px"
                                    v-if='!cntr.State.Running'>
                          <v-icon dark small>stop</v-icon>
                        </v-avatar>
                        <span>{{ cntr.State.Status }}</span>
                    </v-tooltip>
                    <v-divider vertical class="mx-1"></v-divider>
                    <span class="text-truncate">{{ cntr.Name.substring(1) }}</span>
                </div>
                <span class="grey--text">Based on image :
                    <strong>{{ $store.getters.getImageById(cntr.Image).RepoTags[0] }}</strong>
                </span><br>
                <span class="grey--text">Run CMD :
                    <code>{{ cntr.Config.Cmd.join(' ') }}</code>
                </span>
                </div>
            </v-card-title>

            <v-divider inset></v-divider>

            <v-card-text>
                <v-tooltip top>
                    <p v-if='cntr.State.Running' slot="activator">
                        Container started {{ cntr.State.StartedAt | moment("from") }}
                    </p>
                    <span>{{ cntr.State.StartedAt | moment("YYYY/MM/DD HH:mm") }}</span>
                </v-tooltip>
                <v-tooltip top>
                <p v-if='!cntr.State.Running' slot="activator">
                    Container stopped {{ cntr.State.FinishedAt | moment("from") }}
                </p>
                <span>{{ cntr.State.StartedAt | moment("YYYY/MM/DD HH:mm") }}</span>
            </v-tooltip>
            </v-card-text>

            <v-card-actions>
              <v-btn flat @click="inspectDialog = true">Inspect</v-btn>
              <v-btn flat color="red">Delete</v-btn>
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

    <v-dialog v-model="inspectDialog" width="1200px">
        <v-card>
            <v-card-title class="headline">Inspect details</v-card-title>
            <v-card-text>
                <v-data-table
                    :items="(Object.entries(cntr).map(value => (value)))"
                    hide-headers hide-actions>
                    <template slot="items" slot-scope="props">
                      <td><strong>{{ props.item[0] }}</strong></td>
                      <td><code>{{ props.item[1] }}</code></td>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click.native="inspectDialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContainerCard',
  props: {
    cntr: null,
  },
  data() {
    return {
      show: false,
      activeDeleteDialog: false,
      loading: false,
      fab: false,
      inspectDialog: false,
    };
  },
  methods: {
    statusContainer(operation) {
      // eslint-disable-next-line
      console.log('statusContainer : ', this.cntr.Name, operation);
      this.loading = true;
      axios.put(`http://192.168.255.200:5000/containers/${this.cntr.Id}/status`, { status: operation })
        .then((response) => {
          this.$store.dispatch('getContainers');
          // eslint-disable-next-line
          console.log(response.data);
          this.loading = false;
        }, (error) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log('Error Axios : ', error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
