# 项目介绍

使用本项目，不需要关注Scratch2.0功能的具体实现，只需要简单的js基础即可调用Scratch的相关功能，助力项目快速开发。


## 使用方法
### 直接使用
demo见编译的bin-debug/scratch2.html文件

Chrome已禁止Flash插件，可以使用其他浏览器或IE、Edge


### 参与本项目
本项目接受PR，如果大佬有更好的实现方法和更好的创意，欢迎提交PR！

同时也欢迎提出Issue，BUG建议均可

## 项目结构

```
├── bin-debug                # 编译后的文件夹
│   ├── internalapi          # 素材库资源
│   ├── scratchr2            # 素材库索引
│   ├── locale               # 语言包    
│   ├── siteapi              # api demo
│   ├── js                   # 用的的js文件
│   │   ├── scratch.js       # scratch初始化
│   │   ├── swfobject.js     # flash和js交互
│   ├── scratch2.html        # scratch页面demo
│   └── scratch2.swf         # scratch本体
├── libs                     # as3库
├── html-template            # html编译模板
├── src
│   ├── assets           # 资源文件
│   ├── blocks           # 积木相关
│   ├── com              # 第三方库
│   ├── extensions       # 拓展管理
│   ├── filters          # 图像处理相关
│   ├── interpreter      # 积木解释器
│   ├── leelib           # flv编码插件
│   ├── logging          # 日志工具类
│   ├── primitives       # 积木基类
│   ├── scratch          # scratch核心
│   ├── sound            # 声音处理
│   ├── soundbank        # 音频资源
│   ├── soundedit        # 声音编辑器
│   ├── svgeditor        # svg编辑器
│   ├── svgutils         # svg工具类
│   ├── ui               # ui实现
│   ├── uiwidgets        # ui组件
│   ├── util             # 工具类
│   ├── CSS.as           # 全局样式
│   ├── Specs.as         # 积木的定义和分类
│   ├── Scratch.as       # Scratch主文件
│   └── scratch2.mxml    # 界面组件布局
├── README.md
├── README-RAW.md        # 官方原版README
└── package.json
└── webpack.consig.js
```



# 二次开发

## 开发环境搭建和编译

https://www.213.name/archives/1033

## 将Scratch打包为Air应用

https://www.213.name/archives/1756

## Web版Scratch Debug

建议使用FireFox浏览器

1. 下载相应浏览器的flash player debugger （NPAPI）

   https://www.adobe.com/support/flashplayer/debug_downloads.html

2. 下载FireFox扩展Flash Debugger

3. 按F12打开开发者工具即可调试

As3错误信息和日志也会在JS控制台输出，严重错误将会弹框提示


## Scratch和JS交互方式

### 前端 > scratch

- 方式一： 创建object标签时将默认参数直接传入。

- 方式二：flash载入后js直接与as3交互，即用js直接调用as3的方法。

As3使用ExternalInterface.addCallback(functionName, closure)来注册一个对js开放的接口，scratch里已经帮我们封装好了一些js接口。可自行仿照添加新的接口。

如：

```as3
addExternalCallback("loadProjectByUrl", loadProjectByUrl);
```


### Scratch > 前端

scratch已提供as调用js的方法

externalCall(functionName:String, returnValueCallback:Function = **null**, ...args)

参数：
| 参数名      | 描述        |
| ----------- | ----------- |
| functionName         | js中的函数名 |
|ReturnValueCallback|执行完后包含返回值的回调|
|Args|传入js的参数|

如：

```as3
externalCall("getProjectData",null,projectName(),zipData); //获取项目文件
```

# Scratch初始化配置

初始化在scratch.js里的flashvars内配置


## 配置示例：
```
// 初始化配置
var flashvars = {
  extensionDevMode: 'true', //启用拓展设备模式
  microworldMode: 'false', //小窗口模式,隐藏菜单栏等
  autostart: 'false', //自动运行项目
  showOnly: 'false', //是否仅保留播放窗口
  urlOverrides: {
    internalAPI: "internalapi/", //素材库
    staticFiles: "scratchr2/static/", //素材库索引
    upload: "project/", //sb2文件加载目录
    uploadAPI: 'siteapi/api_file.php', //文件上传api
    mp4Encoder: "lib/mp4/FW_SWFBridge_ffmpeg.swf", //mp4编码插件
  },
  inIE: (navigator.userAgent.indexOf('MSIE') > -1)
};
```

## 将scratch 嵌入web

推荐使用js动态生成object标签来加载scratch，并将flash的启动参数一并传入，我们已在scratch.js内实现。
swfobject.js可以对flash进行一些操作，如监听flash是否加载完毕

```js
window.SWFready = $.Deferred();
$.when(window.SWFready).done(function() {
   //Scratch加载完毕
});
```


# API参考

通过winodow.scratch对象来调用scratch的API

scratch回调均通过window.scratchCallback对象内的方法，具体请看scratch.js

### 通过URL加载项目

`window.scratch.loadProjectByUrl`

|参数名|描述|
|----|----|
|url|sb2文件地址|
|projectName|项目名称|

### 通过UUID加载项目

`window.scratch.loadProjectById`

| 参数名 | 描述        |
| ------ | ----------- |
| url    | sb2文件地址 |
| uuid   | 项目uuid    |

加载后项目的UUID，需要配置好projectPath参数

### JS触发上传项目

`window.scratch.uploadProject`

由于flash的安全沙箱限制，js触发上传动作必须要由用户确认，所以无法去除是否上传的对话框。

### 获取sb2项目数据

`window.scratch.getProjectData`

返回Base64编码数据

### 获取截图数据

`window.scratch.getScreenshotData`

返回Base64编码数据

### 获取项目名

`window.scratch.getProjectName`

### 设置项目名

`window.scratch.setProjectName`

参数：

| 参数名      | 描述     |
| ----------- | -------- |
| projectName | 项目名称 |


### 获取项目UUID

`window.scratch.getUUID`

UUID新建或从URL加载项目时重新生成



## TODO

- 录像MP4编码、上传
- UI设置
- 菜单栏按钮设置
- ……



# 常见问题

## 跨域问题

Flash不能加载非同源资源，也就是scratch无法加载非同一域名下的项目、素材库、翻译等等。

解决方案是在资源服务器根目录下添加crossdomain.xml文件。

下为允许所有来源的请求配置：

```xml
<?xml version="1.0"?>

<!DOCTYPE cross-domain-policy SYSTEM "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">

<cross-domain-policy>

<site-control permitted-cross-domain-policies="all"/>

<allow-http-request-headers-from domain="*" headers="*" secure="false" />

<allow-access-from domain="*" secure="false" />

</cross-domain-policy>
```