<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ net.Name }}</div>
                <span class="grey--text">Scope :
                    <strong>{{ net.Scope }}</strong>
                </span><br>
                <span class="grey--text">Driver :
                    <strong>{{ net.Driver }}</strong>
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
                      :items="(Object.entries(net).map(value => (value)))"
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
            <v-card-title class="headline">Do you want to delete this network?</v-card-title>
            <v-card-text>
                <h3>{{ net.Name }}</h3>
                <span>Scope :
                    <strong>{{ net.Scope }}</strong>
                </span><br>
                <span>Driver :
                    <strong>{{ net.Driver }}</strong>
                </span>
            </v-card-text>
            <v-card-actions>
                <v-btn @click.native="deleteDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click.native="deleteNetwork()" color="error">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
import http from '@/http';

export default {
  name: 'NetworkCard',
  props: {
    net: null,
  },
  data() {
    return {
      show: false,
      deleteDialog: false,
      loading: false,
    };
  },
  methods: {
    deleteNetwork() {
      // eslint-disable-next-line
      console.log('Delete : ', this.net.Name);
      this.loading = true;
      http.delete(`/networks/${this.net.Id}`)
        .then((response) => {
          this.$store.dispatch('getNetworks');
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
