import request from '@/utils/request'

// 获取新闻文章
export const articleLists = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
