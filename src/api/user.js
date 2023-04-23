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
