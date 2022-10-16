<template>
  <div class="user">
    <div class="top">
      <div class="img">
        <img class="img-auto" src="../assets/images/icon_setting_black.png">
      </div>

      <div class="img">
        <img class="img-auto" src="../assets/images/ic_night_mode.png">
      </div>
    </div>

    <div class="center">
      <div class="avatar">
        <img class="img-auto" src="../assets/images/ic_launcher_round.png">
      </div>
      <div class="text">
        <div class="name">一句话心情语录</div>
        <div class="signature">一句话，一幅图，一种心情，一个故事</div>
      </div>
    </div>

    <div class="vip">
      <div class="vip-text">
        <p class="p">开通会员尊享特权</p>
        <p>去除所有广告，了解更多权益</p>
      </div>
      <span class="arow"></span>
    </div>

    <div class="bottom">
      <van-cell-group class="group">
        <van-cell title="编辑微信" is-link/>
        <van-cell title="我的收藏" is-link to="/favorites"/>
        <van-cell title="浏览历史" is-link/>
      </van-cell-group>
      <van-cell-group class="group">
        <van-cell title="系统设置" is-link/>
        <van-cell title="桌面插件" is-link/>
        <van-cell title="分享好友" is-link/>
      </van-cell-group>

      <van-cell-group class="group">
        <van-cell title="任务中心" is-link/>
        <van-cell title="帮助反馈" is-link/>
        <van-cell title="看个广告" is-link/>
      </van-cell-group>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.user {
  width: 100vw;
  height: 100vh;
  position: fixed;
  //bottom: 55px;
  left: 0;
  //padding: 0 10px;
  padding-bottom: 55px;
  box-sizing: border-box;


  .img-auto {
    width: 100%;
    height: 100%;
    display: block;
  }

  .top {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    flex-direction: row-reverse;
    margin-bottom: 10px;
    padding: 0 10px;
    box-sizing: border-box;


    .img {
      width: 30px;
      height: 30px;
      margin-left: 10px;
    }
  }

  .center {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;

    .avatar {
      width: 60px;
      height: 60px;
    }

    .text {
      height: 100%;
      margin-left: 10px;

      .name {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 20px;
      }

      .signature {
        font-size: 13px;
        color: gray;
      }
    }
  }

  .vip {
    width: calc(100% - 20px);
    margin: 0 auto;
    height: 50px;
    background-color: rgb(253, 241, 219);
    border-radius: 5px 5px 0 0;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: rgb(166, 80, 13);

    .vip-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;

      .p {
        margin-bottom: 8px;
        font-size: 14px;
        color: rgb(167, 82, 16);
        font-weight: bold;
      }
    }

    .arow {
      width: 16px;
      height: 16px;
      display: block;
      background-image: url('../assets/images/arrow_more.png');
      background-size: cover;
      text-align: center;
      margin: auto 0;
      margin-right: 20px;
    }
  }


  .bottom {
    background-color: #f2f2f2;

    .group {
      margin-bottom: 10px;
    }
  }
}
</style>