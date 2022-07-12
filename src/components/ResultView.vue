<template>
  <div class="Result_wrap">
    <div class="Result_contanier">
      <div :class="{ show: isDone }" class="Result_type" >
        <div class="Result_image">
          <img src="../assets/image/icons/list_null.svg" alt="">
          <div class="Result_image_inner">
            <img class="imageicon" src="../assets/image/icons/success.svg" alt="">
          </div>
        </div>
        <h1 class="Result_title">預約成功</h1>
        <p class="Result_content">請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，<br> 若未收到簡訊請來電確認，謝謝您</p>
      </div>
      <div :class="{ show: isFail }" class="Result_type" >
        <div class="Result_image">
          <img  src="../assets/image/icons/list_null.svg" alt="">
          <div class="Result_image_inner">
            <img class="imageicon" src="../assets/image/icons/icons8-cancel-w.svg" alt="">
          </div>
        </div>
        <h1 class="Result_title">預約失敗</h1>
        <p class="Result_content">哎呀！晚了一步！您預約的日期已經被預約走了，<br>再看看其它房型吧</p>
      </div>
      <div class="closebtn">
         <a href="" class="Result_close">
         <img  src="../assets/image/icons/icons8-cancel-w.svg" alt="icons8-cancel"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['isDone', 'isFail'],
};
</script>
