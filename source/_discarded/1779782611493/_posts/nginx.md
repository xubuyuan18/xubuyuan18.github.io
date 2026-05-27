---
title: nginx
date: 2024-10-10 18:20:09
tags:
  - webserver
---

# Nginx 配置问题与解决方法


Nginx 配置与问题解析

# Nginx配置与解析


`Nginx`默认的配置文件是在安装目录下的 `conf`目录下，后续对 `Nginx`的使用基本上都是对此配置文件进行相应的修改。修改过`nginx.conf`配置文件，记得要重启`Nginx`服务

## 安装nginx (基础环境配置)


- 

yum install nginx 	#使用yum命令安装


- 

systemctl stop firewalld #实验环境下关闭防火墙与SElniunx策略


- 

setenforce 0


- 

systemctl start nginx	#启动nginx服务


在本地浏览器中输入本机IP地址，显示nginx主界面则nginx服务成功启动





## 配置个性化web界面

### 新建网站首页


- echo “this is nginx web server” > /var/ww/html index.html

- vi /etc/nginx/ngin #新建并编辑nginx的配置文件
server {
　　　　listen 80;    #监听端口
       server_name localhost;     #本机IP或域名
  location / {
  root /var/www/html;        #主目录
  index index.html;
  }
}

- nginx -t      #然后使用命令验证nginx语法正确性
tips:尽量不要修改nginx的主配置文件，在/cond.d 目录下的文件会被nginx默认识别。





- 重新通过web界面访问nginx主页




## 配置Nginx反向代理

### 实现效果：使用 Nginx 反向代理，访问IP直接跳转到百度主页


**PS**：此处如果要想从指定域名跳转到本机指定的ip，需要修改本机的hosts文件。


配置代码


server {
	listen       80;
	server_name  虚拟机IP;


location / {
	proxy_pass  [http://www.baidu.com](http://www.baidu.com/)
	}
}


如上配置，Nginx监听 80端口，访问虚拟机IP（不加端口号时默认为 80端口），访问该IP时会跳转到 百度主页上。

## 配置Nginx负载均衡

### 负载均衡的作用


解决服务器的高并发压力，提高应用程序的处理性能；
提供故障转移，实现高可用；
通过添加或减少服务器数量，增强网站的可扩展性；
在负载均衡器上进行过滤，可以提高系统的安全性。

#### Nginx负载均衡配置

##### 代理服务器 配置


vi /etc/nginx/nginx.conf


1.在Nnginx的主配置文件下的http块中配置


`# 设置服务器组
upstream backend &#123;
	server localhost;
	server localhost;
&#125;
`

###### 2.在server块下增加配置


server {
		listen 80;
		server_name localhost;
		location / {


​			# backend 就是服务器组的名称


​			proxy_pass [http://backend/](http://backend/);
​		}
​	}