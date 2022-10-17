<template>
  <div class="msg">
    <van-empty
        class="custom-image"
        :image="url"
        :description="text"
    />
  </div>
</template>

<script>
export default {
  name: "MessageNoneComponent",
  props: {
    text: {
      type: String,
    }
  },
  data() {
    return {
      url: require("@/assets/images/ic_empty.png")
    }
  }
}
</script>

<style>
.msg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}

.custom-image .van-empty__description {
  margin-top: 16px;
  padding: 0 60px;
  color: black;
  font-size: 16px;
  line-height: 20px;
  font-weight: bolder;
}
</style>