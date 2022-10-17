<template>
  <div class="reading">
    <div class="top">
      <div class="img" @click="$router.go(-1)">
        <img class="img-auto" src="@/assets/images/ic_left_back_black.png">
      </div>
      <div class="title">{{title}}</div>
      <div class="img">
        <img class="img-auto" src="@/assets/images/ic_share.png">
      </div>
    </div>

    <div v-html="dataHtml" class="html"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      url: null,
      dataHtml: null,
      title: null,
    }
  },

  methods: {
    getData() {
      let {id} = this.$route.query;
      let {title} = this.$route.query
      this.title = title
      this.$axios
          .get('/app/view/posts.html', {
            params: {
              id: id
            },
          })
          .then((data) => {
            console.log(data)
            this.dataHtml = data.data;
          });
    }
  },

  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.reading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-bottom: 55px;
  box-sizing: border-box;
  background-color: #fff;

  .img-auot {
    width: 100%;
    height: 100%;
    display: block
  }

  .top {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .img {
      width: 20px;
      height: 20px;
      margin-right: 15px;
    }

    .title {
      font-weight: bolder;
      margin-right: auto;
    }
  }

  .html {
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 95px;
    box-sizing: border-box;
    overflow: auto;
    overflow-x: hidden;
  }

}
</style>