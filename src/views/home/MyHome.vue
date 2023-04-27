<template>
  <div class="MyHome-container">
    <!-- 导航 -->
    <van-nav-bar class="page-nav-bar" fixed >
      <van-button
      class="search-btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search"
      color="#E33E3E"
      >
      搜索
      </van-button>
    </van-nav-bar>
    <!-- /导航 -->
    <!-- 标签页 -->
    <van-tabs v-model="active" animated swipeable class="channel" >
      <van-tab :title="channel.name" class="channel_list"
      v-for="channel in channels"
      :key="channel.id"

      >

      <articleList :channeled="channel"></articleList>
    </van-tab>

      <div class="none-div" slot="nav-right"></div>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="hamburger-btn" @click="getpopup">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- /汉堡按钮 -->
    </van-tabs>
    <!-- /标签页 -->
     <!-- 汉堡按钮的弹出层 -->
     <van-popup
      v-model="show"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    ><pop-up/></van-popup>
    <!-- /汉堡按钮的弹出层 -->
  </div>
</template>

<script>
import { channelList } from '@/API/channel'
import articleList from './components/ArticleList.vue'
import PopUp from './components/PopUp.vue'

export default {
  name: 'MyHome',
  components: {
    articleList, PopUp
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      show: false // 汉堡按钮弹出层控制

    }
  },
  methods: {
    // 获取频道列表
    async getChannelList () {
      const { data: res } = await channelList()
      this.channels = res.data.channels
    },
    getpopup () {
      this.show = true
    }
  },
  created () {
    this.getChannelList()
  }

}
</script>

<style lang="less" scoped>
.MyHome-container {
  padding-top: 190px;
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
 /deep/ .channel {
  .van-tabs__wrap {
    height: 100px;
  }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 35px;
      color: #777777;
    }
    .van-tab--active {
      color: black;
    }
    .van-tabs__line {
      height: 8px ;
      width: 31px !important;

    }
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 100px;
    }
    .none-div {
        height: 100px;
        width: 70px;
        flex-shrink: 0;
      }
    // 汉堡按钮
    .hamburger-btn {
      position: fixed;
      right: 0px;
      width: 90px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      .toutiao {
        font-size: 33px;
      }
      // 汉堡按钮---左侧灰色渐变边框
      &:before {
        content: "";
        width: 1px;
        background-image: url(~@/assets/gradient-gray-line.png);
        height: 100%;
        position: absolute;
        left: 0px;
        background-size: contain;
      }

    }
  }
}
</style>
