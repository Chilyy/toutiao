<template>
  <div id="app">
    <keep-alive exclude="MyMine,MySearch,SearchResult,UserInfo,SearchHistory,SearchSuggestion,MyArticleDetail">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App',

  data () {
    return {

    }
  }
}
</script>
<style lang="less">

</style>
