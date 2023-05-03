<template>
  <div class="popup-container">
   <van-cell :border="false">
    <div slot="title" class="title-text">我的频道</div>
    <van-button
    type="danger"
    round plain
    size="mini"
    class="edit"
    @click="isclear = !isclear"
    >{{isclear ? '完成' : '编辑'}}</van-button>
   </van-cell>
   <!-- 频道宫格 -->
   <van-grid :gutter="10" class="my-grid">
    <van-grid-item
    v-for="(item,index) in channels"
    :key="index"
    class="gridList"
    @click="myhomechannel(item,index)"
    >
    <van-icon slot="icon"
    name="close"
    v-show="isclear && !fixchannel.includes(item.id)"

    >
    </van-icon>
    <span slot="text"
    class="text"
    :class="{actives: active === index}"
    >{{ item.name }}</span>
    </van-grid-item>
  </van-grid>
   <!-- /频道宫格 -->
   <!-- 推荐频道 -->
   <van-cell :border="false">
    <div slot="title" class="title-text">推荐频道</div>
   </van-cell>
   <van-grid :gutter="10" class="recommend-grid">
    <van-grid-item
    v-for="(item, index) in recommendChannels"
    :key="index"  :text="item.name"
    icon="plus" class="gridList"
    @click="pushMyChannels(item)"
    >
  </van-grid-item>
  </van-grid>
   <!-- /推荐频道 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { everyList } from '@/API/channel'
import { setItem } from '@/utils/storage'
import { loginUserChannel, deleteLoginUserChannel } from '@/API/user'
export default {
  name: 'PopUp',
  props: {
    // 用户频道
    channels: {
      type: Array,
      required: true
    },
    // 拿到点击的频道
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      everychannels: [],
      isclear: false, // 我的频道 右上角清除图标
      fixchannel: [0] // 用于固定频道不被删除
    }
  },
  methods: {
    async getEveryChannels () {
      const { data: res } = await everyList()

      this.everychannels = res.data.channels
    },
    // 点击推荐频道 添加 个人频道
    async pushMyChannels (item) {
      this.$props.channels.push(item)
      // 判断是否登录，登录存在服务器，没登录存在本地
      if (this.user) {
        // 如果登录了 发送请求

        await loginUserChannel({ id: item.id, seq: this.$props.channels.length })
      } else {
        setItem('NO-LOGIN', this.$props.channels)
      }
    },
    // 我的频道
    async myhomechannel (item, index) {
      if (this.isclear) {
        // 如果是固定频道则不删除
        if (this.fixchannel.includes(item.id)) {
          return
        }
        // 如果点击的索引值小于高亮图标的索引 就对高亮进行减一
        if (index <= this.active) {
          this.$emit('getchannel', this.active - 1, true)
        }
        // 如果为true 即为删除状态 点击删除
        this.$props.channels.splice(index, 1)
        // 登录删除服务器上数据 非登录重新存储
        if (this.user.token) {
          try {
            await deleteLoginUserChannel(item.id)
          } catch (err) {
            this.$toast('删除失败，请稍后重试')
          }
        } else {
          setItem('NO-LOGIN', this.$props.channels)
        }
      } else {
        // 如果为false 即为跳转状态 点击跳转相应的频道
        this.$emit('getchannel', index, false)
      }
    }

  },
  computed: {
    ...mapState(['user']), // 访问state里面的token
    recommendChannels () {
      return this.everychannels.filter(item => {
        return !this.channels.some(e => e.id === item.id)
      })
    }
  },
  created () {
    this.getEveryChannels()
  }
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
      white-space: nowrap;
      .van-grid-item__text,.text{
        font-size: 28px;
        color: #222;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
      .actives {
        color: #E33E3E;
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
      .van-grid-item__icon-wrapper {
        position: unset;
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

    }
  }
}
</style>
