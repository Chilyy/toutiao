<template>
  <div class="SearchResult-container">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"

    >
  <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/API/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true

    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getSearchResult(this.page, 20, this.$props.searchText)

        this.list = [...this.list, ...res.data.results]
        this.loading = false
        if (res.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.$toast('搜索失败，请稍后重试')
      }
    }
  }

}
</script>

<style>

</style>
