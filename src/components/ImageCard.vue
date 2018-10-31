<template>
    <div class="card-expansion md-gutter">
        <md-card>
            <md-card-header>
                <div class="md-title">{{ img.RepoTags[0] }}</div>
                <div class="md-subhead">Subtitle here</div>
            </md-card-header>

            <md-card-expand>
                <md-card-actions md-alignment="space-between">
                  <div>
                    <md-button>Action</md-button>
                    <md-button>Action</md-button>
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
export default {
  name: 'ImageCard',
  props: {
    img: [],
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
