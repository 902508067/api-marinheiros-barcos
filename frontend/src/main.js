import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/global.css';

// PrimeVue
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);


app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component('Toast', Toast);

app.mount('#app');

