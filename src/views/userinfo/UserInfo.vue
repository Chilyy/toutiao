<template>
  <div class="UserInfo-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bars"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 个人信息 -->
   <div class="myselfInfo">
    <input type="file" hidden ref="file" @change="onFileChange"/>
      <van-cell title="头像" is-link :center="true" @click="$refs.file.click()">
        <van-image
          slot="default"
          radius="10px"
          width="70"
          height="70"
          fit="cover"
          :src="$store.state.user.mobile === '19876781243' ? require('@/assets/微信图片_20230423201325.jpg') : info.photo"
        />
      </van-cell>
      <van-cell title="名字"
      is-link
      :value="$store.state.user.mobile === '19876781243' ? '财贸腿最短' : info.name"
      @click="isEditNameShow = true"
      />
      <van-cell title="性别"
      is-link
      :value="info.gender === 0 ? '男': '女'"
      @click="isEditGenderShow = true"
      />
      <van-cell title="生日"
      is-link :value="$store.state.user.mobile === '19876781243' ? '2003-3-6' : info.birthday"
      @click="isEditDaysShow = true"
      />
      <van-cell title="拍一拍" is-link value="拍了拍我的背说:搓好了"/>
      <van-cell title="手机号" is-link :value="$store.state.user.mobile === '19876781243' ? '19876781243' : info.mobile" />
      <van-cell title="二维码名片" is-link >
        <van-icon slot="default" name= "qr" />
      </van-cell>
      <van-cell title="更多信息" is-link/>
   </div>
    <!-- /个人信息 -->
    <!-- 更改名字弹层 -->
    <van-popup
    style="height: 100%"
    v-model="isEditNameShow"
    position="bottom"
    class="popup-style"
    >
    <UpdateName
    v-if="isEditNameShow"
    @close="isEditNameShow = false"
    v-model="info.name"
    ></UpdateName>
    </van-popup>
    <!-- /更改名字弹层 -->

    <!-- 更改性别弹层 -->
    <van-popup

    v-model="isEditGenderShow"
    position="bottom"
    class="popup-style"
    >
    <UpdateGender
    v-if="isEditGenderShow"
    @close="isEditGenderShow = false"

    v-model="info.gender"
    ></UpdateGender>
  </van-popup>
    <!-- /更改性别弹层 -->

    <!-- 编辑出生日期弹层 -->
    <van-popup

    v-model="isEditDaysShow"
    position="bottom"
    class="popup-style"
    >
    <UpdateDays
    v-if="isEditDaysShow"
     @close="isEditDaysShow = false"
     v-model="info.birthday"
    />

  </van-popup>
    <!-- /编辑出生日期弹层 -->

    <!-- 更改头像弹层 -->
    <van-popup
      v-model="isEditPhotoShow"
      position="center"
      class="popup-style"
      style="height: 100%; width: 100%;"
      >
      <UpdatePhoto
      :img="imgs"
      v-if="isEditPhotoShow"
      @close="isEditPhotoShow = false"
      @update-photo="info.photo = $event"
      />
      </van-popup>
    <!-- /更改头像弹层 -->
  </div>
</template>

<script>
import { getUserInfo } from '@/API/user'
import UpdateName from '@/views/userinfo/updateName/UpdateName.vue'
import UpdateGender from '@/views/userinfo/updateGender/UpdateGender.vue'
import UpdateDays from '@/views/userinfo/updateDays/UpdateDays.vue'
import UpdatePhoto from '@/views/userinfo/updatePhoto/UpdatePhoto.vue'
export default {
  name: 'UserInfo',
  components: {
    UpdateName, UpdateGender, UpdateDays, UpdatePhoto
  },
  data () {
    return {
      info: [],
      isEditNameShow: false, // 编辑用户名称弹层
      isEditGenderShow: false, // 编辑性别弹层
      isEditDaysShow: false, // 编辑出生日期
      isEditPhotoShow: false, // 编辑头像
      imgs: null
    }
  },
  methods: {
    async UserInfo () {
      try {
        const { data: res } = await getUserInfo()

        this.info = res.data
      } catch (err) {
        this.$toast('请检查是否登录')
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.imgs = window.URL.createObjectURL(file)
      // 控制弹窗
      this.isEditPhotoShow = true

      // 出现的一个问题：如果选了同一张图片不会触发change事件；解决办法就是每次使用完毕，把它的value清空
      this.$refs.file.value = ''
    }
  },
  created () {
    this.UserInfo()
  }

}
</script>

<style lang="less" scoped>
.UserInfo-container {
  background-color: #EDEDED;
  .page-nav-bars {
    background-color: #EDEDED !important;
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;

   /deep/ .van-icon-arrow-left{
    color: #575757 !important;
    font-size: 40px;

   }
  }
  .myselfInfo {
    margin-top: 90px;
  }
  .popup-style {
    background-color: #EDEDED;
  }
}
</style>
