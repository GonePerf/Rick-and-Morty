import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/css/style.css';
import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

createApp(App).use(store).use(router).component('v-select', VueSelect).mount('#app');
