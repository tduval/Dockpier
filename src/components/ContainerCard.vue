<template>
<div>
    <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
                <v-icon v-if='cntr.State.Paused' color='orange'>pause</v-icon>
                <v-icon v-if='cntr.State.Running' color='green'>play_arrow</v-icon>
                <v-icon v-if='cntr.State.Status == "exited"' color='red'>stop</v-icon>
                {{ cntr.Name }}
            </div>
            <span class="grey--text">
                {{ $store.getters.getImageById(cntr.Image).RepoTags[0] }}
            </span>
          </div>
        </v-card-title>

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
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
