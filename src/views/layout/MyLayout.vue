<template>
  <div class="MyLayout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- /子路由出口 -->
    <!-- 底部tabbar -->
    <van-tabbar  class="style-container" route active-color="#ee0a24" placeholder>
      <van-tabbar-item to="/home">
        <i slot="icon" class="toutiao toutiao-shouye" > </i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/answer">
        <i slot="icon" class="toutiao toutiao-wenda"> </i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"> </i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <i slot="icon" class="toutiao toutiao-wode"> </i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>

    </van-tabbar>
    <!-- /底部tabbar -->
  </div>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
// 底部tabbar 样式
.style-container {
  .toutiao {
    font-size: 40px;

  }
  .text {
    font-size:20px ;

  }
}
</style>
