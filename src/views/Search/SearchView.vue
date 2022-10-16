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
        <input type="text" class="text" v-model="value" maxlength="12"/>
        <div class="btn" v-show="value !== ''" @click="save()">搜索</div>
        <div class="btn" v-show="value == ''" @click="goback()">取消</div>
        <div v-show="value !== ''" class="clear-btn" @click="clear()">
          <img
              class="img-auto"
              src="@/assets/images/ic_search_close.png"
              alt=""
          />
        </div>
      </div>
    </div>

    <SearchMainView :history="history" v-if="!show" @showChange="showChange" @keys="keys"
                    @clearAll="clearAll"
                    @clearList="clearList"/>
    <HomeMainComponent v-else-if="show" :url="url" :data="data" :id="value"
    ></HomeMainComponent>

  </div>
</template>

<script>
import "@vant/touch-emulator";
import SearchMainView from "@/views/Search/SearchMainView.vue"
import HomeMainComponent from "@/components/HomeMainComponent.vue"

export default {
  data() {
    return {
      value: "",
      history: [],
      show: false,
      data: "search",
    };
  },

  components: {
    SearchMainView,
    HomeMainComponent
  },

  computed: {
    url() {
      return `/api/rest/app/lists/${this.data}?type=all&key=${this.value}`;
      // https://xqyl.app.edcdn.cn/api/rest/app/lists/search
    },
  },

  methods: {
    save() {
      //(this.history, 1322)
      if (this.history.indexOf(this.value) == -1) {
        this.history.push(this.value);
      }
      this.show = true;
    },
    clear() {
      this.value = ''
      this.show = false
    },
    goback() {
      this.$router.go(-1)
    },

    clearList(value) {
      let newArr = this.history.filter(item => item != value)
      this.history = newArr
    },
    clearAll(value) {
      this.history = value
    },
    keys(value) {
      let text = value
      if (this.history.indexOf(value) == -1) {
        this.history.push(value);
      }
      this.value = text
    },
    showChange(value) {
      this.show = value;
    }
  }
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
  background-color: #f2f2f2;

  .img-auto {
    width: 100%;
    height: 100%;
  }

  .top {
    width: 100vw;
    height: 40px;
    background-color: #fff;
    //position: fixed;
    //top: 0;
    //left: 0;

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