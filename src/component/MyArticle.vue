<template >
  <van-cell
  class="MyArticle-container"
  :to="`/article/${articleList.art_id}`"
  >
    <!-- 文章标题插槽 -->
    <div slot="title" class="title van-multi-ellipsis--l2"> {{ articleList.title}}</div>
    <!-- /文章标题插槽 -->

    <!-- 标题下的插槽 -->
    <div slot="label">
      <!-- 标题下三张图片 -->
      <div class="label-image" v-if="articleList.cover.type === 3">
        <div class="imaged"
        v-for="(img, index) in articleList.cover.images"
        :key="index"
        >
          <van-image
            class="label-img"

            :src="img"
          />
        </div>
      </div>
      <!-- /标题下的三张图片 -->
      <!-- 标题下的内容 -->
      <div class="label-info-wrap">
        <span>作者:{{ articleList.aut_name }}</span>
        <span>{{ articleList.comm_count }}评论</span>
        <span>{{articleList.pubdate | relativeTime}}</span>
      </div>
      <!-- /标题下的内容 -->
    </div>
    <!-- /标题下的插槽 -->

    <!-- 标题右侧图片 -->
    <van-image
      slot="default"
      class="right-cover"
      :src="articleList.cover.images[0]"
      fit="cover"
      v-if="articleList.cover.type === 1"
    />
    <!-- /标题右侧图片 -->

  </van-cell>
</template>

<script>
export default {
  name: 'MyArticle',
  props: {
    // MyHome传来的列表数据
    articleList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .MyArticle-container {
    // 标题文字
    .title {
      font-size: 32px;
      color: #3a3a3a;
    }
    //标题右侧图片
    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
      .right-cover {
        width: 232px;
        height: 146;

      }
    // 标题下的内容
    .label-info-wrap span{
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
    // 标题下三张图片
    .label-image {
      display: flex;
      padding: 30px 0;
      .imaged {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .label-img {
          height: 146px;
          width: 100%;
        }
      }
    }
    }

</style>
