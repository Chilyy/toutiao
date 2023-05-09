<template>
  <van-button
    v-if="isfollowed"
    class="follow-btn"
    round
    size="small"
    @click="isFollow"
    :loading="followLoading"
  >已关注</van-button>
 <van-button
    v-else
    round type="info"
    size="small"
    @click="isFollow"
    :loading="followLoading"
    class="button-attention">
    <van-icon slot="icon" name="plus" class="plus-icon"></van-icon>
    <span class="text">关注</span>
  </van-button>
</template>

<script>
import { addFollow, cancelFollow } from '@/API/user'
export default {
  name: 'FollowUser',
  props: {
    isfollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true

    }
  },
  data () {
    return {
      followLoading: false
    }
  },
  methods: {
    async isFollow () {
      // 控制loading状态
      this.followLoading = true
      try {
        if (this.$props.isfollowed) {
          // 如果是已关注，点击就是取消关注
          await cancelFollow(this.$props.userId)
        } else {
          // 如果是未关注，点击添加关注
          await addFollow(this.$props.userId)
        }
        // this.articleDetailList.is_followed = !this.articleDetailList.is_followed
        this.$emit('btnViews', !this.$props.isfollowed)
      } catch (err) {
        let message = '操作失败，请重试'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      // 控制loading状态
      this.followLoading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
