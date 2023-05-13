<template>
  <div class="UpdatePhoto-container">
    <img :src="img" class="img-style" ref="img">
    <div class="bottom-word">
       <div class="cancel" @click="$emit('close')">取消</div>
       <div class="confirm" @click="sendImg">确定</div>
    </div>
  </div>

</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { changeUserPhoto } from '@/API/user'
import { mapMutations } from 'vuex'
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 默认为0 可以移出图片 为1以图片为边框 移不出图片
      dragMode: 'move', // 拖动模式 cop 是鼠标裁剪 move是拖动图片 none 是只有裁剪图片的框框可以拖动
      aspectRatio: 1, // 截图比例 默认 16:9 1是1:1 正方形
      autoCropArea: 1, // 自动截取区域 1是撑满图片
      cropBoxMovable: false, // true为裁剪图片的框框可以拖动，false就是图片可以拖动
      cropBoxResizable: false, // 关掉缩放
      background: false, // 关掉背景
      movable: true // true 允许被拖动 默认是true 可不写
    })
  },
  methods: {
    ...mapMutations(['USER_PHOTO']),
    sendImg () {
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append('photo', blob) // 这里的键，必须和接口要求的参数名一致
        const { data } = await changeUserPhoto(formData)
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
        this.USER_PHOTO(data.data.photo)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.UpdatePhoto-container {
background-color: black;
height: 100%;
 .img-style {
  max-width: 100%;
  display: block;
 }
 .bottom-word {
  bottom: 0px;
  position: fixed;
  display: flex;
  left: 0px;
  right: 0px;
  justify-content: space-between;
  .cancel, .confirm {
    font-size: 40px;
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
 }
}
</style>
