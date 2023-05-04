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
// 获取搜索结果
export const getSearchResult = (page, pages, q) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params: {
      page,
      per_page: pages,
      q
    }
  })
}
