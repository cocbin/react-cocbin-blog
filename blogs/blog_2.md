# JavaWeb 环境搭建 for MAC
## 安装JDK
进入Oracle官网下载JDK并安装
[下载地址](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
下载下来后直接安装，默认安装路径为 /Library/Java/JavaVirtualMachines/...
如果安装多个版本，则在该文件夹下面可以看到不同版本的Java
/Library/Java/JavaVirtualMachines/{Version}/Contents/Home目录下的文件作用如下：

```shell
/bin        二进制的命令行工具
/db         一个开源的关系型
/jre        JDK依赖的java运行时
/include    c语言的一些头文件
/man        帮助文档
src.zip     源码
```

在终端使用`java -version`命令测试java命令是否可用，如果不可用表示环境变量没有配置好，需要配置好环境变量，如果可以使用，则不需要进行下面配置环境变量的步骤。（有可能安装的时候自动配置好了，反正我安装完毕之后直接就可以使用，和以前用windows不一样，还要手动配置环境变量）

配置环境变量步骤如下：

```
$ sudo vim /etc/profile
```

在profile文件中输入

```
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_45.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar


export JAVA_HOME
export CLASSPATH
export PATH
```
保存退出，然后使用source命令使得环境生效。

```
source /etc/profile
```
在使用`java -version`尝试一下命令是否可用，可用说明配置成功了。
## 安装Tomcat
[下载地址](http://tomcat.apache.org/)
选择最新版本下载。
解压拷贝到 /Library目录下,并命名为Tomcat，其他目录也可。

启动Tomcat

```
sh /Library/tomcat/bin/startup.sh

#输出
Using CATALINA_BASE:   /Library/apache-tomcat-9.0.0.M3
Using CATALINA_HOME:   /Library/apache-tomcat-9.0.0.M3
Using CATALINA_TMPDIR: /Library/apache-tomcat-9.0.0.M3/temp
Using JRE_HOME:        /Library/Java/JavaVirtualMachines/jdk1.8.0_73.jdk/Contents/Home
Using CLASSPATH:       /Library/apache-tomcat-9.0.0.M3/bin/bootstrap.jar:/Library/apache-tomcat-9.0.0.M3/bin/tomcat-juli.jar
Tomcat started.
```

正常情况下在执行上面这个命令之前，是需要设置一下startup.sh文件执行权限的，不过我在这里没设置竟然也直接启动成功了，查了下权限，下载下来自带有执行权限。如果这一步发现权限不足，则需要配置一下权限，方法如下：

```
#在./tomcat/bin目录下执行

$ chmod +x startup.sh
```
如此再执行就不会有权限问题了，
然后打开浏览器，输入http://localhost:8080，进入tomcat默认页面，说明启动成功了

如果要关闭tomcat服务，直接执行命令

```
sh /Library/tomcat/bin/shutdown.sh 
# 输出
Using CATALINA_BASE:   /Library/apache-tomcat-9.0.0.M3
Using CATALINA_HOME:   /Library/apache-tomcat-9.0.0.M3
Using CATALINA_TMPDIR: /Library/apache-tomcat-9.0.0.M3/temp
Using JRE_HOME:        /Library/Java/JavaVirtualMachines/jdk1.8.0_73.jdk/Contents/Home
Using CLASSPATH:       /Library/apache-tomcat-9.0.0.M3/bin/bootstrap.jar:/Library/apache-tomcat-9.0.0.M3/bin/tomcat-juli.jar
```

再次打开http://localhost:8080，则无法访问了。

## 安装MariaDB
这里使用Homebrew进行安装,如果还未安装Homebrew，可以到[Homebrew官网](http://brew.sh/)下载，根据提示输入命令很容易就下载完成。
然后在命令行中输入

``` shell
brew install mariadb
```


很快就安装完成,完成后启动数据库：

```
mysql.server start
```

如果没有启动数据库直接登录，会出现

```
ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2 "No such file or directory")
```

我们使用`mysql_secure_installation `命令进行初始化，这样数据库会更安全一下

```
$ mysql_secure_installation 

...

# 设置好密码，删除掉test数据库等等操作，按照需求出入y/n
```

到此数据库按照完毕。

## 安装IDEA

这里我们选用IDEA作为开发工具，他是一款强大的开发工具，除了价格太高以外，其他地方都不错。

直接上官网下载并安装。


