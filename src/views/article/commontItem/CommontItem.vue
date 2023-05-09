<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commont.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commont.aut_name }}</div>
      <van-button
        class="like-btn "
        :class="{
          likeStyle: commont.is_liking
        }"
        :loading="commontLoding"
        :icon="commont.is_liking ? 'good-job' : 'good-job'"
        @click="likeArticles"
      >{{ commont.like_count || '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ commont.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{commont.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-btn', commont)"
        >回复 {{ commont.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { likeArticle, cancellikeArticle } from '@/API/article'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    commont: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      commontLoding: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async likeArticles () {
      try {
        this.commontLoding = true
        if (this.$props.commont.is_liking) {
          // 如果已点赞，点击进行取消点赞
          await cancellikeArticle(this.$props.commont.com_id)
          this.$props.commont.like_count--
        } else {
          // 如果未点赞，点击进行点赞
          await likeArticle(this.$props.commont.com_id)
          this.$props.commont.like_count++
        }
        this.$props.commont.is_liking = !this.$props.commont.is_liking
      } catch (err) {
        this.$toast('操作失败，请重新操作')
      }
      this.commontLoding = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {

    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.likeStyle {
      color: #EC4141;
    }
  }
}
</style>
