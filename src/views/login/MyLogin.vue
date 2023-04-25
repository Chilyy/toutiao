<template>
  <div class="MyLogin-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" left-text="返回" left-arrow @click-left="onClickLeft"/>
    <!-- /导航栏 -->
    <!-- 登录模块 -->
    <van-form @submit="onSubmit" ref="getmobilecode">
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userinfo.mobile"
      type="number"
      maxlength="11"
      ><i class="toutiao toutiao-shouji" slot="left-icon"></i>
    </van-field>
    <van-field
      v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userinfo.code"
      type="number"
      maxlength="6"
      ><i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>

      <!-- 验证码按钮框 -->
      <template #button>
        <!-- 倒计时 time 是时间 毫秒 后面的s是样式s-->
         <van-count-down :time="1000 * 10" format="ss s" v-if="isCountShow" @finish="isCountShow = false"/>
         <!-- /倒计时 -->
         <van-button class=" btn-message" round size="small" type="dafault"
         native-type="button"
         @click="getcode"
         v-else
         >发送验证码</van-button>
      </template>
      <!-- /验证码按钮框 -->
    </van-field>
  <div class="login-input">
    <van-button class="input-login" block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
    <!-- /登录模块 -->
  </div>

</template>

<script>
// 登录请求的方法
import { login, codemes } from '@/API/user'
export default {
  name: 'MyLogin',
  data () {
    return {
      // 手机输入框里的数据
      user: {
        mobile: '19876781243',
        code: '246810'
      },
      // 判断用户输入
      userinfo: {
        mobile:
          [{ required: true, message: '手机号为空' }, { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '请输入正确的手机号码' }],
        code:
          [{ required: true, message: '验证码为空' }, { pattern: /^\d{6}$/, message: '请输入正确的验证码' }]

      },
      // 点击验证码 是否展示倒计时
      isCountShow: ''
    }
  },
  methods: {
    async onSubmit () {
      const user = this.user
      // 登录轻提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: false, // 禁用背景点击
        duration: 0 // 组件展示时间 如果为0 一直展示
      })
      try {
        const { data: res } = await login(user)

        this.$router.push('/mine')
        this.$toast.success('登录成功')

        if (this.user.mobile === '19876781243') {
          this.$store.commit('setUser', this.user)
        } else {
          this.$store.commit('setUser', res.data)
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请再试一次')
        }
      }
    },
    async getcode () {
      try {
        await this.$refs.getmobilecode.validate('mobile')
      } catch (err) {
        return console.log('错误', err)
      }
      this.isCountShow = true
      try {
        await codemes(this.user.mobile)
        this.$toast('嘿嘿,没钱发短信，请使用万能验证码246810')
      } catch (err) {
        if (err.response.status === 429) {
          this.isCountShow = false
          this.$toast('请勿频繁点击，我的忍耐只有60s')
        } else {
          this.$toast('手机号码错误')
        }
      }
    },
    onClickLeft () {
      this.$router.back()
    }
  }
}

</script>

<style lang="less" scoped>
//  /deep/ .van-icon-arrow-left {
//       color: white !important;
//     }
  // /deep/  .van-nav-bar__text {
  //   color:white
  // }
.MyLogin-container {
  // 图标大小
  .toutiao {
    font-size: 40px;
  }

  // 发送验证码按钮
  .btn-message {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #EDEDED;
    color: grey;
    border:none;
    font-size: 22px;
  }
  // 输入框
  .login-input {
    padding: 53px 33px;
    .input-login {
      background-color: #EC4141;
      border: none;
    }
  }
}

</style>
