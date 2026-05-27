---
title: debain 路由
date: 2024-10-15 10:10:35
tags:
  - debain
---

## debain 开启路由转发功能


**sysclt -w net.ipv4.ip_forward=1**
**sysctp -p**


验证是否成功开启路由转发


sysctl net.ipv4.ip_forward


成功后会显示


net.ipv4.ip_forward = 1		
#代表路由转发成功开启

## debain 配置IP


- 编辑 `/etc/network/interfaces` 文件来设置静态IP地址。





auto eth0
iface eth0 inet static
    address 192.168.1.101
    netmask 255.255.255.0
    gateway 192.168.1.254
    dns-nameservers 8.8.8.8 8.8.4.4

## 开启PAT端口映射连接公共互联网

### **iptables**


1.**确保iptables已安装**


apt update
apt install iptables


2.**配置iptables进行PAT**