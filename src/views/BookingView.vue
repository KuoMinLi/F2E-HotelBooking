<template>
<div class="roomwrap">
  <div class="roompic" :style="`background-image: url(${roomImgaeUrl[item - 1]})`">
     <router-link to="/" class="backhome">
            <img
              src="../assets/image/icons/previous.svg"
              class="backhome-img"
              alt=""
            />
            查看其它房型
          </router-link>
      <div class="room_side">
        <div class="room_text">
          <div class="room_price">${{ data.normalDayPrice}}</div>
          /
          <div class="room_day">1晚</div>
        </div>
        <button class="bookingBtn">Booking now</button>
        <div class="room_page">
          <span
          class="roompage"
          v-for="index in 3"
          :key="index"
          :class="{ 'roompage_active': index == item }"
          @click="item = index"></span>
        </div>
      </div>
  </div>
  <div class="room_content">
    <h1 class="room_title">{{ data.descriptionShort.GuestMax}}人・
    {{ data.descriptionShort.Bed.length}}張 {{ data.descriptionShort.Bed[0]}} 床組・
    附早餐・衛浴 {{ data.descriptionShort['Private-Bath']}} 間・{{ data.descriptionShort.Footage}} 平方公尺</h1>
    <p class="room_time">平日（一～四）價格：{{ data.normalDayPrice}} / 假日（五〜日）價格：{{ data.holidayPrice}}<br>
    入住時間：{{ data.checkInAndOut.checkInEarly }}（最早） / {{ data.checkInAndOut.checkInLate }}（最晚） <br>
    退房時間：{{ data.checkInAndOut.checkOut }}</p>
    <ul class="room_description">
      <li v-for="(item, index) in description" :key="index">・{{ item }}.</li>
    </ul>
    <div class="room_amenities">
      <div
        class="room_icon"
        v-for="(item, index) in amenities"
        :key="index"
        :class="{ 'room_icon_disable': !item.state }"
      >
        <img
          v-if="item.state"
          src="../assets/image/icons/ok.svg"
          alt=""
          class="room_status"
        />
        <img
          v-else
          src="../assets/image/icons/cancel.svg"
          alt=""
          class="room_status"
        />
        <div class="room_icon_title">
          <img
            class="room_icon_pic"
            :src="require(`../assets/image/icons/${item.name}.svg`)"
            :alt="item.name"
          />
          <span class="room_icon_text">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <DatePicker
    v-model="range"
    :value="null"
    :columns="$screens({ default: 1, lg: 2 })"
    color="primary"
    :attributes='attrs'
    is-range />
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: '',
      roomAmenities: [],
      roomImgaeUrl: [],
      item: 1,
      range: { start: '', end: '' },
    };
  },
  methods: {
    picloop() {
      this.timeout = setInterval(() => {
        if (this.item === 3) {
          this.item = 1;
        } else {
          this.item += 1;
        }
      }, 5000);
    },
  },
  computed: {
    description() {
      const descriptionlist = this.data.description.split('.');
      const arr = [];
      descriptionlist.forEach((item) => {
        arr.push(item.trim());
      });
      console.log(arr);
      arr.splice(arr.length - 1, 1);
      return arr;
    },
    amenities() {
      const obj = this.roomAmenities;
      const arr1 = Object.keys(obj);
      const arr2 = Object.values(obj);
      const arr = [];
      for (let i = 0; i < arr1.length; i += 1) {
        arr.push({ name: arr1[i], state: arr2[i] });
      }
      return arr;
    },
  },
  created() {
    this.picloop();
    const roomId = this.$route.params.id;
    this.axios = axios.create({
      baseURL:
        'https://challenge.thef2e.com/api/thef2e2019/stage6/room/',
      timeout: 2000,
      headers: {
        Acctept: 'application/json',
        Authorization: 'Bearer jjHZprDIBXxFzXTcwqzGI9w1hXvVBQ7YL2YdvHMNQhYthTltxTxFA46M5FQH',
      },
    });
    this.axios.get(`${roomId}`).then((res) => {
      if (res.data.success) {
        [this.data] = res.data.room;
        console.log(this.data);
        this.roomAmenities = this.data.amenities;
        this.roomImgaeUrl = this.data.imageUrl;
      }
    });
  },
};

</script>

<style lang="scss">
.vc {
  &-container {
    border: none;
    --primary-100: #bcc1ad;
    --primary-200: #a6ad92;
    --primary-300: #909877;
    --primary-400: #7a845c;
    --primary-500: #646f41;
    --primary-600: #38470b;
    --primary-700: #334411;
    --primary-800: #313f09;
    --primary-900: #252f07;
  }
  &-arrow {
    height: 70px;
  }
  &-header {
    height: 80px;
  }
  &-weeks {
    padding: 5px 10px;
  }
}
</style>
