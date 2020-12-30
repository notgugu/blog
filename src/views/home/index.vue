<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 14:24:05
-->
<template>
  <div class="home">
    <div class="content">
      <div class="content-article">
        <article-list :articleList="articleListData"></article-list>
      </div>
      <div class="content-explain">
        <card
          :className="'iconfont icon-card'"
          :title="'我的名片'"
        >
          <template v-slot:content>
            <div class="card-content">
              <p>网名：凡</p>
              <p>职业：前端开发工程师</p>
              <p>现居：浙江杭州</p>
              <p>QQ：534957983</p>
              <p>Email：534957983@qq.com</p>
              <div class="icons">
                <svg
                  id="qq"
                  ref="qq"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-external_qq"></use>
                </svg>
                <svg
                  id="weChat"
                  ref="weChat"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-external_wechat"></use>
                </svg>
                <a
                  href="https://github.com/notgugu"
                  title="前往github"
                  target="_blank"
                >
                  <svg
                    class="icon"
                    aria-hidden="true"
                  >
                    <use xlink:href="#icon-GitHub"></use>
                  </svg>
                </a>
              </div>
              <div
                class="qq"
                :style="{opacity: isShowQQCode,'z-index': isShowQQCode - 1}"
              >
                <img src="../../assets/image/qq.png" alt="">
              </div>
              <div
                class="weChat"
                :style="{opacity: isShowWechatCode,'z-index': isShowWechatCode - 1}"
              >
                <img src="../../assets/image/wechat.jpg" alt="">
              </div>
            </div>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import articleList from '@/components/article/articleList'
import card from '@/components/card/card'
export default {
  name: 'home',
  data () {
    return {
      articleListData: [
        {
          id: '1',
          title: '马显快测试测试1',
          author: 'mxk',
          createTime: '2020-11-12 11:12:24',
          category: '随笔',
          introduce: '1111111111111111',
          readCount: '1200',
          messageCount: '123',
          like: '111',
          tags: ['html', 'css']
        },
        {
          id: '2',
          title: '马显快测试测试2',
          author: 'mxk',
          createTime: '2020-11-12 11:22:33',
          category: '随笔',
          introduce: '222222222222222222222',
          readCount: '13200',
          messageCount: '322',
          like: '222',
          tags: ['javascript', 'vue']
        }
      ],
      isShowQQCode: 0,
      isShowWechatCode: 0
    }
  },
  methods: {
    showQrCode (event) {
      if (event.target.id === 'qq') {
        this.isShowQQCode = 1
      } else if (event.target.id === 'weChat') {
        this.isShowWechatCode = 1
      }
    },
    hideQrCode (event) {
      if (event.target.id === 'qq') {
        this.isShowQQCode = 0
      } else if (event.target.id === 'weChat') {
        this.isShowWechatCode = 0
      }
    }
  },
  mounted () {
    this.$refs.qq.addEventListener('mouseover', this.showQrCode, false)
    this.$refs.weChat.addEventListener('mouseover', this.showQrCode, false)
    this.$refs.qq.addEventListener('mouseleave', this.hideQrCode, false)
    this.$refs.weChat.addEventListener('mouseleave', this.hideQrCode, false)
  },
  components: {
    articleList,
    card
  }
}
</script>

<style lang="less">
@import '../../assets/css/home/index.less';
</style>
