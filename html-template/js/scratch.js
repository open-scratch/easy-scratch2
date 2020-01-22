var Scratch = Scratch || {};
Scratch.INIT_DATA = Scratch.INIT_DATA || {};

window.SWFready = $.Deferred();
function JSeditorReady() {
  try {
    SWFready.resolve();
    return true;
  } catch ( error ) {
    console.error(error.message, "\n", error.stack);
    throw error;
  }
}

// 初始化配置
var flashvars = {
  extensionDevMode: 'true', //启用拓展设备模式
  microworldMode: 'false', //小窗口模式,隐藏菜单栏等
  autostart: 'false', //自动运行项目
  showOnly: 'false', //是否仅保留播放窗口
  urlOverrides: {
    // Scratch素材库采集和处理工具 https://github.com/open-scratch/scratch-asset-utils
    assetHost: window.location.protocol + '//' + window.location.host + '/', //素材库服务器
    internalAPI: "internalapi/", //素材库 
    staticFiles: "scratchr2/static/", //素材库索引
    projectPath: "project/", //sb2文件加载目录
    uploadAPI: 'siteapi/api_file.php', //文件上传api
    mp4Encoder: "lib/mp4/FW_SWFBridge_ffmpeg.swf", //mp4编码插件
  },
  inIE: (navigator.userAgent.indexOf('MSIE') > -1)
};

$.each(flashvars, function(prop, val) {
  if ($.isPlainObject(val)) {
    flashvars[prop] = encodeURIComponent(JSON.stringify(val));
  }
});
var params = {
  allowscriptaccess: 'always',
  allowfullscreen: 'true',
  wmode: 'direct',
  menu: 'false',
};
for (var i in flashvars) {
  if (typeof params.flashvars !== 'undefined') {
    params.flashvars += '&' + i + '=' + flashvars[i];
  } else {
    params.flashvars = i + '=' + flashvars[i];
  }
}
var swfFile = 'Scratch.swf';
var swfAtt = {
  data: swfFile,
  width: window.innerWidth,
  height: window.innerHeight,
// style:"visibility: visible;"
};

swfobject.addDomLoadEvent(function() {
  var swf = swfobject.createSWF(swfAtt, params, "scratch");
});

 //Scratch回调
window.scratchCallback = {}
window.scratchCallback.receiveProjectData = function(projectName, data){
  console.log(projectName);
  console.log(data.length);

}

window.scratchCallback.receiveScreenshotData = function(projectName, data){
  console.log(projectName);
  console.log(data.length);

}

window.scratchCallback.fileUploading = function(type) {
    console.log("正在上传……")
}

window.scratchCallback.getProjectData = function(projectName, projectData){
  console.log(projectName)
  console.log(projectData);
}

//项目上传成功回调
window.scratchCallback.projectUploaded = function(){
  alert("作品上传成功")
}
//截图上传成功回调
window.scratchCallback.screenshotUploaded = function(){
  console.log("截图上传成功")
}
//录像上传成功回调
window.scratchCallback.videoUploaded = function(){
  alert("录像上传成功")
}

window.onbeforeunload = function(event) {
  return '真的要关闭嘛？';
};

//JS抛异常
function JSthrowError(e) {
  if (window.onerror) {
    window.onerror(e, 'swf', 0);
  } else {
    console.error(e);
  }
}