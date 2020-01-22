<?php
/**
 * PHP实现的上传DEMO
 */
error_reporting(E_ALL || ~E_NOTICE);
include_once('./util.php');
include_once('./class.File.php');

@$project_name = $_GET['projectName'];
@$type = $_GET['type']; // 0 截图， 1 项目

$file = new File();

echo $file->upload($type,$project_name);