<template>
  <div class="favorites">
    <div class="top">
      <van-nav-bar title="本地收藏">
        <template #left>
          <div class="img" @click="goback">
            <img class="img-auto" src="../assets/images/ic_left_back_black.png">
          </div>
        </template>
      </van-nav-bar>
    </div>

    <favoritesListComponent></favoritesListComponent>

  </div>
</template>

<script>
import favoritesListComponent from "@/components/favoritesListComponent.vue";

export default {
  name: "favoritesListView.vue",
  data() {
    return {
    }
  },
  mounted() {
    this.isShow = false;
    this.$nextTick(() => {
      this.isShow = true;
    })
  },

  methods: {
    goback() {
      this.$router.go(-1)
    },
  },
  components: {
    favoritesListComponent,
  }
  ,
}
</script>

<style lang="scss">
.favorites {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 998;
  background-color: #fff;
  top: 0;
  left: 0;

  .img-auto {
    width: 100%;
    height: 100%;
    display: block;
  }

  .top {
    width: 100%;
    height: 40px;

    .van-nav-bar {
      width: 100%;
      height: 100%;

      .van-nav-bar__content {
        height: 100%;

        .van-nav-bar__title {
          font-size: 15px;
          font-weight: bolder;


          &::after {
            content: "";
            width: 16px;
            height: 5px;
            background-color: #f2a81f;
            position: absolute;
            bottom: 3px;
            left: 0;
            right: 0;
            margin: 0 auto;
            border-radius: 999px;
          }
        }
      }
    }

    .van-nav-bar__left {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      .img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>