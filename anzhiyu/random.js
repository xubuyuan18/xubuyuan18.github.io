var posts=["2024/03/21/GRUB2换主题踩坑记/","2024/06/20/GRUB手抖删分区/","2026/05/30/HEXO折腾日记/","2026/04/30/Linux CVE-2026-31431/","2025/06/01/华为ICT比赛记录/","2025/05/30/Linux娘守护日记/","2026/04/10/基于K8s节点RAG本地知识库问答系统/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };