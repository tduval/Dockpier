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
                    {{ img.Size }}
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
    img: [],
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
