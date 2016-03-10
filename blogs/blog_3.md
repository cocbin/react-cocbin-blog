# 【Git服务】Gogs安装配置（服务器版本Centos7）
[Gogs下载地址](https://dl.gogs.io/)
本例使用https://dl.gogs.io/gogs_v0.8.43_linux_amd64.tar.gz

## 安装Mysql数据库
### 安装
安装过或者想使用SqlLite的可以直接跳过。

```
$ yum install mariadb-server mariadb
```

### 加入随系统启动

```
$ systemctl enable mariadb
```

### 启动 mariadb 守护进程

```
$ systemctl start mariadb
```
### 安全配置 MariaDB

```
$ mysql_secure_installation
```

这里需要配置 mysql 根用户和密码、清除其他用户、清除不需要的数据库等。输出类似于下面的执行过程，其中需要我们从键盘输入的内容用出来了：

### 进入数据库

```
$ mysql -u root -p //输入密码
```
## 安装Gogs
### 安装Git

```
$ yum install git
```
### 新建git用户

```
$ adduser git
```
切换为git用户

```
$ su git 
```
在git用户的根目录新建.ssh文件夹，用于.ssh认证

```
$ mkdir .ssh
```
设置权限

```
chmod 700 .ssh
```
**注意：** .ssh文件夹及authorized_keys文件的权限必须严格设置，否则ssh证书无效

```
.ssh             700
authorized_keys  600
```

### 下载Gogs二进制包

```
$ wget https://dl.gogs.io/gogs_v0.8.43_linux_amd64.tar.gz
//根据对应服务器选择相关的包
```
解压二进制包

```
$ tar -zxvf gogs_v0.8.43_linux_amd64.tar.gz
```


### 建立数据库
不使用mysql可以跳过这一步。
在gogs包下，找到`./scripts/mysql.sql`，在mysql中执行

```
$ mysql -u root -p < scripts/mysql.sql
```

然后登录 MySQL 创建一个新用户 gogs，并将数据库 gogs 的所有权限都赋予该用户。

```
$ mysql -u root -p
> # （输入密码）
> create user 'gogs'@'localhost' identified by '密码';
> grant all privileges on gogs.* to 'gogs'@'localhost';
> flush privileges;
> exit;
```
### 在后台运行gogs

```
nohup ./gogs web > gogs.log 2>&1 &     
```
通过浏览器，http://address.com:3000/install
填写相关信息，开始安装。

**注意：** 安装时可以设置端口，但是子用户如git用户是无法监听80端口的，所以不要设置成80端口，可以先设置成3000端口，然后使用iptables转发，如下：

```
 iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
```

这样做有一个缺点，就是80端口和3000端口都是同一个应用

### 配置
在应用根目录/custom/conf/app.ini下设置。
配置项很清晰，看名字就知道配置的是什么了

```
APP_NAME = Git/Cocbin
RUN_USER = ####
RUN_MODE = ####

[database]
DB_TYPE  = mysql
HOST     = ###
NAME     = ###
USER     = ###
PASSWD   = ###
SSL_MODE = ###
PATH     = ###

[repository]
ROOT = ###

[server]
DOMAIN       = ###
HTTP_PORT    = ###
ROOT_URL     = ###
DISABLE_SSH  = false
SSH_PORT     = ###
OFFLINE_MODE = false
                         
```


