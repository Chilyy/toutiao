<template>
  <div class="MySearch-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#EC4141"
        @focus="clearValue"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <SearchResult
    v-if="isResultShow"
    :searchText="value"
    ></SearchResult>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <SearchSuggestion
    v-else-if="value"
    :searchText="value"
    @search="onSearch"
    ></SearchSuggestion>
    <!-- /联想建议 -->

      <!-- 搜索历史 -->
      <SearchHistory
      v-else
      :searchResult="searchHistories"
      @deleteAllHistories="searchHistories = []"
      @search="onSearch"
      ></SearchHistory>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage'
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
      value: '', // 搜索框
      isResultShow: false,
      searchHistories: getItem('SEARCH-HISTORIES') || [] // 搜索历史,如果没数据就null，会报错，所以给一个空数组
    }
  },
  watch: {
    searchHistories (val) {
      setItem('SEARCH-HISTORIES', val)
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.value = val
      // 存储搜索历史记录
      // 删掉重复历史记录
      const repetition = this.searchHistories.indexOf(val)
      if (repetition !== -1) {
        this.searchHistories.splice(repetition, 1)
      }
      // 把最新搜索结果排在最前面
      this.searchHistories.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    clearValue () {
      this.value = ''
      this.isResultShow = false
    }

  }
}
</script>

<style lang="less" scoped>
.MySearch-container {
  padding-top: 108px;
  .van-search__action {
    color: white;
  }
  // 搜索表单固定顶部
  .search-form {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .van-search__action {
    background-color: #EC4141;
  }
}
</style>
