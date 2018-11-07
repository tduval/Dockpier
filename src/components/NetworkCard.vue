<template>
<div>
    <v-card>
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
          <v-btn flat color="red">Delete</v-btn>
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

</div>
</template>

<script>

export default {
  name: 'ContainerCard',
  props: {
    net: null,
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
