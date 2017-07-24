# roit.js-seed文件windows环境配置



### 1.安装node.js
- 官网`http://nodejs.cn/download/`下载安装包，并根据系统类型选择node.js安装包进行安装
- 计算机→属性→高级系统设置→环境变量
- 新建一个用户变量
- 变量名：`NODE_PATH`
- 值：`C:\Program Files\nodejs\node_modules`
- 注意：值为nodejs安装目录

### 2.全局安装cnpm
- `npm install -g cnpm --registry=https://registry.npm.taobao.org`
### 3.安装ruby
- ruby官网`http://www.ruby-lang.org/en/downloads/`
### 4.全局安装gulp
- `npm install -g gulp`

### 5.安装sass依赖包
- `gem install sass`

### 6.安装compass依赖包
- `compass依赖包`

### 7.gulp启动
- 启动服务`gulp`

### 8.为项目安装依赖包
- `npm install`