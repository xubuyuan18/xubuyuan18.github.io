var posts=["1970/01/01/hello-world/","2025/05/30/Linuxn娘守护日记/","2026/05/30/华为ICT比赛记录/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };