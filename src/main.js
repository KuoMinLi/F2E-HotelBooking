import { createApp } from 'vue';
import axios from 'axios';
import 'v-calendar/dist/style.css';
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(SetupCalendar, {});
app.component('CalendarView', Calendar);
app.component('DatePicker', DatePicker);
app.mount('#app');
