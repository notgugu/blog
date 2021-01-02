<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-02 15:18:14
-->
<template>
  <div class="home">
    <div class="content">
      <div class="content-article">
        <article-list :articleList="articleListData"
        :nomore="nomore"
        @loading="loading"
        ></article-list>
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
    <go-top></go-top>
  </div>
</template>

<script>
import articleList from '@/components/article/articleList'
import card from '@/components/card/card'
import goTop from '@/components/goTop/goTop'
import { getArticleList, getHotArticleList } from '@/api/home'
export default {
  name: 'home',
  data () {
    return {
      articleListData: [],
      hotArticleListData: [],
      page: 1,
      num: 10,
      total: 0,
      isLoading: false,
      isShowQQCode: 0,
      isShowWechatCode: 0
    }
  },
  created () {
    this.getArticleList()
    this.getHotArticleList()
  },
  computed: {
    nomore () {
      return this.articleListData.length >= this.total
    }
  },
  methods: {
    loading () {
      this.page++
      if (!this.isLoading) {
        this.getArticleList()
      }
    },
    getArticleList () {
      this.isLoading = true
      let params = {
        page: this.page,
        num: this.num
      }
      getArticleList(params)
        .then(res => {
          this.articleListData = this.articleListData.concat(res.data)
          this.total = res.total
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    getHotArticleList () {
      getHotArticleList().then(res => {
        this.hotArticleListData = res
      }).catch(err => {
        console.log(err)
      })
    },
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
    card,
    goTop
  }
}
</script>

<style lang="less">
@import '../../assets/css/home/index.less';
</style>
