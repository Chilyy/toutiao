// 用户相关的接口
import request from '@/utils/request'

// 点击登录验证身份
export const login = function (data) {
  return request.post('/v1_0/authorizations', data)
}

// 点击发送验证码
export const codemes = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

// 登录获取用户的数据
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据 固定
    // headers: {
    //   // 注意：该接口需要授权才能访问
    //   //       token的数据格式：Bearer token数据，注意bearer 后面有空格
    //   Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}
