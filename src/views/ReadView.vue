<template>
  <div class="read">
    <div class="nav-bar">
      <van-nav-bar title="美文阅读">
        <template #left>
          <div class="left" @click="goto()">
            <img class="img-auto" src="../assets/images/ic_icon_fav_btn.png">
          </div>
        </template>
        <template #right>
          <div class="right" v-show="!random" @click="randomChange(true)">
            <img class="img-auto" src="../assets/images/ic_mode_random_n.png">
          </div>

          <div class="right" v-show="random" @click="randomChange(false)">
            <img class="img-auto" src="../assets/images/ic_mode_random.png">
          </div>
        </template>
      </van-nav-bar>
    </div>

    <ReadComponent :url="url" :data="data" :id="id" :random="random"></ReadComponent>

    <router-view></router-view>
  </div>
</template>

<script>
import ReadComponent from "@/components/ReadComponent.vue";

export default {
  data() {
    return {
      random: false,
      data: 'type_posts',
      id: '8',
      textId: null,
    }
  },

  computed: {
    url() {
      return `/api/rest/app/lists/${this.data}?type=${this.id}`;
    },
  },

  methods: {
    randomChange(value) {
      this.random = value;
    },
    goto(){
      this.$router.push({path: '/favorites'});
    }
  },

  components: {
    ReadComponent
  }
}
</script>

<style lang="scss">
.read {
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 55px;
  left: 0;

  .img-auto {
    width: 100%;
    height: 100%;
    display: block;
  }

  .nav-bar {
    width: 100vw;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;

    .van-nav-bar {
      width: 100%;
      height: 100%;

      .van-nav-bar__content {
        height: 100%;

        .left {
          width: 30px;
          height: 30px;
        }

        .right {
          width: 30px;
          height: 30px;
        }

        .van-nav-bar__title {
          font-size: 15px;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>