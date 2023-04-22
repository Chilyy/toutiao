<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less">

</style>
