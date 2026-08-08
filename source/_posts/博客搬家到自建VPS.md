---
title: 博客搬家：从 GitHub Pages 到自建 VPS，顺手打通 Obsidian 写作流
abbrlink: 41207
date: 2026-08-08 12:10:00
tags:
  - Hexo
  - 折腾
  - CI/CD
  - Nginx
categories:
  - 技术
---

上次《HEXO折腾日记》里我把博客从带后台的动态站换成了 Hexo，托管在 GitHub Pages 上。用了一段时间，还是决定搬到自己的 VPS——顺手把「在 Obsidian 里写完就自动上线」这条链路一起打通了。

这篇记录整个过程，包括踩的四个坑。

## 为什么搬

GitHub Pages 本身没什么毛病，免费、稳定、不用管。但有几个点一直不太顺：

- **国内访问速度**看运气，有时候几秒才出首屏
- 想加点服务端的东西（自定义 header、缓存策略、和其他服务共用域名）就没辙
- 我 VPS 上本来已经跑着一堆服务，openresty 一直开着，多托管一个静态站几乎零成本

正好证书、反代这套东西 VPS 上都有现成的，那就搬。

## 目标链路

想要的效果是：在 Obsidian 里写完文章，什么都不用管，过几分钟自动上线。

```
Obsidian 写文章 (source/_posts/)
  │  Obsidian Git 插件自动 commit + push
  ▼
GitHub 仓库
  │  Actions：push 立即构建 + 每 6 小时定时
  ▼
hexo generate → rsync 推送
  ▼
VPS 静态目录 → openresty 托管
```

定时构建那一条是为了追番列表——`hexo-bilibili-bangumi` 是构建时去抓 B 站 API 的，不定期重新构建的话，追番数据就永远停在上次发文章的时刻。

## 关键设计：vault 直接就是仓库

一开始想的是 Obsidian 笔记放一处、博客仓库放另一处，写完复制过去。后来发现完全没必要——**直接把 Hexo 仓库根目录当 Obsidian vault**，文章写在 `source/_posts/` 里，配上 Obsidian Git 插件自动提交，链路最短。

唯一要注意的是把 `.obsidian/` 加进 `.gitignore`，不然 Obsidian 的一堆配置和工作区状态会污染每次提交：

```
.obsidian/
```

Obsidian Git 那边设置很简单：auto backup interval 设 5 分钟，push on backup 开着，pull on startup 开着。写完文章等 5 分钟，或者手动点一下 backup，就走完了。

## Actions：构建 + rsync 推送

工作流的核心部分：

```yaml
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

concurrency:
  group: deploy
  cancel-in-progress: true
```

`workflow_dispatch` 一定要加——追番插件抓 B 站偶发失败会把整个构建带挂，有个手动重跑的入口省事很多。`concurrency` 是防止连续两次 push 打架。

部署步骤用 `easingthemes/ssh-deploy`，底层就是 rsync：

```yaml
      - name: Deploy to VPS
        uses: easingthemes/ssh-deploy@v6
        with:
          SSH_PRIVATE_KEY: ${{ secrets.VPS_SSH_KEY }}
          REMOTE_HOST: ${{ secrets.VPS_HOST }}
          REMOTE_USER: ${{ secrets.VPS_USER }}
          REMOTE_PORT: 22
          SOURCE: "public/"
          TARGET: "/path/to/site/public/"
          ARGS: "-rlgoDzvc -i --delete"
```

`--delete` 很重要。Hexo 改标题会导致 permalink 变化，不删旧文件的话，站点里会留一堆访问不到的僵尸页面。

VPS 侧建了个专用账号，只对站点目录有写权限，不用 root：

```bash
useradd -m -s /bin/bash blogdeploy    # 名字随意
mkdir -p /home/blogdeploy/.ssh && chmod 700 /home/blogdeploy/.ssh
# 把 CI 专用公钥写进 authorized_keys
chown -R blogdeploy:blogdeploy /path/to/site
```

CI 的密钥是单独生成的一对，和我平时登录用的密钥分开。私钥丢进 GitHub Secrets，公钥放 VPS。

## 踩的四个坑

### 1. `ssh-deploy@v5` 这个版本不存在

按印象写了 `@v5`，Actions 直接报：

```
Unable to resolve action `easingthemes/ssh-deploy@v5`, unable to find version `v5`
```

去看 tag 列表才明白：这个仓库有 `v5.1.2`、`v5.0.3` 这些具体版本，但**没有 `v5` 这个移动 tag**，移动 tag 只有 `v6`。写 `@v6` 就好。教训是引用第三方 action 前先扫一眼 tags，别凭直觉。

### 2. v6 的参数名是大写

改成 v6 之后，构建过了，部署步骤报了个乍看莫名的错：

```
❌ [INPUTS] sshPrivateKey is mandatory
❌ [INPUTS] remoteHost is mandatory
```

明明参数都传了。往上翻日志才看到 warning：

```
Unexpected input(s) 'ssh-private-key', 'remote-host', ...
valid inputs are ['SSH_PRIVATE_KEY', 'REMOTE_HOST', 'REMOTE_USER', ...]
```

v6 用的是**全大写下划线**风格的参数名，我写的小写连字符版本它完全不认，于是当成没传。这种错误提示挺坑——它说"缺参数"，实际是"参数名不对"。

### 3. VPS 上没装 rsync

参数改对了，这次报：

```
bash: line 1: rsync: command not found
rsync error: error in rsync protocol data stream (code 12)
```

SSH 连接是成功的，卡在远端执行 rsync。这个 action 需要**两端都有 rsync**，Actions runner 自带，但我的 Rocky Linux 最小化安装没有：

```bash
dnf install -y rsync
```

装完重跑，一次通过。

### 4. nginx 的 `if` 会挡掉 acme 验证

这个坑最有意思。站点配置（1Panel 生成的模板）长这样：

```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name example.com;

    location ^~ /.well-known/acme-challenge {
        allow all;
        root /usr/share/nginx/html;
    }

    if ($scheme = http) {
        return 301 https://$host$request_uri;
    }
    ...
}
```

看起来 `.well-known` 的 location 写在前面、还是 `^~` 前缀优先，应该能正常放行证书验证请求。实际测试：

```bash
curl -I http://example.com/.well-known/acme-challenge/test
# HTTP/1.1 301 Moved Permanently
```

被 301 了。原因是 **nginx 的 `if` 在 server 层属于 rewrite 阶段（SERVER_REWRITE_PHASE），执行时机早于 location 匹配（FIND_CONFIG_PHASE）**。也就是说不管你 location 写得多靠前、优先级多高，server 级的 `if` 都先跑完了。

解决办法是把跳转塞进 `location /`：

```nginx
location / {
    if ($scheme = http) {
        return 301 https://$host$request_uri;
    }
}
```

这样跳转行为不变，但 `.well-known` 走自己的 location，不受影响。或者干脆用 DNS 验证签证书，绕开这个问题。

## 顺手做的：域名统一

搬完发现站点挂了两个域名——`www.example.com` 是 GitHub Pages 时代 CNAME 里写的，`blog.example.com` 是 VPS 上建站时加的，两个都指向同一份文件。

有点乱，统一成 `blog` 一个。主站配置去掉 www，然后单独加个跳转块：

```nginx
server {
    listen 80;
    server_name www.example.com;
    return 301 https://blog.example.com$request_uri;
}
```

跳转块只监听 80，所以不需要给 www 配证书——省一个域名的签发。仓库那边 `_config.yml` 的 `url` 和 `source/CNAME` 也一起改掉，保证站内生成的绝对链接一致。

改 nginx 配置的固定动作，别偷懒：

```bash
nginx -t          # 先校验语法
nginx -s reload   # 再生效
```

（我的 openresty 跑在容器里，前面加个 `docker exec 容器名` 就行。）

## 一个插曲

改配置改到一半，SSH 突然连不上了。现象很怪：TCP 22 端口 telnet 得通，但 SSH 卡在 banner exchange 超时；同时 VPS 上所有服务的域名全部返回 000。

第一反应是被墙了或者 sshd 挂了，试了走代理连、等了几轮重试都不行。后来才发现是**服务商在做宿主机系统升级**，通知早就发了，我没看。

记一下这个特征：**TCP 端口通但应用层握手不响应 + 所有服务同时不可达 = 大概率是宿主机层面的事，不是你的配置问题**。等就完事了，别乱改。

## 现在的状态

链路跑通了：在 Obsidian 里写完这篇，保存，等插件自动提交，Actions 构建部署，几分钟后你就能看到它。

剩下的小尾巴是 HTTPS 证书要重新签一下（域名统一后只需要签一个域名了）。另外 GitHub Pages 那边的 `gh-pages` 分支我留着没删——搬家这种事，退路多留一天不亏。
