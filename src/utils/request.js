import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 接口基准路径
})

export default request
