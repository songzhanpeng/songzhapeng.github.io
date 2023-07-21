import{_ as s,c as a,o as l,V as e}from"./chunks/framework.3bce2be7.js";const o="/assets/20210414120037.0232e571.png",t="/assets/20210413231645.4c03f504.png",n="/assets/20210414121928.d1eddbb4.gif",p="/assets/20210414121015.15547c4f.gif",A=JSON.parse('{"title":"TTS","description":"tts","frontmatter":{"title":"TTS","description":"tts","date":"2021-05-03T00:00:00.000Z","tags":["javascript"]},"headers":[],"relativePath":"posts/TTS.md"}'),r={name:"posts/TTS.md"},i=e('<h3 id="需求" tabindex="-1">需求 <a class="header-anchor" href="#需求" aria-label="Permalink to &quot;需求&quot;">​</a></h3><blockquote><p>背景：tts 老版代码是用 flash 写的，源码也找不到了。由于各大浏览器开始禁用 flash 功能，所以需要用 H5 重构</p><p>tts 是什么：就是一个富文本编辑器，通过格式化编辑文本，调用后端文字转语音的接口生成听力材料并播放。</p></blockquote><ul><li>第一版要求功能的复制，并修复一些 bug</li><li>后续要求功能的优化，并增加一些功能</li><li><img src="'+o+'" alt="img"></li></ul><h3 id="技术选型" tabindex="-1">技术选型 <a class="header-anchor" href="#技术选型" aria-label="Permalink to &quot;技术选型&quot;">​</a></h3><ul><li>外围的界面由于 UI 简单故使用原生 JS 和 Css 编写。Mizar 在技术选型的时候，正是 Vue3 正在推广的时候，由于依赖关系比较单一，所以进行了 Vue3 的尝鲜。</li><li>考虑到 UI 组件比较多，所以使用了 ELEMENT-Plus（不用 Ant Design Vue（Less））</li><li>一开始使用 Vue-CLI 生成模板，后续因为几项 Bug，而且 VueCli 的黑箱机制，定位问题比较困难，所以参考 VueCli 的源码重写了一套模板配置。（由于文档不全，出了问题也找不到方案，最初是在 Vue form 里提问 然后有人帮解决的）</li><li>打包工具用的 webpack v5,项目里配置了 eslint 和 prettier 的规则，用的规范是 <a href="https://github.com/AlloyTeam/eslint-config-alloy" target="_blank" rel="noreferrer">alloy-config</a>。</li></ul><h3 id="方案" tabindex="-1">方案 <a class="header-anchor" href="#方案" aria-label="Permalink to &quot;方案&quot;">​</a></h3><ol><li><p>为了保证外部调用，抽出编辑器部分 Mizar，并把接口调用都抛出来。外部 UI 放在 Proxima，通过 UMD 的形式调用 Mizar。</p></li><li><p>编辑区域实际就是一个富文本编辑器，因为有标签的存在，所以不能用 textArea。参考了一些主流的富文本编辑器的实现，选用</p></li></ol><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">contenteditable=&quot;true&quot;</span></span></code></pre></div><ol start="3"><li>编辑器需要获取选区，使用浏览器的 selection api。</li><li>编辑器需要插入和删除 dom，使用浏览器的 range.insert 和 range.deleteContents api 。</li></ol><h3 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h3><img src="'+t+'" alt="image-20210413231642326"><h3 id="核心功能的实现" tabindex="-1">核心功能的实现 <a class="header-anchor" href="#核心功能的实现" aria-label="Permalink to &quot;核心功能的实现&quot;">​</a></h3><h4 id="鼠标光标的缓存" tabindex="-1">鼠标光标的缓存 <a class="header-anchor" href="#鼠标光标的缓存" aria-label="Permalink to &quot;鼠标光标的缓存&quot;">​</a></h4><blockquote><p>在编辑器里，鼠标选择内容后，并不会立即插入标签，后续会点击弹窗、下拉框，在点击的时候就会导致 selection 对象改变。当用户拖选内容的时候，如果鼠标脱离编辑器，那此时的 selection 对象就会是空。如果用户用键盘操作光标，selection 对象不会更新。</p></blockquote><p><strong>参考了一些开源文本编辑器的实现，这里都是做了光标缓存的处理。slection 事件触发的时候，记录用户单击或者拖选的 selection。监听鼠标离开事件，离开时就记录离开时的 selection。监听键盘事件，重置 selection</strong></p><h4 id="内容校验" tabindex="-1">内容校验 <a class="header-anchor" href="#内容校验" aria-label="Permalink to &quot;内容校验&quot;">​</a></h4><blockquote><p>内容校验有 3 个入口：初始化页面，获取页面内容的时候；保存/播放的时候；粘贴内容的时候。</p></blockquote><ol><li>初始化页面：由于由许多 flash 编辑的听力材料数据，所以需要把 falsh 的数据转换为 H5 支持的数据格式。目前的逻辑是，编辑器支持编辑老的数据，但是 h5 编辑器编辑过的数据，flash 版的编辑器就不再支持。这里过滤主要用正则白名单过滤，把 flash 的信息和一些样式属性，class，不支持的标签都过滤掉。匹配换行符和换行标签，还有块标签，根据标签分组，每一行都用 p 标签包裹。行内正则匹配文本（用没有&lt;&gt;的文字和符号），每一段文本都用 span 标签包裹，给图片标签都添加唯一标识。因为 flash 图片的 source 不能用于 H5,格式不一致，所以需要根据图片 id，查本地的表，获取图片 url。</li><li>保存/播放：基本逻辑与初始化一致</li><li>粘贴内容：如粘贴功能所述</li></ol><h4 id="粘贴功能" tabindex="-1">粘贴功能 <a class="header-anchor" href="#粘贴功能" aria-label="Permalink to &quot;粘贴功能&quot;">​</a></h4><blockquote><p>线上的粘贴文本在粘贴 word 或者网页的时候会有 bug。</p><p>此处编辑器 H5 的实现是用了 contenteditable,所以理论上是可以粘贴 html。如果不禁止默认粘贴事件，那么编辑器内可以粘贴任意来源会被存到剪贴板的内容。但由于接口生成音频需要匹配对应的 html 格式，同时不能带有白名单之外的内容，所以必须做内容过滤。</p></blockquote><ul><li>粘贴功能第一版做了简单的处理，粘贴的时候只粘贴纯文本。实现的方案就是判断文本有无换行，没有换行就插入<code>&lt;span&gt;</code>标签包裹的文本。有换行，就根据换行分组，分别插入<code>&lt;p&gt;</code>标签包裹的文本，每次插入后都会调用 range.collapse(false)收缩光标至插入内容之后（chrome56 以下不一致）。</li><li>由于会有许多在当前编辑器粘贴内容，或者是打开过去编辑的内容，粘贴到新的编辑器之类的需求。所以做了区分来源的处理，剪贴板无法直接判断来源，但可以根据内容来判断来源。我会根据标签的 id 来判断，只要有不是我 id 的内容，就会被当作纯文本粘贴。都是我 id 的内容，会被当作 html 粘贴。</li><li>用户在当前位置粘贴，还是选择内容后粘贴，这里做了处理。如果是选择内容，会调用 deleteContents 方法删除内容后，再插入标签。最后会调用 selection.collapseToEnd 收缩光标至末尾。</li></ul><h4 id="标签错误提示闪烁" tabindex="-1">标签错误提示闪烁 <a class="header-anchor" href="#标签错误提示闪烁" aria-label="Permalink to &quot;标签错误提示闪烁&quot;">​</a></h4><blockquote><p>需求是有标签缺失或者错位的时候，需要闪烁提示错误的标签</p></blockquote><p><img src="'+n+'" alt="错误提示"></p><ol><li><p>标签错误提示这里，有两种提示的方式。一种是用户编辑的时候提示，一种是用户播放/保存的时候提示。这里使用的是第二种。</p></li><li><p>错误检测这里，使用的方法是用 selection api 先获取要检测内容的 html 字符串，为了定位错误标签，给所有的标签都加上了 guid 唯一标识。（这里第一版做的时候，单标签插入的是唯一标识，双标签插入的是相同的标识，错误检测的时候检测到双标签标识的缺失非常容易。但会有一个问题，当检测出错误标签后，用户不删除当前错误标签，选择插入一对相同的标签，再删除新增的那项。由于这对标签不是同时生成，故 guid 不同，导致错误检测出 bug）</p><p>目前用的是一个栈的思想，维护一个错误栈和一个左栈，遇到一个左标签就 push 进栈，遇到一个右标签就比较最后一个元素，如果不匹配，把右标签 push 进错误栈，如果匹配，左标签 pop 出栈，最后把剩余的左栈加入错误栈，所有元素就是错误的项。</p></li></ol><h4 id="音频播放" tabindex="-1">音频播放 <a class="header-anchor" href="#音频播放" aria-label="Permalink to &quot;音频播放&quot;">​</a></h4><blockquote><p>音频播放这里，会有播放单个音频和顺序播放音频数组的情况，接口为了减少单词请求量，把请求数据按 p 标签分组。</p></blockquote><p>自己封装了 ttsAudio</p><blockquote><p>播放音频数组，每一段音频结束后都会有 0.5s 左右的暂停时间，这段时间并没有在音频里生成。所以需要前端手动暂停，前端用的 setTimeOut 实现的暂停。</p><p>这里会有一个问题就是，播放音频数组，当一段音频刚好结束，用户点击播放暂停，去调用 audio.pause()方法会失效。</p></blockquote><p>这里解决的办法是，调用暂停的时候就判断是播放时暂停，还是结束时暂停。如果是播放时暂停就正常暂停，后续可以续播。如果是一段结束时暂停，每段播放结束，数组就 shift，暂停时就清除掉 audio 对象，续播时新建 audio 播放剩余数组</p><h4 id="插入标签" tabindex="-1">插入标签 <a class="header-anchor" href="#插入标签" aria-label="Permalink to &quot;插入标签&quot;">​</a></h4><blockquote><p>插入标签分为 3 种，插入单标签，插入双标签，插入对话标签</p></blockquote><p><img src="'+p+`" alt="插入对话"></p><p>这里做了选择内容的校验：</p><ol><li>如果用户鼠标是光标聚焦状态，此时可以仅可以在光标位置插入单标签，其余会给弹窗提示</li><li>如果用户选择了内容，且内容不是对话的格式，此时仅可以在选择内容两端插入双标签，其余项置灰不可点击（还有根据选择内容的中英文，过滤插入标签的选择项）</li><li>如果用户选择了内容，且是对话的格式，此时可以插入双标签，也可以插入对话标签</li></ol><p><strong>插入标签这里，有两种方案，第一种是 document.execCommand，另一种是操作字符串。</strong></p><p>比较简单的方式肯定是操作字符串，但是初期调研的时候。苦于修改字符串后对位替换会有各种 bug...(sel 对象获取的 Html string 于 innnderHtml 获取的不一致，会有标签缺失（最后一个 br），字符转义 nbsp;...)</p><p>所以初期都使用了 document.execCommand 插入标签，这也是许多富文本编辑器使用的方式，但是在插入对话标签的时候会有问题 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify" target="_blank" rel="noreferrer">selection.modify</a></p><p>因为会有一个人一次性说多句话导致换行的情况，modify api 没有合适的参数，期间尝试用 extend character 去试探检测冒号，但是在许多边角情况出现了死循环，解决了许多边角情况，但因为输入的不确定性，所以处理很困难，期间出了许多 bug。</p><p>因为许多富文本编辑器并没有类似的，同时插入多行标签的情况，所以没有找到参考的代码，相关文章也很少。</p><p>后面在 github(app)刷到了一个项目，用了 range.deleteContents 方法删除了选中内容并在当前位置聚焦，跑通了方案二的逻辑。</p><p>所以目前插入单双标签用的方案一，插入对话标签用的方案二。</p><p>关于对话标签，有一个难点就是对话内容的检测，用什么来判断是一段话。因为会有多句话导致换行的情况，所以使用了:分割，:到非空的字符是人名，冒号后面一直到非空字符是句子。这样适配了出现换行的情况，但这样也会有一个问题就是，当对话内容里出现了冒号，比如 6：30，这种场景是比较高频的。</p><p>所以比较适中的方案就是，检测主动换行，只要主动换行，就算作一段。</p><p>调用 cloneContents 复制 fragment 对象，Fragment 是文档碎片，他不能当作普通的对象使用，可以用获取他的 innerHtml 字符串，再过滤一道。但最好的方式，就是新建一个空 div,然后使用 appendChild 录入当前 fragment，注意使用后的 fragment 会被清空。</p><h3 id="注意的点" tabindex="-1">注意的点 <a class="header-anchor" href="#注意的点" aria-label="Permalink to &quot;注意的点&quot;">​</a></h3><ul><li><p>为了减小包的体积，剔除了 Vue3,在 Proxima 里引用 Vue</p></li><li><p>webpack 打包生产环境压缩 js 和 css 并自动删除注释</p></li><li><p>sass-loder 用了 dart-sass，但是目前 dart-sass 配合 element-plus 使用的时候，会有图标样式缺失的情况（查看 issue 发现是 dart-sass 在编译的时候，默认会转换一遍 unicode 明文，会有双节字符乱码的情况）</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">对于图标编译之后，图标的content呈现乱码有dart</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">sass编译的原因，dart</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">sass编译时会将对应的unicode编码转换成对应unicode明文，所以通过伪元素来展示的图标如el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">icon</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">arrow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">before</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">content</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\e</span><span style="color:#C3E88D;">6df</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">，编译之后就变成了el</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">icon</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">arrow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;">before</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#FFCB6B;">content</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"></span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">，“”便是一个双字节字符</span></span>
<span class="line"><span style="color:#A6ACCD;">正常情况我们会在meta标签上设置：</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">meta charset</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">utf-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">，但这只对HTML内容解析有效，</span><span style="color:#82AAFF;">对于css内容中</span><span style="color:#A6ACCD;">(外部样式表下)的双字节字符（如中文）解析并没有作用的，所以如果浏览器请求回来的css资源的HTTP响应头里的Content</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">Type未指明</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">charset=utf-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">的话，浏览器根据自身的嗅探机制来决定采用哪一种编码解析，结果就会概率出现双字节字符乱码的情况</span></span>
<span class="line"><span style="color:#A6ACCD;">解决方案：</span></span>
<span class="line"><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">、使用 </span><span style="color:#89DDFF;">@</span><span style="color:#A6ACCD;">charset</span></span>
<span class="line"><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;">、使用 css</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">unicode</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">loader</span></span></code></pre></div></li><li><p>项目里 Vue3 的写法，我用了 setup 和 methods 组合的写法，官方更推荐都写进 setup 里，我为了好看一点，把 methods 单独拿出来放在了外面，主要是单文件的东西有点太多了，都放在 setup 里比较长。</p></li><li><p>根组件只有一个 APP，子组件有 3 个 Alert、Button、SecondAlert。这里有一些可以优化的地方，比如 App 和 Alert 的代码就比较长（不算样式文件 APP 超过 1600 行，Alert 超过 1000 行）。这里算是有一些历史原因，最初想把弹窗 Alert 封装成 vue 方法，通过 this.$alert直接调用，这样调用起来比较简洁。但是后续书写发现，弹窗代码和组件代码有许多逻辑耦合，方法于组件的通信比较困难，没有直接的方式，只能通过外部封装方法类的时候手动传入。所以把封装的方法挪出来当成了components，后续把一些代码拆到了SecondAlert，减少了一些代码量。APP根组件里可以把一些methods封装成全局方法，通过this.$method 调用，一些过滤方法，在 proxima 里也有重复的代码，可以提出来封装到导出的 mizar 类里，也可以减少一些代码量。</p></li></ul>`,47),c=[i];function d(u,h,D,y,C,m){return l(),a("div",null,c)}const b=s(r,[["render",d]]);export{A as __pageData,b as default};
