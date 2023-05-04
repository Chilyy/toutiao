<template>
  <div class="SearchHistory-container">
    <van-cell title="搜索历史" >
      <div v-if="isDelate">
        <span @click="$emit('deleteAllHistories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelate = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" slot="default" @click="isDelate = true"/>

    </van-cell>
    <van-cell
    :title="item"
    v-for="(item,index) in searchResult"
    :key="index"

    @click="deleteSearchHistories(item, index)"
    >
      <van-icon name="close" v-show="isDelate"/>
    </van-cell>

  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    // 传过来的搜索历史记录
    searchResult: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelate: false // 控制是否展示删除图标
    }
  },
  methods: {
    deleteSearchHistories (item, index) {
      if (this.isDelate) {
      // 如果 isDelate 为true 则为删除操作
        this.$props.searchResult.splice(index, 1)
      } else {
      // 如果 isDelate 为false 则为跳转查找操作
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style>

</style>
