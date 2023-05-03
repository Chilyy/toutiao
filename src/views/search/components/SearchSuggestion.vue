<template>
  <div class="SearchSuggestion-container">
    <van-cell

    icon="search"
    v-for="(item,index) in suggestionList"
    :key="index"
    ><div class="active" slot="title" v-html="highligh(item)"></div>
  </van-cell>

  </div>
</template>

<script>
// 按需加载:只会把使用到的成员打包到结果中
import { debounce } from 'lodash'
import { getSearchSuggestion } from '@/API/search'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 联想数据
      suggestionList: []
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.receiveSearchSuggestion(value)
      }, 200),
      immediate: true // 由于点击第一次不会被监听到，第二次才会监听，所以需要设置这个
      // 该回调将会在侦听开始之后被立即调用

    }
  },
  methods: {
    // 接收联想数据
    async receiveSearchSuggestion (value) {
      const { data: res } = await getSearchSuggestion(value)
      this.suggestionList = res.data.options
    },
    highligh (e) {
      // 1.改变搜索的字体颜色
      console.log(e)
      const fontcolor = `<span class="active">${this.searchText}</span>`
      // 2.要替换的文本(正则表达式)
      const reg = new RegExp(this.searchText, 'gi')
      return e.replace(reg, fontcolor)
    }
  }
}
</script>

<style scoped lang="less">
 .SearchSuggestion-container {
  /deep/ span.active {
    color: #EC4141;
  }
}
</style>
