import{_ as l,c as e,o as i,V as t}from"./chunks/framework.3bce2be7.js";const b=JSON.parse('{"title":"建站日记","description":"这是服务器建站的一系列记录，早期的版本已经遗失，这里是目前的一些实践与想法","frontmatter":{"title":"建站日记","description":"这是服务器建站的一系列记录，早期的版本已经遗失，这里是目前的一些实践与想法","date":"2020-01-10T00:00:00.000Z","tags":["建站"]},"headers":[],"relativePath":"posts/buildSite.md"}'),a={name:"posts/buildSite.md"},r=t('<h3 id="ucloud-服务器" tabindex="-1">ucloud 服务器 <a class="header-anchor" href="#ucloud-服务器" aria-label="Permalink to &quot;ucloud 服务器&quot;">​</a></h3><ul><li>主站和博客在/usr/local/src</li><li>blog-clark-cui 与 homesite 都开启了自动上传 action 用 ftp 连接服务器上传的，服务器里的.git-ftp.log 文件就是记录的</li></ul><h3 id="关于图床的思考" tabindex="-1">关于图床的思考 <a class="header-anchor" href="#关于图床的思考" aria-label="Permalink to &quot;关于图床的思考&quot;">​</a></h3><ul><li>图床不是必需品，感觉没啥用 <ul><li>防盗链</li><li>http</li><li>开启水印</li><li>图形页面方便管理（没有哪一家实现了）</li><li>删除（操作繁琐）</li></ul></li><li>硬是要用的话就用现有的七牛云吧，都配置好了，配合 picgo</li></ul><h3 id="关于云托管的思考" tabindex="-1">关于云托管的思考 <a class="header-anchor" href="#关于云托管的思考" aria-label="Permalink to &quot;关于云托管的思考&quot;">​</a></h3><ul><li>腾讯云静态托管可用 <ul><li>有自动 https 域名</li><li>但是依托空间，只有第一个空间免费</li><li>如果有动态需求，只能用他的云数据库和云函数，体验不好</li></ul></li><li>别的主机商的托管 <ul><li>国内访问慢</li></ul></li><li>总结 <ul><li>可以做文档类的托管，主站还是不必了。不过都弄主站了，多弄个 nginx 托管似乎也没啥问题</li></ul></li></ul><h3 id="关于-tsl-证书" tabindex="-1">关于 tsl 证书 <a class="header-anchor" href="#关于-tsl-证书" aria-label="Permalink to &quot;关于 tsl 证书&quot;">​</a></h3><ul><li>使用 cerbot,注意相关东西要装在 docker 里，Nginx 就在 docker 里，全局是没有的</li></ul><h3 id="关于-vitepress" tabindex="-1">关于 vitepress <a class="header-anchor" href="#关于-vitepress" aria-label="Permalink to &quot;关于 vitepress&quot;">​</a></h3><ul><li>新版的 vuepress 和 vitepress 类似，但是 vitepress 不支持插件系统</li><li>使用 vitepress 重构主站，目前已经完成首页，还需要完成 blog 页 <ul><li>使用 nodejs 获取本地文件并处理头部参考 <a href="https://juejin.cn/post/6896382276389732359" target="_blank" rel="noreferrer">掘金</a></li><li>具体案例参考 <a href="https://github.com/airene/vitepress-blog-pure" target="_blank" rel="noreferrer">vitepress-blog-pure</a></li></ul></li><li>sidebar 使用 slug 组件，在 vitepress-for-component 里 <ul><li>完成品参考 <a href="https://github.com/dewfall123/vitepress-for-component" target="_blank" rel="noreferrer">vitepress-for-component</a></li></ul></li></ul>',10),s=[r];function o(u,n,c,d,h,p){return i(),e("div",null,s)}const f=l(a,[["render",o]]);export{b as __pageData,f as default};
