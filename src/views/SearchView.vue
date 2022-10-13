<template>
  <div class="search">
    <div class="top">
      <div class="input">
        <div class="img">
          <img
            class="img-auto"
            src="@/assets/images/ic_btn_search.png"
            alt=""
          />
        </div>
        <input type="text" class="text" v-model="value" />
        <div class="btn" v-show="value !== ''">搜索</div>
        <div class="btn" v-show="value == ''">取消</div>
        <div v-show="value !== ''" class="clear-btn">
          <img
            class="img-auto"
            src="@/assets/images/ic_search_close.png"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="main">
      
    </div>
  </div>
</template>

<script>
import "@vant/touch-emulator";
export default {
  data() {
    return {
      value: "",
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.search {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 999;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #fff;

  .img-auto {
    width: 100%;
    height: 100%;
  }

  .top {
    width: 100vw;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;

    .input {
      height: 100%;
      position: relative;
      padding: 0 10px;
      box-sizing: border-box;
      .img {
        width: 25px;
        height: 25px;
        float: left;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 20px;
        margin: auto 0;
      }

      .text {
        height: 30px;
        width: 290px;
        border: none;
        outline: none;
        padding: 0;
        margin-top: 5px;
        border-radius: 20px;
        background-color: #f2f2f2;
        padding-left: 45px;
        font-size: 15px;
        line-height: 30px;
        box-sizing: border-box;
      }
      .btn {
        width: 65px;
        height: 100%;
        line-height: 41px;
        font-size: 15px;
        text-align: center;
        float: right;
      }

      .clear-btn {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 265px;
        top: 10px;
      }
    }
  }
}
</style>