<!--
 * @Description: ...
 * @Version: 1.0
 * @Author: mxk
 * @Date: 2020-12-29 17:26:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-01-09 14:37:21
-->
<template>
  <div class="mine">
    <h1>关于我</h1>
    <card :title="'关于我'">
      <template v-slot:content>
        <div class="content">
          <div>
            <p><span>网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>凡</p>
            <p><span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</span>前端开发工程师</p>
            <p><span>就读大学：</span>中国计量大学 信息工程学院 通信工程</p>
            <p><span>工作单位：</span>万郡绿建科技有限公司</p>
            <p>
              <span>技术栈：</span>
              <br>熟练使用html(5)和css(3)，熟悉less和sass等css预处理器的使用；<br>
              熟练使用javaScript，熟悉es6语法；<br>
              熟练使用vue.js、axios等；<br>
              熟悉webpack，git等前端工具的使用；<br>
              了解使用node.js开发简单的web后端应用，如本博客后台接口；<br>
            </p>
            <p>
              <span>个人简介：</span>一个99年的萌新前端，19年年底即大三上开始学习前端，20年6月底大三下开始实习，一边工作一边学习，会在本博客持续分享一些技术博客和工作经历等文章。
            </p>
          </div>
        </div>
      </template>
    </card>
    <card :title="'关于本站'">
      <template v-slot:content>
        <div class="content">
          <div>
            <p><span>博客网址：</span>暂无</p>
            <p><span>上线时间：</span>未定</p>
            <p><span>前端部分：</span>vue.js + element-ui</p>
            <p><span>后端部分：</span>node.js + mysql</p>
            <p>
              <span>网站简介：</span>gitHub开源地址为：https://github.com/notgugu/blog；本站的主要栏目有文章，分类，在线留言，我的等
            </p>
          </div>
        </div>
      </template>
    </card>
    <card :title="'更新计划'">
      <template v-slot:content>
        <div class="content">
          <div>
            <p><span>1：</span>实现自动化部署</p>
            <p><span>2：</span>实现移动端适配</p>
            <p><span>3：</span>前端代码由vue2重构为vue3</p>
            <p><span>4：</span>服务器渲染（Vue Ssr）- 待定</p>
          </div>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import card from '@/components/card/card'
export default {
  name: 'mine',
  components: {
    card
  }
}
</script>

<style scoped lang="less">
@import '../../assets/css/mine/index.less';
</style>
