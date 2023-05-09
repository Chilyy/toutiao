<template>
  <van-button
    :loading="isloading"
    :icon="value ? 'star':'star-o'"
    :class="{
      collected: value
    }"
    @click="isCollect"
  />
</template>

<script>
import { getCollectArticle, cancelCollectArticle } from '@/API/article'
export default {
  name: 'CollectArticle',
  props: {
    artid: {
      type: [Number, Object, String],
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      collectList: [],
      isloading: false
    }
  },
  methods: {
    async isCollect () {
      this.isloading = true
      try {
        if (this.$props.value) {
          // 如果是未点击状态 点击收藏文章
          await getCollectArticle(this.$props.artid)
        } else {
          // 如果是已经收藏，点击取消收藏
          await cancelCollectArticle(this.$props.artid)
        }

        this.$emit('input', !this.$props.value)
        this.$toast.success(!this.$props.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        if (err.response && err.response.status === 401) {
          this.$toast('请登入后再重试')
        } else {
          this.$toast('收藏失败，请稍后重试')
        }
      }
      this.isloading = false
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  .van-icon{
  color: #ffa500
  }
}
</style>
