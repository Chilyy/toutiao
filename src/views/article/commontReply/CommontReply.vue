<template>
  <div class="CommontReply-container">
    <van-nav-bar
      :title="`${commont.reply_count}条回复`"
      >
    <van-icon
    slot="left"
    name="cross"
    @click="$emit('close')"
    ></van-icon>
    </van-nav-bar>
    <CommentItem
    :commont="commont"
    ></CommentItem>
    <!-- 全部评论 -->
    <van-cell title="全部评论" />
    <CommontList
    :source="commont.com_id"
    :list="Newcommont"
    type="b"
    ></CommontList>
    <!-- /全部评论 -->
    <div class="issueCommont">
      <van-button
          class="btn-style"
          size="small"
          round
          @click="ucommontshow = true"

          >写评论</van-button>
    </div
   >
      <!-- 回复评论的弹出层 -->
      <van-popup
      v-model="ucommontshow"
      position="bottom"
      >
      <CommontPost
      :artId="commont.com_id"
      @isReleaseCommont="newCommont"
      ></CommontPost>
      </van-popup>
      <!-- /回复评论的弹出层 -->
  </div>
</template>

<script>
import CommontList from '@/views/article/commentList/CommentList.vue'
import CommentItem from '@/views/article/commontItem/CommontItem.vue'
import CommontPost from '@/component/editCommont/EditCommont.vue'
export default {
  name: 'CommontReply',
  components: {
    CommentItem, CommontList, CommontPost
  },
  props: {
    commont: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ucommontshow: false,
      Newcommont: []

    }
  },
  methods: {
    newCommont (e) {
      // this.$props.reply_count++
      this.$emit('updateReplyCount')
      this.ucommontshow = false
      this.Newcommont.unshift(e.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.CommontReply-container{
.scroll-wrap {
    position: fixed;
    top: 101.56px;
    bottom: 88px;
    left: 0px;
    right: 0px;
    overflow-y: auto;
  }
  .issueCommont {
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    height: 88px;
    border-top:1px solid #d8d8d8 ;
    .btn-style {
    width: 70%;
    }
  }
}
</style>
