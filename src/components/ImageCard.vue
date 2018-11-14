<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ img.RepoTags[0] }}</div>
                <span class="grey--text"><code>{{ img.Config.Cmd.join(' ') }}</code></span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat @click="inspectDialog = true" color="primary">Inspect</v-btn>
              <v-btn flat @click="historyDialog = true" color="info">History</v-btn>
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

    <v-dialog v-model="inspectDialog" width="1200px" scrollable >
        <v-card>
            <v-card-title class="headline">Inspect details</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <code>{{ img }}</code>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click.native="inspectDialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="historyDialog" width="1200px" scrollable >
        <v-card>
            <v-card-title class="headline">
                History details
                <v-btn flat icon color="blue" v-on:click='historyImage'>
                    <v-icon>cached</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div v-if="history">
                    <v-expansion-panel>
                        <v-expansion-panel-content v-for="(item,i) in history" :key="i">
                            <div slot="header">
                                <v-layout justify-space-between row>
                                    <span>{{ history.length-i }}</span>
                                    <span>{{ item.Created | moment("from") }}</span>
                                    <span>
                                        {{ item.Size | currency(' B', 0, { symbolOnLeft: false })}}
                                    </span>
                                    <span>{{ item.Id }}</span>
                                </v-layout>
                            </div>
                            <v-card>
                                <v-card-text class="grey lighten-3">
                                    <v-layout row>
                                        <span class="mr-5">Tags : </span>
                                        <span class="ml-5">
                                            <var>{{ item.Tags }}</var>
                                        </span>
                                    </v-layout>
                                    <v-layout row>
                                        <span class="mr-5">Comments : </span>
                                        <span class="ml-5">
                                            <blockquote>{{ item.Comments }}</blockquote>
                                        </span>
                                    </v-layout>
                                    <v-layout row>
                                        <span class="mr-5"><v-icon>code</v-icon></span>
                                        <span class="ml-5">
                                            <code>{{ item.CreatedBy }}</code>
                                        </span>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <code>{{ history }}</code>
                </div>
                <div v-else>
                    <v-btn flat icon color="blue" v-on:click='historyImage'>
                        <v-icon>history</v-icon>
                    </v-btn>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click.native="historyDialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import http from '@/http';

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
      inspectDialog: false,
      historyDialog: false,
      history: false,
    };
  },
  methods: {
    deleteImage(id) {
      // eslint-disable-next-line
      console.log('getImageDetails : ', id);
      this.loading = true;
      http.delete(`/images/${id}`)
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
    historyImage() {
      // eslint-disable-next-line
      console.log('history : ', this.img.RepoTags[0]);
      this.loading = true;
      http.get(`/images/${this.img.Id}/history`)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data);
          this.history = response.data;
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
