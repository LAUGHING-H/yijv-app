<template>
  <div id="app">
    <!--    <keep-alive>-->
    <router-view @dataChange="dataChange" @idChange="idChange"/>
    <!--    </keep-alive>-->
    <div class="tab-bar">
      <router-link
          class="tab-bar-item icon-home"
          tag="div"
          :to="'/home/' + data + idValue"
      ><span>首页</span></router-link
      >
      <router-link class="tab-bar-item icon-daily" tag="div" to="/daily">
        <span>每日寄语</span>
      </router-link>
      <router-link class="tab-bar-item icon-videos" tag="div" to="/videos"
      ><span>暖心视频</span>
      </router-link>
      <router-link class="tab-bar-item icon-read" tag="div" to="/read"
      ><span>美文阅读</span>
      </router-link>
      <router-link class="tab-bar-item icon-user" tag="div" to="/user">
        <span>用户中心</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "recommend",
      id: null,
    };
  },

  computed: {
    idValue() {
      if (this.id != undefined) {
        return "?id=" + this.id;
      }
      return "?";
    },
  },

  methods: {
    dataChange(value) {
      this.data = value;
      // console.log(this.data);
    },

    idChange(value) {
      this.id = value;
      // console.log(this.id);
    },

    unload() {
      sessionStorage.clear();
      this.$router.go(0)
    },
  },

  mounted() {
    // 监听浏览器的刷新事件
    window.addEventListener("beforeunload", this.unload);
    // window.addEventListener('beforeunload', e => this.unload) // 注册一个匿名函数
  }
  ,

  // 2 销毁这个监听事件
  destroyed() {
    // 销毁这个监听事件，需要找到这个函数，如果使用的是匿名函数的话，无法查找这个函数，这个事件也就没有办法被移除 ，在其他页面仍然会执行这个监听事件
    window.removeEventListener("beforeunload", this.unload);
  }
  ,
};
</script>

<style lang="scss">
#app {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 55px;
  background-color: #fff;
  padding-bottom: 5px;
  box-sizing: border-box;

  .tab-bar-item {
    flex: 1;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;

    &.icon-home {
      background-image: url(./assets/images/icon_menu_home_n.png);
    }

    &.icon-daily {
      background-image: url(./assets/images/icon_menu_day_n.png);
    }

    &.icon-videos {
      background-image: url(./assets/images/icon_menu_video_n.png);
    }

    &.icon-read {
      background-image: url(./assets/images/icon_menu_essay_n.png);
    }

    &.icon-user {
      background-image: url(./assets/images/icon_menu_setting_n.png);
    }

    &.router-link-active {
      &.icon-home {
        background-image: url(./assets/images/icon_menu_home_s.png);
        color: #f2a61a;
      }

      &.icon-daily {
        background-image: url(./assets/images/icon_menu_day_s.png);
        color: #f2a61a;
      }

      &.icon-videos {
        background-image: url(./assets/images/icon_menu_video_s.png);
        color: #f2a61a;
      }

      &.icon-read {
        background-image: url(./assets/images/icon_menu_essay_s.png);
        color: #f2a61a;
      }

      &.icon-user {
        background-image: url(./assets/images/icon_menu_setting_s.png);
        color: #f2a61a;
      }

      span {
        color: #f2a61a;
      }
    }

    span {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto auto;
      text-align: center;
      font-size: 12px;
      color: #868686;
    }
  }
}
</style>
