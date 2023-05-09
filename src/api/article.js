import request from '@/utils/request'

// 获取新闻文章
export const articleLists = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
// 获取文章详情
export const getArticleDetail = id => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}
// 收藏文章
export const getCollectArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏文章
export const cancelCollectArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`

  })
}
// 喜欢文章
export const getLikeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消喜欢文章
export const cancelLikeArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`

  })
}
// 获取文章评论或评论的评论
export const getComment = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}
// 对文章评论或评论回复进行点赞
export const likeArticle = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消对文章评论或评论回复进行点赞
export const cancellikeArticle = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`

  })
}
// 对文章或者评论进行评论
export const addCommont = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
