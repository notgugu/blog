<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2020-12-30 16:37:44
-->
<template>
  <div class="home">
    <div class="content">
      <div class="content-article">
        <article-list :articleList="articleListData"></article-list>
      </div>
      <div class="content-explain">
        <card
          :icon="'#icon-card'"
          :title="'我的名片'"
        >
          <template v-slot:content>
            <div class="card-content">
              <p>网名：凡</p>
              <p>签名：天行健，君子以自强不息</p>
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
        <card
          :icon="'#icon-fire'"
          :title="'最热文章'"
        >
          <template v-slot:content>
            <div
              class="hot-article"
              v-for="(item, index) in hotArticleListData"
              :key="item.id"
              v-gotoArticle="item.id"
            >
              <i>{{index + 1}}</i>
              <span>{{item.title}}</span>
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
          introduce: '实现了一个实时搜索类的函数节流,通过vue自定义指令v-debounce实现.原本,如果我们想做一个实施搜索,那么会直接用@keyup=search,这样就会非常耗性能,键盘敲一下,就会调用一次search事件,如果是ajax请求,那么会非常不友好,所以通过v-debounce,则可以在键盘连续敲击的时候组织运行,停留300毫秒才执行',
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
          category: '技术',
          introduce: '222222222222222222222',
          readCount: '13200',
          messageCount: '322',
          like: '222',
          tags: ['javascript', 'vue']
        }
      ],
      hotArticleListData: [
        {
          id: '1',
          title: '从萨达萨达萨达萨达'
        },
        {
          id: '2',
          title: '看见撒旦年卡沉思u阿萨'
        },
        {
          id: '3',
          title: 'aasdkaskmdas'
        },
        {
          id: '4',
          title: '爱看书的喇嘛卡了'
        },
        {
          id: '5',
          title: '从萨达萨达萨达萨达'
        },
        {
          id: '6',
          title: '看见撒旦年卡沉思u阿萨'
        },
        {
          id: '7',
          title: 'aasdkaskmdas'
        },
        {
          id: '8',
          title: '爱看书的喇嘛卡了'
        },
        {
          id: '9',
          title: '看见撒旦年卡沉思u阿萨'
        },
        {
          id: '10',
          title: 'aasdkaskmdas'
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
    },
    gotoArticle (id) {
      console.log(id)
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
