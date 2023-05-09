<template>
  <div class="MyArticleDetail-container">
    <van-nav-bar class="page-nav-bar" title="文章详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <div v-if="isloding"><van-loading color="#EC4141" vertical >加载中...</van-loading></div>

    <!-- 标题下的内容 -->
    <div class="article" v-else-if="articleDetailList.title">
      <h1 class="big_title">{{articleDetailList.title}}</h1>
       <div class="title-bottom">
         <div class="head_portrait">
          <van-image
            class="photo"
            round
            fit="cover"
            :src="articleDetailList.aut_photo"
          ></van-image>
          <div class="name-time">
            <span class="user-name">{{articleDetailList.aut_name}}</span>
            <span class="user-time">{{ articleDetailList.pubdate | relativeTime }}</span>
          </div>

         </div>
         <!-- 关注按钮 -->
         <FollowUser
          class="follow-btn"
          :isfollowed="articleDetailList.is_followed"
          :userId="articleDetailList.aut_id"
          @btnViews="articleDetailList.is_followed = $event"
          ></FollowUser>
          <!-- /关注按钮 -->
       </div>
       <div>
        <div
        class="article-content markdown-body"
        v-html="articleDetailList.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
       </div>
       <!-- 评论区域 -->
       <CommentList
       :source="articleDetailList.art_id"
       @tranTotalAccount="countAmount = $event.total_count"
       @reply-btn="onReplyShow"
       class="comment"
       :list="newCommont"
       ></CommentList>
       <!-- /评论区域 -->
       <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="commontshow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="countAmount"
        color="#777"
        class="comment-icon"
      />
      <CollectArticle
      class="btn-item"
      v-model="articleDetailList.is_collected"
      :artid="articleDetailList.art_id"
      >
      </CollectArticle>

      <LikeArticle
      class="btn-item"
      v-model="articleDetailList.attitude"
      :artid="articleDetailList.art_id"
      ></LikeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 评论弹出层 -->
    <van-popup
    v-model="commontshow"
    position="bottom"
     >
    <CommentPost
    :artId="articleDetailList.art_id"
    @isReleaseCommont="getIsReleaseCommont"
    ></CommentPost>
    </van-popup>
    <!-- /评论弹出层 -->
    </div>
    <!-- /标题下的内容 -->
    <!-- 文章内容 -->

    <!-- /文章内容 -->
     <!-- 加载失败：404 -->
     <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button
        class="retry-btn"
        @click="aricleDetail"
        >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 评论回复 -->
      <van-popup v-model="isReplyshow" position="bottom" :style="{ height: '90%' }" >
      <CommontReply
      class="scroll-wrap"
      v-if="isReplyshow"
      @close="isReplyshow = false"
      @updateReplyCount="currentCommont.reply_count++"
      :commont="currentCommont"
      ></CommontReply>

      </van-popup>
      <!-- /评论回复 -->
    </div>

</template>

<script>
import { ImagePreview } from 'vant' // 导入点击文章图片滑动模块
import { getArticleDetail } from '@/API/article'
import CollectArticle from '@/component/collectarticle/CollectArticle.vue'
import FollowUser from '@/component/follow-user/FollowUser.vue'
import LikeArticle from '@/component/likeArticle/LikeArticle.vue'
import CommentList from '@/views/article/commentList/CommentList.vue'
import CommentPost from '@/component/editCommont/EditCommont.vue'
import CommontReply from '@/views/article/commontReply/CommontReply.vue'

export default {
  name: 'MyArticleDetail',
  components: {
    FollowUser, CollectArticle, LikeArticle, CommentList, CommentPost, CommontReply

  },
  // 给所有的后代组件提供数据  需要inject来接收值
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articleDetailList: {},
      isloding: true, // 控制刷新状态
      errStatus: 0, // 控制失败状态
      countAmount: 0, // 评论数量
      commontshow: false, // 控制评论弹出层
      newCommont: [], // 存储最新评论数据
      isReplyshow: false, // 点击回复弹窗
      currentCommont: {}, // 点击回复的当前评论数据
      ucommontshow: false // 点击用户评论的评论弹层

    }
  },

  methods: {

    onClickLeft () {
      // 点击返回 返回来的页面
      this.$router.back()
    },
    async aricleDetail () {
      // 点击重试 重新调用该方法 并执行转圈圈
      this.isloding = true
      try {
        const { data: res } = await getArticleDetail(this.$props.articleId)
        // 模拟除了404的失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('dmfosdmfdf')
        // }
        this.articleDetailList = res.data
        setTimeout(() => {
          this.getImagePreView()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.isloding = false
    },
    getImagePreView () {
      const includeImg = this.$refs['article-content']
      const imgs = includeImg.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    // 控制弹出层 接收发布的最新评论，并传递给子组件
    getIsReleaseCommont (data) {
      this.commontshow = false
      this.newCommont.unshift(data.new_obj)
      this.countAmount++
    },
    onReplyShow (e) {
      this.currentCommont = e
      this.isReplyshow = true
    }

  },
  created () {
    this.aricleDetail()
  }
}
</script>

<style lang="less" scoped>
@import "./github-markdown.css";
.MyArticleDetail-container{
  // 标题
  .big_title{
  font-size: 38px;
  color: #333333;
  padding-left: 30px;
}
.article {
  .title-bottom {
  display: flex;
  justify-content:space-between;
  align-items: center;
// 头像
  .head_portrait{
  padding-left: 29px;
  display: flex;
  .photo {
    width: 140px;
    height: 140px;
  }
  // 文章作者 和时间
  .name-time {
    padding-left: 17px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .user-name {
   font-size: 33px;
   color: #333333;
  }
    .user-time {
   font-size: 33px;
   color: #C5C5C5;
  }

  }
 }
 // 取消关注按钮
 .follow-btn{
  height: 58px;
  width: 171px;
  margin-right: 39px;
  font-size: 30px;
 }
 // 关注按钮
 .button-attention {
  margin-right: 39px;
  background-color: #EC4141 ;
  border: unset;
  height: 58px;
  width: 171px;
    .plus-icon {
      font-size: 30px;
    }
   .text {
      font-size: 26px ;
    }
  }
}
 // 文章内容
 .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;

      }

}}
// 404 状态
.loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
// 除了404 的其他错误
  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }
// 评论
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .btn-item {
      border: unset;
      padding: unset;
      font-size: 22.0799px;

    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }

  }
  .comment {
      margin-bottom: 97.16px;
    }

}
</style>
