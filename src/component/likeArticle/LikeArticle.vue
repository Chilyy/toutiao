<template>
   <van-button
    :loading="isloading"
    :icon="value === 1 ? 'good-job':'good-job-o'"

    :class="{
      liked: value === 1
    }"
    @click="isLiked"
  />
</template>

<script>
import { getLikeArticle, cancelLikeArticle } from '@/API/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    artid: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isloading: false
    }
  },
  methods: {
    async isLiked () {
      this.isloading = true

      try {
        let status = -1
        if (this.$props.value === 1) {
          await getLikeArticle(this.$props.artid)
        } else if (this.$props.value === -1) {
          await cancelLikeArticle(this.$props.artid)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 401) {
          this.$toast('请登入后再重试')
        } else {
          this.$toast('点赞失败，请稍后重试')
        }
      }
      this.isloading = false
    }
  }
}

</script>

<style lang="less" scoped>
.liked {
  .van-icon{
  color: #EC4141
  }
}
</style>
