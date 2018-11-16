<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ vol.Name }}</div>
                <span class="grey--text">Scope :
                    <strong>{{ vol.Scope }}</strong>
                </span><br>
                <span class="grey--text">Driver :
                    <strong>{{ vol.Driver }}</strong>
                </span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat>Inspect</v-btn>
              <v-btn flat @click="deleteDialog = true" color="error">Delete</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="show">
                  <v-data-table
                      :items="(Object.entries(vol).map(value => (value)))"
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

    <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">Do you want to delete this volume?</v-card-title>
            <v-card-text>
                <h3>{{ vol.Name }}</h3>
                <span>Scope :
                    <strong>{{ vol.Scope }}</strong>
                </span><br>
                <span>Driver :
                    <strong>{{ vol.Driver }}</strong>
                </span>
            </v-card-text>
            <v-card-actions>
                <v-btn @click.native="deleteDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click.native="deleteVolume()" color="error">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
import http from '@/http';

export default {
  name: 'VolumeCard',
  props: {
    vol: null,
  },
  data() {
    return {
      show: false,
      deleteDialog: false,
      loading: false,
    };
  },
  methods: {
    deleteVolume() {
      // eslint-disable-next-line
      console.log('Delete : ', this.vol.Name);
      this.loading = true;
      http.delete(`/volumes/${this.vol.Id}`)
        .then((response) => {
          this.$store.dispatch('getVolumes');
          // eslint-disable-next-line
          console.log(response.data);
          this.loading = false;
        }, (error) => {
          this.loading = false;
          // eslint-disable-next-line
          console.error(error.message, error.response);
        });
      this.deleteDialog = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
