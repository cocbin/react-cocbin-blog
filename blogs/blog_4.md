# Mac 开发环境配置
## Finder
### 在侧边栏显示`Home`目录
新买的mac侧边栏是没有`Home`的，所以直接用finder进入`Home`比较麻烦，可以在偏好设置里面打开。

    1. 在finder窗口键入`CMD+,`进入finder的偏好设置
    2. 进入侧边栏设置，打开房子图标+用户名的选项
    3. 这时回到侧边栏就可以看到`Home`了

### 显示完整路径名
mac默认finder的标题是不带完整路径名称的，开启完整路径操作如下：

    1. 打开终端
    2. 键入如下命令

```
defaults write com.apple.finder _FXShowPosixPathInTitle -bool TRUE;killall Finder
```
如果需要恢复到默认状态，则键入如下命令：

```
defaults delete com.apple.finder _FXShowPosixPathInTitle;killall Finder
```
### 显示文件后缀名

1. `CMD+,`进入偏好设置
2. 高级->勾选显示所有文件拓展名

### 快速进入当前路径终端

1. 下载Go2Shell
2. 按住option将Go2Shell拉到Finder工具栏上面
3. 在当前路径点击Go2Shell图标快速进入终端


## NodeJS
### 安装Homebrew 
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**安装Homebrew时提示**

```
You have not agreed to the Xcode license.
Before running the installer again please agree to the license by opening
Xcode.app or running:
    sudo xcodebuild -license
```
由于新买的mac，软件都是刚装的，打开以下xcode，同意一下license之后就可以继续了
### 安装NVM
```
brew install nvm
```

安装完毕，提示

```
Please note that upstream has asked us to make explicit managing
nvm via Homebrew is unsupported by them and you should check any
problems against the standard nvm install method prior to reporting.

You should create NVM's working directory if it doesn't exist:

  mkdir ~/.nvm

Add the following to ~/.bash_profile or your desired shell
configuration file:

  export NVM_DIR=~/.nvm
  . $(brew --prefix nvm)/nvm.sh

You can set $NVM_DIR to any location, but leaving it unchanged from
/usr/local/Cellar/nvm/0.31.0 will destroy any nvm-installed Node installations
upon upgrade/reinstall.

Type `nvm help` for further information.

```

根据提示，在用户目录创建.nvm文件夹

```
mkdir ~/.nvm
```

然后把 nvm-exec 文件拷贝到你刚才新建的 .nvm 目录下

```
cp $(brew --prefix nvm)/nvm-exec ~/.nvm/
```

然后编辑 bash 配置文件 $HOME/.bashrc 

```
vim ~/.bashrc
```

输入

```
# For NVM
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```
使shell 配置及时生效

```
source ~/.bashrc
```
### 安装NodeJS
查看可以安装的版本

```
nvm ls-remote
```

安装NodeJS

```
nvm install <version>
```

## ReactNative 环境配置
### 按照上述步骤配置好NodeJS
### 安装watchman

```
brew install watchman
```

### 安装React-Native
```
npm install -g react-native-cli
```

新建应用

```
react-native init AwesomeProject
```

## Android环境搭建
### 安装JVM
[JVM下载地址](http://java.com/zh_CN/download/mac_download.jsp)



