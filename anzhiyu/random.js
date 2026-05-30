var posts=["2026/05/30/HEXO折腾日记/","2025/05/30/Linux娘守护日记/","2026/05/30/华为ICT比赛记录/","2024/05/30/hexo/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };