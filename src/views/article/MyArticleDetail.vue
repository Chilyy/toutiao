<template>
  <div class="MyArticleDetail-container">
    <van-nav-bar class="page-nav-bar" title="文章详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <van-loading color="#EC4141" vertical>加载中...</van-loading>
    <h1 class="big_title">小技巧:使用Array.reduce创建Promise回调链</h1>
    <!-- 标题下的内容 -->
    <div class="title-bottom">
       <div class="head_portrait">
        <van-image
          class="photo"
          round

          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        ></van-image>
        <div class="name-time">
          <span class="user-name">天涯小行客</span>
          <span class="user-time">4小时前</span>
        </div>

       </div>
       <van-button round type="info" size="small" class="button-attention">
          <van-icon slot="icon" name="plus" class="plus-icon"></van-icon>
          <span class="text">关注</span>
        </van-button>

    </div>
    <!-- /标题下的内容 -->
    <!-- 文章内容 -->
    <div class="article-content">这是文章内容</div>
    <van-divider>正文结束</van-divider>
    <!-- /文章内容 -->
     <!-- 加载失败：404 -->
     <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        color="#777"
        name="star-o"
      />
      <van-icon
        color="#777"
        name="good-job-o"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    </div>

</template>

<script>
import { getArticleDetail } from '@/API/article'
export default {
  name: 'MyArticleDetail',
  props: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articleDetailList: {}
    }
  },

  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async aricleDetail () {
      try {
        const { data: res } = await getArticleDetail(this.$props.articleId)
        this.articleDetailList = res.data
      } catch (err) {

      }
    }
  },
  created () {
    this.aricleDetail()
  }
}
</script>

<style lang="less" scoped>
.MyArticleDetail-container{
  // 标题
  .big_title{
  font-size: 38px;
  color: #333333;
  padding-left: 30px;
}
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
    height: 140px
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
 .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
}
.loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

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
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
