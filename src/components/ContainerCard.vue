<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title primary-title>
              <div>
                  <v-speed-dial absolute right direction="left" v-model="fab">
                      <v-btn fab dark small slot="activator" v-model="fab">
                        <v-icon>menu</v-icon>
                        <v-icon>close</v-icon>
                      </v-btn>
                      <v-btn fab dark small color="warning"
                             v-if='cntr.State.Running && !cntr.State.Paused'>
                          <!-- Pause -->
                          <v-icon>pause</v-icon>
                      </v-btn>
                      <v-btn fab small
                             v-if='cntr.State.Paused'>
                          <!-- Unpause -->
                          <v-icon>pause</v-icon>
                      </v-btn>
                      <v-btn fab dark small color="error"
                             v-if='cntr.State.Running && !cntr.State.Paused'>
                          <!-- Stop -->
                          <v-icon>stop</v-icon>
                      </v-btn>
                      <v-btn fab dark small color="success"
                             v-if='!cntr.State.Running'>
                          <!-- Start -->
                          <v-icon>play_arrow</v-icon>
                      </v-btn>
                      <v-btn fab dark small color="primary"
                             v-if='cntr.State.Running || cntr.State.Paused'>
                          <!-- Restart -->
                          <v-icon>replay</v-icon>
                      </v-btn>
                  </v-speed-dial>
                <div class="headline">
                    <v-tooltip top>
                        <v-icon color='warning' slot="activator"
                                v-if='cntr.State.Paused'>
                            pause_circle_filled</v-icon>
                        <v-icon color='success' slot="activator"
                                v-if='cntr.State.Running && !cntr.State.Paused'>
                            play_circle_filled</v-icon>
                        <v-icon color='error' slot="activator"
                                v-if='!cntr.State.Running'>
                            remove_circle</v-icon>
                        <span>{{ cntr.State.Status }}</span>
                    </v-tooltip>
                    {{ cntr.Name }}
                </div>
                <span class="grey--text">Based on image :
                    <strong>{{ $store.getters.getImageById(cntr.Image).RepoTags[0] }}</strong>
                </span><br>
                <span class="grey--text">Run CMD :
                    <strong>{{ cntr.Config.Cmd }}</strong>
                </span>
              </div>
            </v-card-title>

            <v-card-text>
                blablablabl
                baklbakl
            </v-card-text>

            <v-card-actions>
              <v-btn flat>Inspect</v-btn>
              <v-btn flat color="red">Delete</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="show">
                  <v-data-table
                      :items="(Object.entries(cntr).map(value => (value)))"
                      hide-headers hide-actions>
                      <template slot="items" slot-scope="props">
                        <td><strong>{{ props.item[0] }}</strong></td>
                        <td class="text-xs-left"><code>{{ props.item[1] }}</code></td>
                      </template>
                  </v-data-table>
              </v-card-text>
            </v-slide-y-transition>
        </v-card>
    </v-hover>
</div>
</template>

<script>

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
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
