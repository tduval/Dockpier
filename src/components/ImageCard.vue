<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ img.RepoTags[0] }}</div>
                <span class="grey--text">{{ img.Config.Cmd }}</span>
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
                      :items="(Object.entries(img).map(value => (value)))"
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
import axios from 'axios';

export default {
  name: 'ImageCard',
  props: {
    img: null,
  },
  data() {
    return {
      show: false,
      activeDeleteDialog: false,
      loading: false,
    };
  },
  methods: {
    deleteImage(id) {
      // eslint-disable-next-line
      console.log('getImageDetails : ', id);
      this.loading = true;
      axios.delete(`http://192.168.255.200:5000/images/${id}`)
        .then((response) => {
          this.loading = false;
          // eslint-disable-next-line
          console.log(response.data);
          // this.images = response.data;
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
