<template>
  <div class="main">
    <div class="notification">
      <div class="img">
        <img class="img-auto" src="../../assets/images/ic_tip_tag.png" alt="">
      </div>
      <span>可以使用[ 关键字 ]搜索哦！</span>
    </div>
    <div class="item">
      <van-tag @click="keys(item.text)" class="tag" :color="item.color" type="primary" size="medium" :key="item.text"
               v-for="item in list">
        {{ item.text }}
      </van-tag>
    </div>

    <div class="history">
      <div class="top">
        <div class="recording">
          <div class="active"></div>
          <div class="text">搜索记录</div>
        </div>
        <div class="clear-btn" @click="clearAll()">
          <div class="img">
            <img class="img-auto" src="../../assets/images/ic_delete.png">
          </div>
          <div class="text">清空记录</div>
        </div>
      </div>
      <div class="item">
        <div class="list" v-for="item in history" :key="item" @click="keys(item)">
          <div class="left">
            <div class="img">
              <img class="img-auto" src="../../assets/images/ic_history_record.png">
            </div>
            <div class="text">{{ item }}</div>
          </div>
          <div class="del-btn" @click="clear(item)">
            <img class="img-auto" src="../../assets/images/ic_btn_close.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const LISTKEYS = [
  {
    text: "风景",
    color: "#FF0000"
  },
  {
    text: "努力",
    color: "#FF4500"
  },
  {
    text: "梦想",
    color: "#FF1493"
  },
  {
    text: "幸福",
    color: "#FF00FF"
  },
  {
    text: "虚伪",
    color: "#A52A2A"
  },
  {
    text: "拥抱",
    color: "#DC143C"
  },
  {
    text: "勇气",
    color: "#D02090"
  },
  {
    text: "沉默",
    color: "#D2691E"
  },
  {
    text: "亦舒",
    color: "#D2B48C"
  },
  {
    text: "恋爱",
    color: "#E9967A"
  },
  {
    text: "悲伤",
    color: "#FFA500"
  },
  {
    text: "搞笑",
    color: "#FFC0CB"
  },
  {
    text: "理解",
    color: "#BA55D3"
  },
  {
    text: "励志",
    color: "#EE82EE"
  },
]


export default {
  props: {
    history: {
      type: Array,
    }
  },
  data() {
    return {
      list: LISTKEYS,
    }
  },

  methods: {
    clear(content) {
      this.$emit('clearList', content)
    },
    clearAll() {
      this.$emit('clearAll', [])
    },
    keys(text) {
      this.$emit('keys', text)
      this.$emit('showChange', true)
    }
  }
}

</script>


<style lang="scss" scoped>
.main {
  width: 100vw;
  background-color: #fff;
  padding: 0 10px;
  padding-top: 10px;
  box-sizing: border-box;

  .img-auto {
    width: 100%;
    height: 100%;
    display: block;
  }

  .notification {
    width: 100vw;
    height: 20px;
    font-size: 14px;
    color: gray;
    line-height: 20px;
    margin-bottom: 15px;

    .img {
      width: 20px;
      height: 20px;
      float: left;
    }
  }

  .item {
    width: 100%;
    overflow: hidden;

    .tag {
      width: calc((100% / 7 + 1px) - 10px);
      height: 25px;
      margin-bottom: 5px;
      margin-right: 10px;
      text-align: center;
      line-height: 25px;
      padding-left: 9px;

      &:nth-of-type(7n) {
        margin-right: 0;
      }
    }
  }

  .history {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    margin-top: 10px;

    .top {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;

      .recording {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .active {
          width: 10px;
          height: 20px;
          border-radius: 999px;
          background-color: #f2a81f;
          margin-right: 10px;
        }
      }

      .clear-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        .img {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }

    .item {
      width: 100%;

      .list {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        box-sizing: border-box;

        .left {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;

          .img {
            width: 15px;
            height: 15px;
            margin-right: 20px;
          }

          .text {

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }

        .del-btn {
          width: 15px;
          height: 15px;
        }
      }
    }
  }

}
</style>