<template>
  <div class="daily" :style="{backgroundImage:`url(${dataPage[acitve]?.icon})`}">
    <swiper ref="swiper" class="swiper" :options="swiperOption">
      <template v-for="(item,index) in dataPage">
        <swiper-slide :key="item.id" v-if="index < 8">
          <div class="img">
            <img class="img-auto" :src="item.icon"/>
          </div>
        </swiper-slide>
      </template>
    </swiper>

    <div class="index">
      <span>{{ acitve + 1 }}</span>
      <span style="color: #ffffff96">/{{ dataPage.length - 1 }}</span>
    </div>
    <div class="blur"></div>

    <div class="eg-text">{{ dataPage[acitve]?.content }}</div>
    <div class="ch-text">{{ dataPage[acitve]?.note }}</div>

    <div class="imgList">
      <div class="list copy" @click="copy(dataPage[acitve].title,dataPage[acitve].icon)">
        <div class="img">
          <img class="img-auto" src="../assets/images/ic_r_download.png" alt="">
        </div>
        <div class="text">复制图文</div>
      </div>
      <div class="list" @click="
                  showpopup(
                    dataPage[acitve].avatar,
                    dataPage[acitve].name,
                    dataPage[acitve].time,
                    dataPage[acitve].title,
                    dataPage[acitve].icons[0].h,
                    dataPage[acitve].icons[0].url,
                    dataPage[acitve].id,
                    dataPage[acitve].check
                  )
                ">
        <div class="img" v-if="!dataPage[acitve]?.check">
          <img class="img-auto" src="../assets/images/ic_r_favor.png" alt="">
        </div>
        <div class="img" v-if="dataPage[acitve]?.check">
          <img class="img-auto" src="../assets/images/ic_r_favor_f.png" alt="">
        </div>
        <div class="text">收藏内容</div>
      </div>
      <div class="list" @click="shareMain()">
        <div class="img">
          <img class="img-auto" src="../assets/images/ic_r_share.png" alt="">
        </div>
        <div class="text">分享内容</div>
      </div>
    </div>

    <van-popup
        class="popup"
        v-model="show"
        lazy-render
        round
        position="bottom"
        :style="{ height: '30%' }"
    >
      <div class="choose-btn">
        <div class="colse-btn" @click="colseBtn">
          <img
              class="img-auto"
              src="@/assets/images/ic_layer_menu_close.png"
              alt=""
          />
        </div>
        <div class="text">选择收藏夹</div>
        <div class="add">
          <span>新建</span>
          <div class="add-btn">
            <img
                class="img-auto"
                src="@/assets/images/ic_permissions_file.png"
                alt=""
            />
          </div>
        </div>
      </div>
      <div class="file" @click="collection(dataLs)">
        <div class="img">
          <img class="img-auto" src="@/assets/images/ic_folder.png" alt=""/>
        </div>
        <div class="file-name">默认收藏夹</div>
      </div>
    </van-popup
    >
    <van-share-sheet v-model="showShare" :options="options"/>
  </div>
</template>

<script>
import Clipboard from "clipboard";

let vm = null
export default {
  data() {
    return {
      dataPage: [],
      acitve: 0,
      show: false,
      showShare: false,
      dataLs: {},
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
      swiperOption: {
        slidesPerView: 'auto',
        centeredSlides: true,
        height: 160,
        on: {
          init: function () {
            // console.log(JSON.parse(sessionStorage.daliy) ?? "Error")
            let index = JSON.parse(sessionStorage.getItem('daliy'))
            if (index !== null) {
              index = index[8] ?? 0
              this.slideTo(index, 0, false)
            }
          },
          activeIndexChange() {
            // console.log(this)
            let data = JSON.parse(sessionStorage.daliy)
            data[8] = this.activeIndex
            vm.activeIndex(data[8])
            data = JSON.stringify(data)
            sessionStorage.daliy = data
            // vm.active();
          }
        }
      }
    }
  },

  created() {
    vm = this
    this.getData()
  },


  methods: {
    activeIndex(index) {
      this.acitve = index
    },
    getData() {
      if (!sessionStorage.daliy) {
        const toast = this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 1,
        });
        this.$axios
            .get('/api/rest/app/lists/daily')
            .then((data) => {
              toast.clear();
              // console.log(data.data.data)
              this.dataPage = data.data.data.filter((item) => {
                item.check = false;
                return item
              })
              console.log(this.dataPage)
              this.saveSessionStorage(data.data.data)
              this.active();
            });
      } else {
        let data = JSON.parse(sessionStorage.daliy)
        this.dataPage = data.splice(0, 8)
        this.active();
      }
    },

    saveSessionStorage(dataPage) {
      sessionStorage.daliy = JSON.stringify(dataPage)
    },

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
            let imgName = url.split("/")[5];
            this.$axios({
              //设置图片路径
              url: `/news/word/${imgName}`,
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
    },

    collection(data) {
      let dataList = JSON.parse(localStorage.getItem("collection")) ?? [];
      if (dataList.findIndex((item) => item.idLs == data.idLs) === -1) {
        console.log(data)
        dataList.push(data);
      } else {
        dataList.splice(
            dataList.findIndex((item) => item.idLs === data.idLs),
            1
        );
      }
      let dataListStr = JSON.stringify(dataList);
      localStorage.setItem("collection", dataListStr);
      this.active();
      this.show = false;
    },

    showpopup(avatar, name, time, title, height, imgUrl, id, check) {
      let data = {
        avatarLs: avatar,
        nameLs: name,
        timeLs: time,
        titleLs: title,
        heightLs: String(height),
        imgUrlLs: imgUrl,
        idLs: id,
      };
      this.dataLs = data;
      if (check) {
        this.collection(this.dataLs);
      } else {
        this.show = true;
      }
    },
    colseBtn() {
      this.show = false;
    },

    active() {
      // this.dataPage[8] = this.acitve
      let dataArr = this.dataPage;
      let dataList = JSON.parse(localStorage.getItem("collection")) ?? [];
      for (let i = 0; i < dataArr.length - 1; i++) {
        // console.log(
        //   dataList.findIndex((item) => item.idLs === dataArr.dataItem[i].id) ===
        //     -1
        // );
        if (dataList.length !== 0) {
          if (
              dataList.findIndex(
                  (item) => item.idLs === dataArr[i].id
              ) === -1
          ) {
            dataArr[i].check = false;
          } else {
            dataArr[i].check = true;
          }
        } else {
          dataArr.filter((item) => {
            item.check = false;
          });
        }
      }

      //console.log(dataArr);
      // console.log(JSON.parse(sessionStorage.daily))
      let acitve = JSON.parse(sessionStorage?.daliy)[8] ?? 0
      dataArr[8] = acitve
      sessionStorage[`daliy`] = JSON.stringify(dataArr);
    },
    shareMain() {
      this.showShare = true;
    },
  }
}
</script>

<style lang="scss">
.daily {
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 55px;
  left: 0;
  z-index: 1;
  background-size: 100% 100%;
  background-repeat: no-repeat;

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

  .blur {
    width: 100vw;
    height: 100vh;
    /* background: rgba(255, 255, 255, 0.5); */
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(30px);
    position: fixed;
    bottom: 55px;
    left: 0;
  }

  .img-auto {
    width: 100%;
    height: 100%;
    display: block;
  }

  .swiper {
    position: fixed;
    top: 150px;
    left: 0;
    width: 100%;
    transform-style: preserve-3d;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 70%;
      margin: 0 10px;
      border-radius: 5px;
      transform: scale(0.9);

      &.swiper-slide-active {
        transform: scale(1.1);
      }

      .img {
        width: 100%;
        height: 100%;
        border-radius: 5px;

        .img-auto {
          border-radius: 5px;

        }
      }
    }
  }

  .index {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    font-size: 50px;
    color: #fff;
    z-index: 3;
    font-weight: bold;
    letter-spacing: 10px
  }

  .eg-text {
    position: fixed;
    top: 52vh;
    left: 10vw;
    color: #fff;
    font-size: 12px;
  }

  .ch-text {
    position: fixed;
    top: 57vh;
    left: 10vw;
    color: #fff;
    font-size: 12px;
  }

  .imgList {
    width: 100%;
    position: fixed;
    bottom: 115px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .list {
      .img {
        width: 30px;
        height: 30px;
        margin-left: 8px;
        margin-bottom: 5px;
      }

      .text {
        float: left;
        font-size: 12px;
        color: #fff;
      }
    }
  }

}
</style>