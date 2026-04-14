import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/global.css';

// PrimeVue
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

// Tema (novo sistema)
import Lara from '@primeuix/themes/lara';

// Ícones e utilidades
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
});
app.use(ToastService);

app.component('Toast', Toast);

app.mount('#app');
