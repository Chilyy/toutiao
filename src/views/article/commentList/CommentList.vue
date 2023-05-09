<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，点击重试"
    @load="onLoad"
    :immediate-check="false"
    >
    <CommentItem
    v-for="(item, index) in list"
    :key="index"
    :commont="item"
    @reply-btn="$emit('reply-btn', $event)"
    ></CommentItem>

  </van-list>
</template>

<script>
import { getComment } from '@/API/article'
import CommentItem from '@/views/article/commontItem/CommontItem.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {

      loading: false,
      finished: false,
      offsets: null,
      limits: 10,
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        // 1.发取请求
        const { data: res } = await getComment({
          type: this.$props.type,
          source: this.$props.source.toString(),
          offset: this.offsets,
          limit: this.limits

        })

        // console.log(.results[0].content)

        // 2.将传回来值结构评论 存到一个数组
        const { results } = res.data
        this.offsets = res.data.end_id
        this.$props.list.push(...results)

        // 把评论总数量 传递给父组件
        this.$emit('tranTotalAccount', res.data)

        // 3.将loading改为false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          this.loading = false
        } else {
          this.finished = true
        }
        // 5.如果有就就请求下一页数据
        // 6.如果没有就把finished改为true
      } catch (err) {
        this.error = true
      }
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  }
}

</script>

<style scoped lang="less">

</style>
