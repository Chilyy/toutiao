<template>
  <div class="UpdateDays-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="editDays"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { editUserInfo } from '@/API/user'
export default {
  name: 'UpdateDays',
  props: {
    value: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.$props.value)
    }
  },
  methods: {
    async editDays () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })

      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserInfo({
          birthday: currentDate

        })
        this.$emit('close')
        this.$emit('input', currentDate)
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style>

</style>
