---
title: HEXO折腾日记
tags: 折腾
categories: 随笔
abbrlink: 36353
date: 2026-05-30 10:38:09
---

## 缘起：VPS扛不住了

我的 VPS 是 2 核 4G，装了 MySQL、OpenResty、x-ui、Openlist,笔记同步等一堆服务之后，可用内存捉襟见肘——装个带后台的博客 上来就吞 500MB+，实在养不起。

大一的时候就玩过 Hexo，当时因为每次写完都要手动构建部署，嫌麻烦弃了。两年年后重新捡起来，核心目标就一个：**流程自动化，写完即发布，全程不碰服务器。**

---

## 第一回：宿主之争——从 VPS 搬到 GitHub Pages

### 最初的方案

一开始 Hexo 跑在 VPS 上，OpenResty 反代静态文件，流程大致是：

1. 本地写文章 → push 到 Git
2. VPS 上 pull → `hexo generate`
3. nginx  serve 静态文件

听起来没毛病，但实际操作中遇到了两个玄学问题：

**CDN 抽风：** 开了 CDN 反而打不开，直连 IP 能访问但域名 404，国内能打开国外不行——中间环节太多，排查无从下手。

**端口访问正常但域名不行：** `http://VPS_IP:端口` 能正常显示页面，证明博客本身没问题，问题出在网络传输的链路上。

### 换方案

既然问题出在中间商（CDN、DNS、反向代理），那就干脆去掉中间商——**GitHub Pages**。

全球 CDN、免费 HTTPS、Git 原生集成，唯一的代价是仓库必须公开。反正博客内容本就是公开的，无所谓。

---

## 第二回：仓库改名

GitHub Pages 要求仓库名必须是 `用户名.github.io`，于是把 `xubuyuan18/hexo` 改名为 `xubuyuan18/xubuyuan18.github.io`。

改完之后需要同步两处配置：

```bash
# 更新本地 remote
git remote set-url origin https://github.com/xubuyuan18/xubuyuan18.github.io.git

# _config.yml 里的 url 也要改
url: https://xubuyuan18.github.io  # 原来是 https://xubuyuan18.github.io/hexo
```

url 忘改的话，文章里的所有链接都会 404，别问我怎么知道的。

---

## 第三回：自动化流水线——懒人的胜利

### GitHub Actions 自动构建

核心 workflow（`.github/workflows/deploy.yml`）：

```yaml
- run: npm ci
- run: npx hexo clean
- run: npx hexo generate
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./public
    publish_branch: gh-pages
```

`GITHUB_TOKEN` 是 GitHub 自动提供的，不需要手动创建任何密钥。对于同一仓库内部署来说，零配置即可。

注意先跑 `hexo clean` 再 `hexo generate`，避免旧缓存污染构建产物。

### 跨仓库触发

文章源文件在另一个仓库（`xubuyuan18/blog`），更新后需要通知 hexo 仓库重新构建。用的是 GitHub 的 **repository_dispatch** 机制：

```
blog 仓库 push
  → GitHub Actions 调用 repository_dispatch API
  → hexo 仓库收到事件
  → 跑构建，部署到 gh-pages
```

关键：调用方仓库需要持有**被调用方仓库权限的 Token**，存在 Secrets 里命名 `DISPATCH_TOKEN`。这个 Token 一路从旧仓库跟着过来还在用，比很多感情都持久。

**同步策略：** 最初用 `cp` 逐个复制文章，但 blog 仓库删了文章后 hexo 这边还留着。后来改成先 `git rm -r source/_posts/` 清空旧文件，再用 blog 仓库的最新内容完整替换——删除和新增都能正确同步。

全程不需要碰服务器。

---

## 第四回：DNS 与 CDN 缓存

`www.xubuyuan.top` CNAME → `xubuyuan18.github.io`，理论上两者等价，实际体验有差异：

| 域名 | 更新速度 |
|------|---------|
| `xubuyuan18.github.io` | 秒更新 |
| `www.xubuyuan.top` | 慢 5~10 分钟 |

原因是 GitHub Pages 对自定义域名有 CDN 缓存，`*.github.io` 域则不走这个缓存。

解决方案三选一：
1. **不管**——等几分钟自动刷新
2. **Cloudflare 前置**——可以手动刷缓存
3. **直接用 `*.github.io`**——舍弃自定义域名，追求最快更新

目前选方案 1。

---

## 第五回：VPS 大扫除

把 Hexo 从 VPS 迁走之后，系统里还留了不少垃圾：

- 正在运行的 `hexo s` 进程
- OpenResty 的 hexo 站点配置
- cron 定时拉取任务
- `/tmp/` 下居然还有一整套解压出来的 hexo 项目文件

清理清单：

```bash
pkill -f hexo
rm /opt/1panel/www/conf.d/hexo.conf
rm -rf /opt/1panel/www/sites/hexo/
crontab -r
rm -rf /tmp/hexo*
```

配合 `ps aux`、`ss -tlnp`、`systemctl list-units` 确认无残留。VPS 内存多释放了几百 MB。

---

## 第六回：主题配置笔记

### anzhiyu 主题

主题选了 anzhiyu，安装后改 `_config.yml` 的 `theme` 字段即可。

**导航栏音乐播放器：**

```yaml
nav_music:
  enable: true
  id: 2792934213
  server: netease
  type: playlist
```

**aplayerInject：** 开启后文章内可嵌入音乐，个人建议开了就别关，中途改配置容易陷入排查深渊。

**封面图：** 试了三种方式——

1. `cover: /images/cover.jpg`（相对路径）—— 本地能用，部署后可能 404
2. `cover: https://example.com/cover.jpg`（绝对 URL）—— 依赖外部源
3. `cover: https://xubuyuan18.github.io/images/cover.jpg`（指向已部署站点）—— 最稳定

结论：写死完整 URL 虽然丑，但不会背叛你。

---

## 第七回：GitHub Pages 自定义域名

### 配置步骤

DNS 加 CNAME 记录：
```
www.xubuyuan.top  CNAME →  xubuyuan18.github.io
```

GitHub 仓库 Settings → Pages → Custom domain 填上域名，Save。

### HTTPS 证书等待

GitHub 会自动向 Let's Encrypt 申请证书，需要等几分钟才能签发。刚设置完直接访问会报 `ERR_SSL_UNRECOGNIZED_NAME_ALERT`，等 5~10 分钟后恢复正常。不用慌，这是正常流程。

### 每次部署都丢域名——CNAME 文件陷阱

第一次配完自定义域名，在 GitHub Pages Settings 里填上 `www.xubuyuan.top`，访问正常。但第二次部署之后，自定义域名又没了，回退到了 `xubuyuan18.github.io`。

原因是：GitHub 帮你写了一个 `CNAME` 文件到 `gh-pages` 分支根目录，但 hexo 部署时用 `public/` **完整覆盖**了 `gh-pages`——那个 `CNAME` 文件就没了。GitHub 发现分支上没有这个文件，就认为你取消了自定义域名。

**解法：** 在 hexo 的 `source/` 目录下创建一个 `CNAME` 文件，内容写域名：

```
www.xubuyuan.top
```

`hexo generate` 时会把它带到 `public/`，部署后自然还在 `gh-pages` 分支上。一劳永逸。

同时记得把 `_config.yml` 里的 `url` 也改成自定义域名，否则 RSS/Sitemap 里的链接还是 `*.github.io`。

### 子域名隔离

`www.xubuyuan.top` 的 DNS 改指向 GitHub Pages，不影响 `1p.xubuyuan.top`、`agent.xubuyuan.top`、`note.xubuyuan.top` 等其他子域名。DNS 的子域名记录是各自独立的。

---

## 踩坑记录

### 1. YAML front matter 格式

`---` 必须顶格写，前面不能有空格。否则文章发出去全是空白页。

### 2. GITHUB_TOKEN 自动注入

GitHub Actions 中 `${{ secrets.GITHUB_TOKEN }}` 由系统自动提供，不需要自己创建。手动创建同名 Token 反而会覆盖系统自带的。

### 3. 配置修改后重新构建

改完 `_config.yml` 的 `url` 或 `root` 后必须重新跑一次构建部署，否则 RSS、Sitemap 里的链接会是错的。

### 4. 自定义域名一部署就丢？在 source/ 下放 CNAME 文件

GitHub Pages 的自定义域名配置存在 `gh-pages` 分支的 `CNAME` 文件里。如果构建产物覆盖了这个文件，域名就会自动回退。

解法：在 `source/CNAME` 写入你的域名，hexo 每次构建都会把它带到输出目录，永远丢不了。

### 5. DNS 传播时间

DNS 修改后传播时长取决于 TTL 设置——快则几分钟，慢则几个小时。最省心的做法是改完放那，第二天自然就好了。

---

## 后记

重新捡起 Hexo 的这几天，核心感受是：**真正解决问题的不是复杂的架构，而是合适的取舍。**

- 不用 VPS 自建 → 省下维护成本和内存
- 不用手动部署 → 省下重复劳动
- 不用纠结自定义域名 → 避免 CDN 缓存的困扰

每个选择都是权衡的结果。

---

*（完）*

*2026-05-31*
