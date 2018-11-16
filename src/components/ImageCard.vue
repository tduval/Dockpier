<template>
<div>
    <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-card-title primary-title>
              <div>
                <div class="headline" v-if="img.RepoTags[0]">
                    <v-tooltip right>
                        <span slot="activator">
                            {{ img.RepoTags[0] }}
                        </span>
                        <span>{{ img.RepoTags }}</span>
                    </v-tooltip>
                </div>
                <div class="headline" v-else>
                    <span class="grey--text">&lt;missing tag&gt;</span>
                </div>
                <span><code>{{ img.Config.Cmd.join(' ') }}</code></span><br>
                <v-tooltip right>
                    <span slot="activator" class="grey--text">
                        Size {{ img.Size | bytes }}
                    </span>
                    <span>{{ img.Size | separator }} bytes</span>
                </v-tooltip><br>
                <v-tooltip right>
                    <span class="font-italic grey--text" slot="activator">
                        Image created {{ img.Created | moment("from") }}
                    </span>
                    <span>{{ img.Created  | moment("YYYY/MM/DD HH:mm:ss") }}</span>
                </v-tooltip>
              </div>
            </v-card-title>

            <v-card-text>
                <span >
                    <v-chip small disabled text-color="black" outline>
                        {{ getContainers.length }}
                    </v-chip>
                    Container using this image
                    <div v-if="getContainers.length">
                        <span v-for="container in getContainers" :key="container.id">
                            <v-chip small>{{ container[1].Name.substring(1) }}</v-chip>
                        </span>
                    </div>
                </span><br>
            </v-card-text>

            <v-card-actions>
              <v-btn flat @click="inspectDialog = true">Inspect</v-btn>
              <v-btn flat @click="historyDialog = true" color="info">History</v-btn>
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

    <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">Do you want to delete this image?</v-card-title>
            <v-card-text>
                <span v-if="img.RepoTags[0]"><h3>{{ img.RepoTags[0] }}</h3></span>
                <span v-else class="grey--text"><h3>&lt;missing tag&gt;</h3></span>
                <p><code>{{ img.Config.Cmd.join(' ') }}</code></p>
            </v-card-text>
            <v-card-actions>
                <v-btn @click.native="deleteDialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click.native="deleteImage()" color="error">Delete</v-btn>
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
  name: 'ImageCard',
  props: {
    img: null,
  },
  data() {
    return {
      show: false,
      loading: false,
      deleteDialog: false,
      inspectDialog: false,
      historyDialog: false,
      history: false,
      alerting: false,
      alertConfig: {
        color: '',
        title: '',
        message: '',
      },
    };
  },
  computed: {
    getContainers() {
      return Object.entries(this.$store.getters.getContainerPerImageById(this.img.Id))
        .map(value => (value));
    },
  },
  methods: {
    deleteImage() {
      // eslint-disable-next-line
      console.log('getImageDetails : ', this.img.Id);
      this.loading = true;
      http.delete(`/images/${this.img.Id}`)
        .then((response) => {
          this.$store.dispatch('getImages');
          // eslint-disable-next-line
          console.log(response.data);
          this.alertConfig = {
            color: 'success',
            title: 'Success',
            message: 'The image has been successfully deleted.',
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
