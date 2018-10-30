<template>
<div class="images">
    <h1>Images</h1>

    <h2>Click the button to get Docker Images list</h2>
    <button id="btn" class="" v-on:click="getImagesList">Get Images</button>

    <div v-if="loading">
        <img src="src/assets/loader.gif" /> Loading.....
    </div>

    <div class="wrapper">
        <div class="row">
            <div v-for="image in images" :key="image.id">
                <div>
                    <h3>{{ image.RepoTags[0] }}</h3>
                    <p><strong>ID : </strong>{{ image.Id }}</p>
                    <p><strong>Size : </strong>{{ image.Size }}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
</style>

<script>
import axios from 'axios';

export default {
    name: 'images',
    data() {
        return {
            images: [],
            loading: false,
        };
    },
    methods: {
        getImagesList() {
            this.loading = true;
            axios.get('http://192.168.255.200:5000/images', {
                    headers: {
                        crossDomain: true
                    }
                })
                .then((response) => {
                    this.loading = false;
                    console.log(response);
                    this.images = response.data;
                }, (error) => {
                    this.loading = false;
                    console.log('Error Axios : ', error);
                });
        },
    },
};
</script>
