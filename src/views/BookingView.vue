<template>
<FormView v-if="FormShow"
  :data="data"
  :inday="inday"
  :outday="outday"
  :totalprice="totalPrice"
  :roomamenities="roomAmenities"
  :disabledates="disableDates"
  @closeForm="closeForm"
></FormView>
<div v-if="isShow" class="lightbox" @click="closeAlbum()">
  <img
    :src="require(`../assets/image/icons/album-prev.svg`)"
    class="album_btn"
    @click.stop="prevImage()"
    alt=""
  >
  <div
    :style="{ 'background-image': `url(${Album_image})` }"
    alt=""
    class="album_img"
  ></div>
  <img
    :src="require(`../assets/image/icons/album-next.svg`)"
    class="album_btn"
    @click.stop="nextImage()"
    alt=""
  />
</div>
<div class="roomwrap">
  <div class="roompic" :style="`background-image: url(${roomImgaeUrl[item - 1]})`"
  @click="showImage(roomImgaeUrl[item - 1])">
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
          <div class="room_price">${{ $filters.currency(totalPrice || data.normalDayPrice) }}</div>
          /
          <div class="room_day">{{ totalDays || 1 }}晚</div>
        </div>
        <button class="bookingBtn" @click.stop="OpenForm">Booking now</button>
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
    <h1 class="room_title room_title_sm">{{ data.descriptionShort.GuestMax}}人・
    {{ data.descriptionShort.Bed.length}}張 {{ data.descriptionShort.Bed[0]}} 床組・附早餐
    <br>衛浴 {{ data.descriptionShort['Private-Bath']}} 間・{{ data.descriptionShort.Footage}} 平方公尺</h1>
    <p class="room_time">平日（一～四）價格：{{ $filters.currency(data.normalDayPrice) }} /
     假日（五〜日）價格：{{ $filters.currency(data.holidayPrice) }}<br>
    入住時間：{{ data.checkInAndOut.checkInEarly }}（最早） / {{ data.checkInAndOut.checkInLate }}（最晚） <br>
    退房時間：{{ data.checkInAndOut.checkOut }}</p>
    <p class="room_time room_time_sm">平日（一～四）價格：{{ $filters.currency(data.normalDayPrice) }}<br>
     假日（五〜日）價格：{{ $filters.currency(data.holidayPrice) }}<br>
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
    <div class="roomCheck">
      <div class="roomCheck_title">空房狀態查詢</div>
      <div class="roomCheck_calendar">
        <DatePicker
          v-model="range"
          :value="null"
          :columns="$screens({ default: 1, lg: 2 })"
          :min-date="new Date(new Date().getTime()+ 6 * 60 * 60 * 1000)"
          color="primary"
          :disabled-dates="disableDates"
          is-expanded
          is-range />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import FormView from '@/components/FormView.vue';

export default {
  data() {
    return {
      data: '',
      roomAmenities: [],
      roomImgaeUrl: [],
      Album_image: '',
      item: 1,
      range: { start: '', end: '' },
      isShow: false,
      FormShow: false,
      booking: [],
      disableDates: [],
      ResultShow: true,
    };
  },
  components: { FormView },
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
    getdata() {
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
          this.roomAmenities = this.data.amenities;
          this.roomImgaeUrl = this.data.imageUrl;
          this.booking = res.data.booking;
          for (let i = 0; i < this.booking.length; i += 1) {
            this.disableDates.push(this.booking[i].date);
          }
        }
      });
    },
    showImage(item) {
      this.isShow = true;
      this.Album_image = item;
    },
    prevImage() {
      let i = this.roomImgaeUrl.findIndex((item) => item === this.Album_image);
      if (i === 2) {
        i = 0;
      } else {
        i += 1;
      }
      this.Album_image = this.roomImgaeUrl[i];
    },
    nextImage() {
      let i = this.roomImgaeUrl.findIndex((item) => item === this.Album_image);
      if (i === 0) {
        i = 2;
      } else {
        i -= 1;
      }
      this.Album_image = this.roomImgaeUrl[i];
    },
    closeAlbum() {
      this.isShow = false;
    },
    OpenForm() {
      this.FormShow = true;
    },
    closeForm() {
      this.FormShow = false;
      this.range = {};
      this.getdata();
    },
  },
  computed: {
    description() {
      const descriptionlist = this.data.description.split('.');
      const arr = [];
      descriptionlist.forEach((item) => {
        arr.push(item.trim());
      });
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
    totalDays() {
      const day1 = new Date(this.range.start);
      const day2 = new Date(this.range.end);
      const totalday = Math.abs(day2 - day1);
      return parseInt(totalday / (1000 * 3600 * 24), 10);
    },
    inday() {
      const day1 = new Date(this.range.start);
      return day1;
    },
    outday() {
      const day2 = new Date(this.range.end);
      return day2;
    },
    totalPrice() {
      const day1 = new Date(this.range.start);
      const totalday = this.totalDays;
      const weekday = day1.getDay();
      const normalPrice = this.data.normalDayPrice;
      const holiPrice = this.data.holidayPrice;
      let tolPrice = 0;
      for (let i = 0; i < totalday; i += 1) {
        if (
          weekday + i === 5 || weekday + i === 6 || weekday + i === 0
        ) {
          tolPrice += holiPrice;
        } else {
          tolPrice += normalPrice;
        }
      }
      return tolPrice;
    },
  },
  created() {
    this.picloop();
    this.getdata();
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
