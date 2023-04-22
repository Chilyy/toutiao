<template>
  <div class="MyLogin-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>
    <!-- /导航栏 -->
    <!-- 登录模块 -->
    <van-form @submit="onSubmit">
    <van-field
      name="用户名"
      placeholder="请输入手机号"
      ><i class="toutiao toutiao-shouji" slot="left-icon"></i>
    </van-field>
    <van-field
      type="password"
      name="验证码"
      placeholder="请输入验证码"
      ><i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
      <!-- 验证码按钮框 -->
      <template #button>
         <van-button class=" btn-message" round size="small" type="dafault">发送验证码</van-button>
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
export default {
  name: 'MyLogin'
}
</script>

<style lang="less" scoped>
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
      background-color: #66B1FF;
      border: none;
    }
  }
}

</style>
