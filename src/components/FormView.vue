<template>
  <div class="formwrap">
    <div class="form_opacity">
      <div class="form_contanier">
        <div class="user_imf">
          <ul class="user_imf_list">
            <li class="user_imf_item">
              <label for="form_booking_name">姓名
                <input type="text"/>
              </label>
            </li>
            <li class="user_imf_item">
              <label for="form_booking_phone">手機號碼
                <input type="text">
              </label>
            </li>
            <li class="user_imf_item">
              <label for="form_booking_inday">入住日期
                <input type="text">
              </label>
            </li>
            <li class="user_imf_item">
              <label for="form_booking_outday">退房日期
                <input type="text">
              </label>
            </li>
            <li>
              <p class="total_day">2天，1晚平日</p>
            </li>
          </ul>
          <div class="form_price">
            <p class="form_price_title">總計</p>
            <p class="form_total_price">$1,380</p>
          </div>
          <button class="form_bookingbtn">確認送出</button>
          <div class="booking_footer">此預約系統僅預約功能，並不會對您進行收費</div>
        </div>
        <div class="booking_roomimf">
          <div class="form_room_title">
            <h1>Single Room</h1>
          </div>
          <p class="form_room_description">1人・ 單人床・附早餐・ 衛浴1間・18平方公尺<br>
          平日（一～四）價格：1380 / 假日（五〜日）價格：1500</p>
          <div class="form_room_iconGroup"></div>
            <div class="form_room_icon">
              <img class="form_room_icon_image" src="" alt="">
              <span class="form_room_icon_text"></span>
            </div>
          <div class="form_room_title_second">訂房資訊</div>
            <ul class="form_room_title_imf_item">
              <li>・入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。</li>
              <li>・平日定義週一至週四；假日定義週五至週日及國定假日。</li>
              <li>・好室旅店全面禁止吸菸。</li>
              <li>・若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六 10:00 - 18:00 )。</li>
            </ul>
          <div class="form_room_title_second">預約流程</div>
          <div class="form_room_booking_flow">
            <div class="flow_card">
              <img class="flow_card_image" src="" alt="">
              <p class="flow_card_text">送出線上預約單</p>
            </div>
            <img class="arrow_icon" src="" alt="">
            <div class="flow_card">
              <img class="flow_card_image" src="" alt="">
              <p class="flow_card_text">系統立即回覆是否預訂成功 並以簡訊發送訂房通知 (若未收到簡訊請來電確認)</p>
            </div>
            <img class="arrow_icon" src="" alt="">
            <div class="flow_card">
              <img class="flow_card_image" src="" alt="">
              <p class="flow_card_text">入住當日憑訂房通知 以現金或刷卡付款即可 (僅接受VISA.JCB.銀聯卡)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>
