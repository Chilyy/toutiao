import request from '@/utils/request'

// 获取联想建议
export const getSearchSuggestion = q => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
