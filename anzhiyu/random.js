var posts=["1970/01/01/hello-world/","2026/05/30/HEXO折腾日记/","2024/05/30/hexo/","2025/05/30/Linuxn娘守护日记/","2025/05/30/test/","2026/05/30/华为ICT比赛记录/","2025/05/30/Linux娘守护日记/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };