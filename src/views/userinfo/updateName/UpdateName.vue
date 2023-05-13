<template>
  <div class="UpdateName-container">
    <van-nav-bar
    class="navtop"
    title="更改名字"
    @click-left="$emit('close')"
    left-arrow>
      <van-button
      class="btn"
      square
      type="primary"
      slot="right"
      @click="editUpdateName"
      >保存</van-button>
    </van-nav-bar>
    <van-field
    v-model.trim="localName"
    maxlength="7"
    size="large"
    class="input"
    @focus="isGreen = true"
    :class="{
      changeColor: isGreen
    }"
    />
    <span class="bottom-font">好名字可以让你的朋友更容易记住你。</span>
  </div>
</template>

<script>
import { editUserInfo } from '@/API/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isGreen: false,
      localName: this.$props.value
    }
  },
  methods: {
    async editUpdateName () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        // 阻止输入空
        if (this.localName.length === 0) {
          return
        }
        await editUserInfo({
          name: this.localName

        })
        this.$emit('close')
        this.$emit('input', this.localName)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.UpdateName-container{
  /deep/ .navtop {
    background-color: #EDEDED !important;
   }
/deep/ .van-icon-arrow-left{
    color: #575757 !important;
    font-size: 40px;

   }
   .btn {
    background-color: #07C160;
    border: unset;
    border-radius: 15px;
    width: 130px;
    height: 70px;
   }
   .input {
    background-color:  #EDEDED;
    border-bottom: 4px solid #d0d0d0;
    width: 700px;
    margin-left: 20px;
    padding-bottom: unset;
    caret-color:#00C060;
    padding-top: 40px;
    font-size: 40px;
    &.changeColor{
      border-bottom: 4px solid #16B863;
    }
   }
   .bottom-font {
    font-size: 30px;
    color: grey;
    position: absolute;
    left: 30px;
    top: 200px;
   }
}
</style>
