import request from '@/utils/request'

// 获取用户频道列表
export const channelList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
export const everyList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
