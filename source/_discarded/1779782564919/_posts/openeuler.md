---
title: OpenEuler
date: 2024-12-12 22:04:48
tags:
  - openeuler
---

# 网络YUM源配置

```plaintext
确定操作系统版本

cat /etc/os-release

```


## 选择yum源版本 配置yum源文件

```plaintext
cd /etc/yum.repos.d/
mv openEuler.repo openEuler.repo.bak  *备份原有的配置文件*
vi openEuler.repo  *创建或编辑新的配置文件*

```




## 编辑yum源

```plaintext
[openEuler-everything]
name=openEuler-everything
baseurl=http://repo.huaweicloud.com/openeuler/openEuler-22.03-LTS-SP3/everything/x86_64/
enabled=1
gpgcheck=0
gpgkey=http://repo.huaweicloud.com/openeuler/openEuler-22.03-LTS-SP3/everything/x86_64/RPM-GPG-KEY-openEuler

```




# 本地YUM源配置

```plaintext
懒的写

```




# SELinux与防火墙配置

```plaintext
查看SElinnux状态
getenforce
临时更改SELinux模式
setenforce 0
semanage 安装（用于管理和配置SELinux策略）
yum install policycoreutils-python-utils
查看所有开放端口
semanage port -l
查看特定端口是否开放（例如查看端口5000）
semanage port -l | grep 5000
查看针对特定服务（如http）开放的端口
semanage port -l | grep http_port_t
添加端口（例如开放5002端口给http服务）
semanage port -a -t http_port_t -p tcp 5502
删除端口（例如关闭http服务的5002端口）
semanage port -a -t http_port_t -p tcp 5502
防火墙配置
启动/停止 防火墙服务
systemctl start/stop firewalld
查看防火墙服务状态
systemctl status firewalld 
启用/禁用防火墙服务开机自启
systemctl enable/disable firewalld
添加/删除端口到防火墙规则
firewall-cmd --permanent --add/remove-port=80/tcp
重新加载防火墙规则
firewall-cmd --reload
查看当前防火墙规则 
firewall-cmd --list-all
允许/阻止特定服务通过防火墙 
firewall-cmd --permanent --add/remove-service=http
查看防火墙日志 
journalctl -u firewalld

```