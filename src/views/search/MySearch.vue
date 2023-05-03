<template>
  <div class="MySearch-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search

        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#EC4141"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow"></SearchResult>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
    v-else-if="value"
    :searchText="value"
    ></SearchSuggestion>
    <!-- /联想建议 -->

      <!-- 搜索历史 -->
      <SearchHistory v-else></SearchHistory>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

export default {

  name: 'MySearch',
  components: {
    SearchHistory, SearchSuggestion, SearchResult
  },
  data () {
    return {
      value: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch (val) {
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.MySearch-container {
  .van-search__action {
    color: white;
  }
}
</style>
