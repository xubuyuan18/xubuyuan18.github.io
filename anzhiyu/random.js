var posts=["2026/05/30/HEXO折腾日记/","2024/06/20/Linux-GRUB手抖删分区/","2025/05/30/Linux娘守护日记/","2026/05/30/华为ICT比赛记录/","2026/04/30/Linx CVE-2026-31431/","2024/03/21/Linux娘救援行动：GRUB2换主题踩坑记/","2024/05/30/hexo/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };