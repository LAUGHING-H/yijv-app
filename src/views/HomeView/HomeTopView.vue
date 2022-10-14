<template>
  <van-row class="row">
    <van-col class="col" span="2">
      <router-link to="/search">
        <div class="icon-search">
          <img
              class="img-auto"
              src="@/assets/images/ic_btn_search.png"
              alt=""
          />
        </div>
      </router-link>
    </van-col>
    <van-col class="col" span="20">
      <van-tabs
          @click="getData"
          v-model="active"
          line-width="15px"
          line-height="5px"
          title-active-color="black"
          swipeable
          animated
      >
        <van-tab
            v-for="item in tabs"
            :title="item.title"
            :key="item.title"
            title-class="tab"
            :to="item.path"
        >
        </van-tab>
      </van-tabs>
    </van-col>
    <van-col class="col" span="2">
      <div class="icon-search">
        <img
            class="img-auto"
            src="@/assets/images/ic_icon_fav_btn.png"
            alt=""
        />
      </div>
    </van-col>
  </van-row>
</template>


<script>
export default {
  data() {
    return {
      active: 1,
      tabs: [
        {
          title: "最新",
          path: "/home/new",
        },

        {
          title: "热门推荐",
          path: "/home/recommend/",
        },

        {
          title: "心情签名",
          path: "/home/topic_posts?id=1001",
        },

        {
          title: "情感语录",
          path: "/home/topic_posts?id=1002",
        },

        {
          title: "动漫语录",
          path: "/home/topic_posts?id=1003",
        },
        {
          title: "人生语录",
          path: "/home/topic_posts?id=1004",
        },
        {
          title: "英文语录",
          path: "/home/topic_posts?id=1005",
        },
        {
          title: "名人语录",
          path: "/home/topic_posts?id=1006",
        },
        {
          title: "儒家语录",
          path: "/home/topic_posts?id=1008",
        },
      ],
    };
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL); //这里有没有都无所谓，最好是有以防万一
      window.addEventListener("popstate", this.goBack, false);
      // 回退时执行goback方法
    }
  },

  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },

  methods: {
    getData() {
      this.$nextTick(() => {
        let {data} = this.$route.params;
        let {id} = this.$route.query;

        this.$emit("dataChange", data);
        this.$emit("idChange", id);
      });
    },

    goBack() {
      this.$nextTick(() => {
        let {data} = this.$route.params;
        let {id} = this.$route.query;

        this.$emit("dataChange", data);
        this.$emit("idChange", id);

        if (data == "new" && id == undefined) {
          this.active = 0;
        } else if (data == "recommend" && id == undefined) {
          this.active = 1;
        } else if (data == "topic_posts" && id == 1001) {
          this.active = 2;
        } else if (data == "topic_posts" && id == 1002) {
          this.active = 3;
        } else if (data == "topic_posts" && id == 1003) {
          this.active = 4;
        } else if (data == "topic_posts" && id == 1004) {
          this.active = 5;
        } else if (data == "topic_posts" && id == 1005) {
          this.active = 6;
        } else if (data == "topic_posts" && id == 1006) {
          this.active = 7;
        } else if (data == "topic_posts" && id == 1008) {
          this.active = 8;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.row {
  width: 100vw;
  height: 40px;

  .img-auto {
    width: 100%;
    height: 100%;
    display: block;
  }

  .col {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    .van-tabs__nav--line {
      .van-tabs__nav--complete {
        padding: 0;
      }
    }

    .van-tab--active {
      font-size: 16px;
      font-weight: bold;
    }

    .van-tabs__nav--line {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      background-color: #f2a61a;
    }

    .tab {
      padding: 0 10px;
      font-size: 13px;
      color: #454545;

      &:first-child {
        padding-left: 0;
      }
    }

    .main {
      position: fixed;
      top: 40px;
      left: 0;
    }

    .icon-search {
      width: 25px;
      height: 25px;
      margin-left: 5px;
    }
  }
}
</style>