import{_ as t,c as e,o as a,V as r}from"./chunks/framework.3bce2be7.js";const d=JSON.parse('{"title":"代理配置","description":"由于网络问题，需要做一些代理的设置，这里是我的一些记录","frontmatter":{"title":"代理配置","description":"由于网络问题，需要做一些代理的设置，这里是我的一些记录","date":"2020-06-10T00:00:00.000Z","tags":["工具"]},"headers":[],"relativePath":"posts/proxyConfig.md"}'),o={name:"posts/proxyConfig.md"},s=r('<h3 id="chrome" tabindex="-1">chrome <a class="header-anchor" href="#chrome" aria-label="Permalink to &quot;chrome&quot;">​</a></h3><p>chrome 安装 SwitchyOmega 把条件都删除，选择规则列表，autoProxy 规则网址填入 <a href="https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" target="_blank" rel="noreferrer">https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt</a> 立即更新情景模式(要开代理，注意不要被 switchyOmega 影响到，可以先把他设置为系统代理) 规则下设置 proxy 其他设置直接连接（此时本地代理工具无效），proxy 设置 127.0.0.1 端口 7890 应用选项 选择 auto switch</p><h3 id="clash" tabindex="-1">clash <a class="header-anchor" href="#clash" aria-label="Permalink to &quot;clash&quot;">​</a></h3><ul><li>开启 lan 模式，让内网能连接使用代理，用于 wsl2 连接代理</li><li>开启 tun 模式，<a href="https://docs.cfw.lbyczf.com/contents/tun.html#windows" target="_blank" rel="noreferrer">文档地址</a>，为不走代理的软件走软件，开启后很多命令行都不用再设置代理，比如 wsl2</li><li>一般开 clash 的 tun 模式就行，手动的地址是<code>http://127.0.0.1:7890</code></li><li><a href="https://maofun.com/739.html" target="_blank" rel="noreferrer">clash 配合 switch 插件</a></li></ul>',4),c=[s];function l(i,n,h,_,f,m){return a(),e("div",null,c)}const u=t(o,[["render",l]]);export{d as __pageData,u as default};
