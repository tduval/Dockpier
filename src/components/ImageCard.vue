<template>
    <div class="card-expansion">
        <md-card>
            <md-card-header>
                <div class="md-title">{{ img.RepoTags[0] }}</div>
                <md-tooltip md-direction="bottom" md-delay="300">{{ img.Id }}</md-tooltip>
                <div class="md-subhead">{{ img.Config.Cmd }}</div>
            </md-card-header>

            <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <div>
                    <md-button class="md-raised md-primary">
                        Inspect
                    </md-button>
                    <md-dialog-confirm
                          :md-active.sync="activeDeleteDialog"
                          md-title="Do you want to delete this image?"
                          md-content="Warning
                            this actions will permanently remove the image from the Docker host.
                            Be sure to have a backup first or upload it to Docker Hub."
                          md-confirm-text="Delete"
                          md-cancel-text="Cancel"
                          @md-confirm="deleteImage( img.Id )" />
                    <md-button class="md-raised md-accent" @click="activeDeleteDialog = true">
                        Delete
                    </md-button>
                  </div>

                  <md-card-expand-trigger>
                    <md-button class="md-icon-button">
                      <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                  </md-card-expand-trigger>
                </md-card-actions>

                <md-card-expand-content>
                  <md-card-content>

                      <md-table md-card style="text-align: left;">
                          <md-table-toolbar>
                              <h1 class="md-title">Image Details</h1>
                          </md-table-toolbar>
                          <md-table-row>
                              <md-table-head>Key</md-table-head>
                              <md-table-head>Value</md-table-head>
                          </md-table-row>
                          <md-table-row v-for="(value, key) in img" :key="key.id">
                              <md-table-cell><strong>{{ key }}</strong></md-table-cell>
                              <md-table-cell><span class="md-caption">{{ value }}</span>
                              </md-table-cell>
                          </md-table-row>
                      </md-table>

                  </md-card-content>
                </md-card-expand-content>
            </md-card-expand>
        </md-card>
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
