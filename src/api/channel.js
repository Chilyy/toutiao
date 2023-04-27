import request from '@/utils/request'

// 获取所有频道列表
export const channelList = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}
