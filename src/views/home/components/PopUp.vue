<template>
  <div class="popup-container">
   <van-cell :border="false">
    <div slot="title" class="title-text">我的频道</div>
    <van-button type="danger" round plain size="mini" class="edit">编辑</van-button>
   </van-cell>
   <!-- 频道宫格 -->
   <van-grid :gutter="10" class="my-grid">
    <van-grid-item v-for="value in 8" :key="value"  text="文字" class="gridList" icon="close"/>
  </van-grid>
   <!-- /频道宫格 -->
   <!-- 推荐频道 -->
   <van-cell :border="false">
    <div slot="title" class="title-text">推荐频道</div>
   </van-cell>
   <van-grid :gutter="10" class="recommend-grid">
    <van-grid-item v-for="value in 8" :key="value"  text="文字" icon="plus" class="gridList"/>
  </van-grid>
   <!-- /推荐频道 -->
  </div>
</template>

<script>
export default {
  name: 'PopUp'
}
</script>

<style lang="less" scoped>
.popup-container {
  padding: 85px 0;
  // 我的频道 推荐频道
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  // 编辑按钮
  .edit {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
    position: absolute;
    right: 0px;
    // display: flex;
    // justify-content: center;
    // flex-direction: row;
    // align-items: center;
  }
  // 全部宫格样式
  /deep/ .gridList {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
      }
    }

  }
  //我的频道宫格 右上角关闭图标
  /deep/ .my-grid {
    .gridList {
      .van-icon-close {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;

      }
    }
  }
  // 推荐频道宫格(单独设置)
 /deep/  .recommend-grid {
    .van-grid-item__content {
      white-space: nowrap;
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
