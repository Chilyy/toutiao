<template>
  <div class="UpdateGender-container">
    <van-picker
      title="更改性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/API/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      editGender: 0
    }
  },
  methods: {
    async onConfirm (value, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        await editUserInfo({
          gender: this.editGender

        })
        this.$emit('close')
        this.$emit('input', this.editGender)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.editGender = index
    }
  }

}

</script>

<style>

</style>
