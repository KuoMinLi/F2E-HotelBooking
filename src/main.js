import { createApp } from 'vue';
import axios from 'axios';
import 'v-calendar/dist/style.css';
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import { ValidationProvider } from 'vee-validate';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import { currency } from './methods/filter';

const app = createApp(App);
app.config.globalProperties.$filters = {
  currency,
};
app.use(VueAxios, axios);
app.use(router);
app.use(SetupCalendar, {});
app.component('CalendarView', Calendar);
app.component('DatePicker', DatePicker);
app.component('ValidationProvider', ValidationProvider);
app.mount('#app');
