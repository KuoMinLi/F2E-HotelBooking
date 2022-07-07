<template>
  <div class="formwrap">
    <div class="form_opacity">
      <div class="form_contanier">
        <div class="user_imf">
          <ul class="user_imf_list">
            <li class="user_imf_item">
              <label for="form_booking_name">姓名
                <input class="input" type="text"/>
              </label>
            </li>
            <li class="user_imf_item">
              <label for="form_booking_phone">手機號碼
                <input class="input" type="text">
              </label>
            </li>
            <li class="user_imf_item">
              <label for="form_booking_inday">入住日期
                  <div class="booking_calendar" >
                      <Calendar />
                      <DatePicker
                        v-model="book_inday"
                        :min-date="new Date(new Date().getTime() + 6 * 60 * 60 * 1000)"
                        :disabled-dates="disableDates"
                        :masks="masks"
                        :attributes="attribute"
                        color="primary"
                        is-required >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            class="booking_form_input"
                            :value="inputValue"
                            v-on="inputEvents"
                          />
                        </template>
                      </DatePicker>
                  </div>
              </label>
            </li>
            <li class="user_imf_item">
              <label for="form_booking_outday">退房日期
                <div class="booking_calendar" >
                      <Calendar />
                      <DatePicker
                        v-model="book_outday"
                        :min-date="new Date(book_inday.getTime() + 24 * 60 * 60 * 1000)"
                        :disabled-dates="disableDates"
                        :masks="masks"
                        :attributes="attribute"
                        color="primary"
                        is-required >
                        <template v-slot="{ inputValue, inputEvents }">
                          <input
                            class="booking_form_input"
                            :value="inputValue"
                            v-on="inputEvents"
                          />
                        </template>
                      </DatePicker>
                  </div>
              </label>
            </li>
            <li>
              <p class="total_day">{{ totalDays }}天，{{ normalDays }}晚平日</p>
            </li>
          </ul>
          <div class="form_price">
            <p class="form_price_title">總計</p>
            <p class="form_total_price">${{ $filters.currency(pricetotal
             || data.normalDayPrice) }}</p>
          </div>
          <button class="form_bookingbtn" @click="test()">確認送出</button>
          <div class="booking_footer">此預約系統僅預約功能，並不會對您進行收費</div>
        </div>
        <div class="booking_roomimf">
          <div class="form_room_title">
            <a href="#" class="form_close" @click.prevent="closeForm()">
              <img :src="require(`../assets/image/icons/icons8-cancel.svg`)"
              alt="icons8-cancel"></a>
            <h1>{{ data.name }}</h1>
          </div>
          <p class="form_room_description">{{ data.descriptionShort.GuestMax}}人・
            {{ data.descriptionShort.Bed.length}}張 {{ data.descriptionShort.Bed[0]}} 床組・
            附早餐・衛浴 {{ data.descriptionShort['Private-Bath']}} 間・
            {{ data.descriptionShort.Footage}} 平方公尺<br>
            平日（一～四）價格：{{ $filters.currency(data.normalDayPrice) }} /
            假日（五〜日）價格：{{ $filters.currency(data.holidayPrice) }}</p>
          <div class="form_room_iconGroup">
            <div
              class="booking_icon"
              v-for="(item, index) in amenities"
              :key="index"
            >
            <img
                class="booking_icon_image"
                :src="require(`../assets/image/icons/${item.name}.svg`)"
                :alt="item.img"
            />
            <span class="booking_icon_text">{{ item.name }}</span>
            </div>
          </div>
          <div class="form_room_title_second">訂房資訊 </div>
            <ul class="form_room_title_imf_item">
              <li>・入住時間：{{ data.checkInAndOut.checkInEarly }}（最早） /
               {{ data.checkInAndOut.checkInLate }}（最晚）
               退房時間：{{ data.checkInAndOut.checkOut }}，請自行確認行程安排。</li>
              <li>・平日定義週一至週四；假日定義週五至週日及國定假日。</li>
              <li>・好室旅店全面禁止吸菸。</li>
              <li>・若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。</li>
            </ul>
          <div class="form_room_title_second">預約流程 </div>
          <div class="form_room_booking_flow">
            <div class="flow_card">
              <img class="flow_card_image"
              :src="require(`../assets/image/icons/compose.svg`)" alt="compose">
              <p class="flow_card_text">送出線上預約單</p>
            </div>
            <img class="form_arrow_icon"
            :src="require(`../assets/image/icons/surface1.svg`)" alt="surface1">
            <div class="flow_card">
              <img class="flow_card_image"
              :src="require(`../assets/image/icons/search_chat.svg`)" alt="search_chat">
              <p class="flow_card_text">系統立即回覆是否預訂成功<br>並以簡訊發送訂房通知<br>(若未收到簡訊請來電確認)</p>
            </div>
            <img class="form_arrow_icon"
            :src="require(`../assets/image/icons/surface1.svg`)" alt="surface1">
            <div class="flow_card">
              <img class="flow_card_image"
              :src="require(`../assets/image/icons/payment.svg`)" alt="payment">
              <p class="flow_card_text">入住當日憑訂房通知<br>以現金或刷卡付款即可<br>(僅接受VISA.JCB.銀聯卡)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      Amenities: {},
      book_inday: '',
      book_outday: '',
      attribute: [{ key: 'selectedDay', highlight: true, dates: '' }],
      masks: {
        input: 'YYYY - MM - DD',
      },
    };
  },
  props: ['data', 'roomAmenities', 'pricetotal', 'inday', 'outday'],
  methods: {
    closeForm() {
      this.$emit('closeForm');
    },
    test() {
      console.log(this.Amenities);
      this.Amenities.forEach((item) => {
        if (item.state.indexOf(false) === -1) {
          console.log(`${item} 111`);
        }
      });
    },
    changeday() {
      this.book_inday = this.inday;
      this.book_outday = this.outday;
    },
  },
  computed: {
    amenities() {
      const obj = this.roomAmenities;
      const arr1 = Object.keys(obj);
      const arr2 = Object.values(obj);
      const arr = [];
      for (let i = 0; i < arr1.length; i += 1) {
        arr.push({ name: arr1[i], state: arr2[i] });
      }
      const objtrue = [];
      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].state === true) {
          objtrue.push({ name: arr[i].name, state: arr[i].state });
        }
      }
      return objtrue;
    },
    totalDays() {
      const totalday = Math.abs(this.book_outday - this.book_inday);
      return parseInt(totalday / (1000 * 3600 * 24) + 1, 10);
    },
    normalDays() {
      const weekday = this.book_inday.getDay();
      const totalday = this.totalDays - 1;
      let normaldays = 0;
      for (let i = 0; i < totalday; i += 1) {
        if (
          weekday + i === 5 || weekday + i === 6 || weekday + i === 0
        ) {
          normaldays += 0;
        } else {
          normaldays += 1;
        }
      }
      return normaldays;
    },
  },
  watch: {
    book_inday() {
      if (this.book_inday >= this.book_outday) {
        this.book_outday = new Date(this.book_inday.getTime() + 24 * 60 * 60 * 1000);
      }
    },
  },
  created() {
    this.changeday();
  },
};
</script>
