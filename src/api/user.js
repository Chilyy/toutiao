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

// 把登录状态的 频道保存下来
export const loginUserChannel = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
// 把登录状态的 删除指定id的频道
export const deleteLoginUserChannel = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
// 关注用户
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const cancelFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}
