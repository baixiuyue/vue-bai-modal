import Vue from 'vue';
import Modal from '../src/index';
import App from './app.vue';

Vue.use(Modal);

new Vue({
    el: '#app',
    render: h => h(App)
});