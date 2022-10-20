<template>
  <div class="item" ref="item">
    <div
        class="list"
        v-for="(item, index) in dataPage"
        :key="index"
    >
      <div class="top">
        <div class="Profile-photo">
          <img class="img-auto yuan" :src="item.avatarLs" alt=""/>
        </div>
        <div class="name">{{ item.nameLs }}</div>
        <div class="icon-sl" @click="showT">
          <img
              class="img-auto"
              src="@/assets/images/ic_feeds_more.png"
              alt=""
          />
        </div>
        <div class="time">
          <div class="icon-time">
            <img
                class="img-auto"
                src="@/assets/images/icon_time.png"
                alt=""
            />
          </div>
          <div class="date">{{ date(item.timeLs) }}</div>
        </div>
      </div>
      <div class="text">{{ item.titleLs }}</div>
      <div
          class="img"
          :style="{
              width: '100%',
              height: `calc(${
                item.heightLs == 0 ? 497 : item.heightLs
              }px /1.4)`,
            }"
      >
        <img
            class="img-auto yuan-border"
            radius="5"
            @click="imgLook(item.imgUrlLs)"
            :src="item.imgUrlLs"
            :v-lazy="item.imgUrlLs"
        />
      </div>

      <div class="main">
        <div
            class="list-main copy"
            @click="copy(item.titleLs, item.imgUrlLs)"
        >
          <div class="icon">
            <img class="img-auto" src="@/assets/images/copy.png" alt=""/>
          </div>
          <div class="main-text">复制内容</div>
        </div>
        <div class="list-main">
          <div class="icon">
            <img
                class="img-auto"
                src="@/assets/images/activexing.png"
                alt=""
            />
          </div>
          <div
              class="main-text"
              @click="collection(item.idLs)"
          >
            收藏内容
          </div>
        </div>
        <div class="list-main" @click="shareMain()">
          <div class="icon">
            <img class="img-auto" src="@/assets/images/share.png" alt=""/>
          </div>
          <div class="main-text">分享内容</div>
        </div>
      </div>
    </div>
    <div class="pont" v-show="pont" @click="backTop">
      <div class="img">
        <img
            ref="active"
            class="img-auto"
            src="@/assets/images/ic_list_scroll_top_arraw.png"
            alt=""
        />
      </div>
    </div>
    <van-popup
        class="popup-two"
        v-model="showTwo"
        lazy-render
        round
        position="bottom"
        :style="{ height: '30%' }"
    >
      <div class="list">复制内容</div>
      <div class="list">下载配图</div>
      <div class="list">不感兴趣</div>
      <div class="list">违规举报</div>
      <div class="list">一键转发朋友圈</div>
      <div class="cancel">取消</div>

    </van-popup
    >
    <van-share-sheet v-model="showShare" :options="options"/>
    <MessageNoneComponent v-if="showMsg" :text="`你还没收藏过心情呢`"></MessageNoneComponent>
  </div>
</template>


<script>
import Clipboard from "clipboard";
import MessageNoneComponent from "@/components/MessageNoneComponent.vue"
import {ImagePreview} from "vant";

export default {
  name: "favoritesListComponent.vue",
  data() {
    return {
      dataPage: [],
      pont: false,
      showShare: false,
      dataLs: {},
      showMsg: false,
      showTwo: false,
      options: [
        [
          {name: "微信好友", icon: "wechat"},
          {name: "QQ好友", icon: "qq"},
          {name: "朋友圈", icon: "wechat-moments"},
          {name: "微博", icon: "weibo"},
        ],
        [
          {name: "复制链接", icon: "link"},
          {name: "分享海报", icon: "poster"},
          {name: "二维码", icon: "qrcode"},
          {name: "小程序码", icon: "weapp-qrcode"},
        ],
      ],
    };
  },

  computed: {
    date: function () {
      return function (ItemTime) {
        let date = new Date().getTime();
        let time = ItemTime * 1000;
        let timeInterval = date - time;
        if (timeInterval > 2592000000) {
          let mouth = new Date(time).getMonth() + 1;
          let day = new Date(time).getDate();
          mouth = mouth < 10 ? "0" + mouth : mouth;
          day = day < 10 ? "0" + day : day;
          return mouth + "-" + day;
        } else if (timeInterval < 3600000) {
          let minute = parseInt(timeInterval / 60000);
          return minute + "分钟前";
        } else {
          let beforeTime = parseInt(timeInterval / 3600000);
          if (beforeTime > 24) {
            let dayTime = parseInt(beforeTime / 24);
            return dayTime + "天前";
          }
          return beforeTime + "小时前";
        }
      };
    },
  },

  components: {
    MessageNoneComponent
  },

  methods: {
    showT() {
      this.showTwo = true
    },
    imgLook(url) {
      ImagePreview({
        images: [url],
      });
    },

    getData() {
      if (localStorage.collection) {
        let MainData = JSON.parse(localStorage?.collection)
        this.dataPage = MainData
      } else {
        console.log(123)
        localStorage.collection = JSON.stringify([])
      }


      if (this.dataPage.length === 0) {
        this.showMsg = true
      }
    },


    backTop() {
      this.$refs.item.scrollTop = 0;
    }
    ,

    copy(content, url) {
      var clipboard = new Clipboard(".copy", {
        text: function () {
          return content;
        },
      });

      // 复制成功

      clipboard.on("success", () => {
        this.$toast({
          message: "内容已复制到剪贴板,配图已开始下载...",
          position: "bottom",
          className: "copyToast",
          onOpened: function () {
            let imgName = url.split("/")[4];
            this.$axios({
              //设置图片路径
              url: `/bmiddle/${imgName}`,
              //设置请求方法为get请求
              method: "get",
              //设置相应类型为blob
              responseType: "blob",
            }).then(
                //得到的是一个blob对象
                (res) => {
                  let url = window.URL.createObjectURL(res.data);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = name;
                  a.click();
                  this.$toast({
                    message: "图片保存完成",
                    position: "bottom",
                    className: "imgDownload",
                  });
                }
            );
          },
        });

        // 释放内存

        clipboard.destroy();
      });

      // 复制失败

      clipboard.on("error", () => {
        // 不支持复制

        this.$toast({
          message: "复制失败，请再次尝试",
          position: "bottom",
        });
        // 释放内存
        clipboard.destroy();
      });
    }
    ,

    collection(data) {
      let dataList = JSON.parse(localStorage.getItem("collection")) ?? [];

      dataList.splice(
          dataList.findIndex((item) => item.idLs === data),
          1
      );

      let dataListStr = JSON.stringify(dataList);
      localStorage.setItem("collection", dataListStr);
      this.show = false;
      this.getData()
    }
    ,


    colseBtn() {
      this.show = false;
    }
    ,

    shareMain() {
      this.showShare = true;
    }
    ,
  },


  created() {
    //console.log(this.url)
    this.getData();
  },

};

</script>

<style lang="scss" scoped>
.item {
  position: fixed;
  left: 0;
  top: 40px;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  padding-bottom: 30px;
  background-color: #f2f2f2;

  .popup {
    width: 100%;
    height: 300px !important;

    .choose-btn {
      width: 100%;
      height: 40px;

      .colse-btn {
        width: 20px;
        height: 20px;
        float: left;
        margin-top: 10px;
        margin-left: 10px;
      }

      .text {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin: 0 auto;
        width: 200px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
      }

      .add {
        height: 40px;
        float: right;
        margin-right: 10px;

        span {
          height: 40px;
          line-height: 40px;
          float: right;
          font-size: 12px;
          margin-left: 5px;
          color: #f2a81f;
        }

        .add-btn {
          width: 20px;
          height: 20px;
          float: left;
          margin-top: 10px;
        }
      }
    }

    .file {
      width: 100%;
      height: 40px;
      padding: 0 10px;
      box-sizing: border-box;

      .img {
        width: 40px;
        height: 40px;
        float: left;
      }

      .file-name {
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }

  .popup-two {
    width: 100%;
    box-sizing: border-box;
    height: 250px !important;
    background-color: #f2f2f2;

    .list {
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      padding: 0;
      margin-bottom: 0;
      background-color: #fff;
      font-size: 14px;
    }

    .cancel {
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      padding: 0;
      margin-bottom: 0;
      background-color: #fff;
      font-size: 14px;
      color: gray;
      margin-top: 10px;
    }
  }

  .pont {
    position: fixed;
    top: 550px;
    right: 10px;
    width: 54px;
    height: 56px;

    .img {
      width: 100%;
      height: 100%;
    }
  }

  .img-auto {
    width: 100%;
    height: 100%;
    display: block;
  }

  .list {
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding-top: 10px;
    background-color: #fff;

    .top {
      width: 100vw;
      height: 30px;
      margin-bottom: 10px;

      .Profile-photo {
        float: left;
        width: 30px;
        height: 30px;

        .yuan {
          border-radius: 50%;
        }
      }

      .name {
        float: left;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        margin-left: 10px;
        color: #868686;
      }

      .icon-sl {
        width: 25px;
        height: 15px;
        float: right;
        margin-right: 20px;
        margin-top: 7px;
      }

      .time {
        float: right;
        height: 30px;
        margin-right: 30px;

        .icon-time {
          width: 20px;
          height: 20px;
          float: left;
          margin-top: 5px;
          margin-right: 5px;
        }

        .date {
          float: left;
          font-size: 12px;
          color: #868686;
          height: 30px;
          line-height: 30px;
        }
      }
    }

    .text {
      width: 100%;
      font-size: 15px;
      line-height: 25px;
      margin-bottom: 10px;
    }

    .img {
      border-radius: 5px;
      margin-bottom: 10px;

      .yuan-border {
        border-radius: 5px;
      }
    }

    .main {
      width: 100%;
      height: 40px;
      border-top: 1px solid #d8d5d53f;

      .list-main {
        width: calc(100% / 3);
        height: 100%;
        float: left;
        font-size: 15px;
        position: relative;

        &::after {
          content: " ";
          width: 1px;
          height: 30px;
          background-color: #d8d5d53f;
          position: absolute;
          left: 0;
          top: 5px;
        }

        &:first-child::after {
          content: "";
          width: 0;
          height: 0;
        }

        .icon {
          width: 20px;
          height: 20px;
          float: left;
          margin-left: 20px;
          margin-top: 10px;
          margin-right: 2px;
        }

        .main-text {
          height: 40px;
          float: left;
          line-height: 40px;
          text-align: center;
          color: #868686;
        }
      }
    }
  }
}
</style>