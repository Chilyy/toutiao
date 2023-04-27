<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text="isRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
    <my-article
      v-for="(article, index) in list"
      :key="index"
      :articleList="article"
      ></my-article>
      <!-- <van-cell
      v-for="(article, index) in list"
      :key="index"
      :title="article.title"
      /> -->
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import MyArticle from '@/component/MyArticle.vue'
import { articleLists } from '@/API/article'
export default {
  name: 'articleList',
  components: { MyArticle },
  props: {
    channeled: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      newtime: null, // 前一页的时间戳
      error: false, // 控制失败的
      isLoading: false,
      isRefresh: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      try {
      // 第一步 获取文章的数据
        const { data: res } = await articleLists({
          channel_id: this.channeled.id,
          timestamp: this.newtime || Date.now() // timestamp表示的是页码 返回的数据里 有新的时间戳就是前一页的时间戳
        })
        // 第二步 把获取的文章数据存到data中

        this.list = [...this.list, ...res.data.results]
        // 第三步 把loading设置为false
        this.loading = false
        // 第四步 判断数据是否全部加载完成
        if (res.data.results.length) {
          this.newtime = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await articleLists({
          channel_id: this.channeled.id,
          timestamp: Date.now() // 下拉刷新，每次请求获取最新数据
        })
        // 第二步 把获取的文章数据存到data中

        this.list = [...res.data.results, ...this.list]

        this.isLoading = false
        this.isRefresh = `刷新成功，更新了${res.data.results.length}条数据`
      } catch (err) {
        this.isLoading = false
        this.isRefresh = '刷新失败'
      }
    }
  }
}

</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}

</style>
