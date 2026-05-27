---
title: hexo折腾日记
date: 2024-10-01 23:41:41
tags:
  - webserver
---

# hexo使用中遇到的问题和解决方法


 头文件定义

```plaintext
title: 标题
date: 时间
tags: “tag”
categories: 分类归递
sticky: 优先级
readmore: true	#封面显示
<!-- more -->	#截至显示

```



**girls-index**

```plaintext
- name: 
  avatar: 
  from: 
  url: 
  reason:

```



hexo 基础命令

```plaintext
hexo cl #清除本地缓存文件
hexo g	#生成网页静态文件
hexo s	#启动hexo 服务

```



遇到无法正确上传的情况可能是git仓库没有正确配置

```plaintext
cd 你的博客根目录
vi _conifg.yml
编辑
deploy:
  type: git
  repo: https://密钥@github.com/xubuyuan18/blog
  branch: main # 默认使用 master 分支
  保存退出
  
配置Deployment首先，你需要为自己配置身份信息，打开命令行，然后输入：
git config --global user.name "yourname"
git config --global user.email "youremail"
如果报错可以使用
git config --global user.name --replace-all yourname
全局替换


```





hexo-yun自用配置

```plaintext
banner:       #开始标语
  enable: true
  title: 许步鸢的小站
  border: true
  cloud:
    enable: true
    color: white
  go_down:
    enable: true
    icon: ri:arrow-down-s-line

avatar:			
  enable: true
  url: /images/avatar.jpg
  rounded: true
  opacity: 1
  mickey_mouse: false
  status:
    enable: true
    emoji: 😭
    message: 大家一起GO一辈子好吗 #头像
wordcloud:
  enable: true
  height: 600
  count: true
  time: true  #云体流动效果

social:   #侧边栏图标
  - name: GitHub
    link: https://github.com/xubuyuan18
    icon: ri:github-line
    color: &#x27;#181717&#x27;
  - name: 哔哩哔哩动画
    link: https://space.bilibili.com/441828893
    icon: ri:bilibili-line
    color: &#x27;#FF8EB3&#x27;
footer:           #运行时间显示
  live_time:
    enable: true
    prefix: 本博客已运行
    suffix: (●&#x27;◡&#x27;●)
    start_time: &#x27;2024-09-06T09:00:00&#x27;

medium_zoom: true #图片放大预览

bg_image:       #背景壁纸
  enable: true
  url: https://pic2.imge.cc/2024/10/12/670a20fee140a.jpg
  dark: https://pic2.imge.cc/2024/10/12/670a050e8ce49.png
  # blur: 30px # 设置背景模糊程度
  opacity: 0.8
pages:  
#关闭友链链接
say:
  enable: true
  api: https://cdn.jsdelivr.net/gh/ElpsyCN/say@gh-pages/sentences.json
  # https://developer.hitokoto.cn/sentence/
  hitokoto:
    enable: true
    api: https://v1.hitokoto.cn #中二语录

mourn:
  enable: true
  days:
    - 4-4   #纪念日哀悼
search:
  path: search.json
  field: post
  format: html
  limit: 10000  #搜索
wordcount:
  enable: true
  count: true
  time: true  #字数统计
# search
# https://github.com/next-theme/hexo-generator-searchdb
local_search:
  enable: true  #搜索

reward:
  enable: true
  icon: ri:hand-coin-line
  comment: 如果以上文章帮助到了你，不妨请我喝杯咖啡
  # url: https://github.com/YunYouJun/yunyoujun.github.io/issues/96
  methods:
    - name: 支付宝
      path: https://pic2.imge.cc/2024/11/16/67382dc367df6.jpg
      color: &#x27;#00A3EE&#x27;
      icon: ri:alipay-line
    - name: 微信支付
      path: https://pic2.imge.cc/2024/11/16/67382dc383063.jpg
      color: &#x27;#2DC100&#x27;
      icon: ri:wechat-pay-line
  creative_commons:
  license: by-nc-sa
  post: true
  language: deed.zh
  clipboard: false


```