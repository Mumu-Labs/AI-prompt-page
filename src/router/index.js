import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import TextToImage from '@/views/TextToImage.vue'
import ImageToImage from '@/views/ImageToImage.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/text-to-image', name: 'TextToImage', component: TextToImage },
    { path: '/image-to-image', name: 'ImageToImage', component: ImageToImage },
];


const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
