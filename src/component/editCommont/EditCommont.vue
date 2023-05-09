<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit

    />
    <van-button
      class="post-btn"
      @click="issueCommont"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addCommont } from '@/API/article'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },

  props: {
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async issueCommont () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: false, // 禁用背景点击
        duration: 0 // 组件展示时间 如果为0 一直展示
      })
      try {
        const { data } = await addCommont({
          target: this.$props.artId.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : null
        })

        this.$emit('isReleaseCommont', data.data)

        this.message = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
