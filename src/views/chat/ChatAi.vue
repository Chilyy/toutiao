<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小珠同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list" >
      <div v-for="(item, index) in list"  :key="index">
          <!-- 左侧是机器人小思 -->
          <div class="chat-item left" v-if="item.name !== 'me'">
            <van-image fit="cover" round :src="require('@/assets/P-1538776-130B782E.jpg')" />
            <div class="chat-pao">{{ item.msg }}</div>
          </div>

          <!-- 右侧是当前用户 -->
          <div class="chat-item right" v-else>
            <div class="chat-pao" >{{ item.msg }}</div>
            <van-image fit="cover" round :src="$store.state.userPhoto" />
          </div>
       </div>
    </div>

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field  placeholder="说点什么..." v-model="word">
        <template #button>
          <span  style="font-size:12px;color:#999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import { getItem } from '@/utils/storage'
export default {
  name: 'ChatAi',
  data () {
    return {
      word: '', // 输入框的内容
      // 所有的聊天消息
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小珠同学' },
        { name: 'me', msg: '我是编程小王子' }

      ],
      socket: null
    }
  },
  methods: {
    // 向服务端发送消息
    sendFn () {
    // 判断内容是否为空
      if (this.word.trim().length === 0) return

      // 添加聊天消息到 list 列表中
      this.list.push({
        name: 'me',
        msg: this.word
      })

      // 把消息发送给 websocket 服务器
      this.socket.emit('message', {
        msg: this.word,
        timestamp: new Date().getTime()

      })

      // 清空文本框的内容
      this.word = ''
    }
  },
  watch: {
    list () {
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>:last-child')
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
    }
  },

  created () {
    // 创建客户端 websocket 的实例
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getItem('USER-KEY').token
      },
      transports: ['websocket']
    })

    this.socket.on('connect', () => {

    })
    this.socket.on('message', obj => {
      this.list.push({
        name: 'xs',
        msg: obj.msg
      })
    })
  },
  // 组件被销毁之前，清空 sock 对象
  beforeDestroy () {
  // 关闭连接
    this.socket.close()

    // 销毁 websocket 实例对象
    this.socket = null
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 150px 0;
  .chat-list {
    padding-top: 50px;
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 100px;
        height: 100px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 20px;
        max-width: 80%;
        min-height: 40px;
        line-height: 60px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 30px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;

    &::before {
      right: -6px;
      transform: rotate(45deg);

    }
  }
}
.chat-item.left {
  text-align: left;

  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
