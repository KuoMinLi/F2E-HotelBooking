<template>
  <div class="wrap" :style="`background-image: url('https://raw.githubusercontent.com/KuoMinLi/F2E-HotelBooking/master/src/assets/image/house/bg${item}.jpeg')`">
    <div class="bg_opacity">
      <div class="contanier">
        <div class="logo_side">
          <img class="logo"
              src="https://househotel.netlify.app/static/media/logo.3fafe707.svg"
              alt="好室"
          />
          <div>
            <h1 class="logo_title">好室旅店。HOUSE HOTEL</h1>
            <p class="logo_txt">花蓮縣花蓮市國聯一路1號<br>
              03-8321155<br>
              HOUSE@HOTEL.COM</p>
          </div>
          <div class="bg_page">
            <span class="page"
              v-for="index in 4"
              :key="index"
              :class="{ 'page_active': index == item }"
              @click="item = index"
            ></span>
          </div>
        </div>
        <div class="content">
          <div>
            <ul class="room_list">
              <li
                v-for="(item,index) in data"
                :key="item.id"
                class="roomBtn"
                :style="`background-image: url(${imageUrl[index]})`"
                @click="$router.push(`/booking/${item.id}`)"
              >
              <div class="roomBtn_active">
                {{ item.name }}
              </div>
              </li>
            </ul>
          </div>
          <div class="footer">UI DESIGN by Pei-Chuan Li</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      item: 1,
      data: '',
      imageUrl: [],
    };
  },
  methods: {
    bgloop() {
      const bg = this;
      this.timeout = setInterval(() => {
        if (bg.item === 4) {
          bg.item = 1;
        } else {
          bg.item += 1;
        }
      }, 5000);
    },
  },
  created() {
    this.bgloop();
    this.axios = axios.create({
      baseURL: 'https://challenge.thef2e.com/api/thef2e2019/stage6',
      timeout: 5000,
      headers: {
        Acctept: 'application/json',
        Authorization: 'Bearer jjHZprDIBXxFzXTcwqzGI9w1hXvVBQ7YL2YdvHMNQhYthTltxTxFA46M5FQH',
      },
    });
    this.axios.get('/rooms').then((res) => {
      if (res.data.success) {
        this.data = res.data.items;
        this.data.forEach((item) => {
          this.imageUrl.push(item.imageUrl);
        });
      }
    });
  },
};
</script>
