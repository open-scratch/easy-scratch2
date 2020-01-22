<?php

class File
{
    /**
     * 上传文件
     * @param  [type]  $type         [文件类型  0：作品封面 1：项目文件 2：项目录像]
     * @param  [type]  $project_name [文件名]
     * @return [type]                [json result]
     */
    public function upload($type,$project_name){
        try{
            $uuid = $this->save($type);
            if (!$uuid){
                return '{"success":false",message":"保存失败,文件写入失败"}';
            }else{
                return '{"success":true",message":"上传成功","uuid":"'.$uuid.'"}';
            }
        }catch (Exception $e) {
            return '{"success":false",message":"保存失败,'.$e->getMessage().'"}';
        }
    }

    /**
     * 保存文件
     * @param  [type] $type [文件类型  0：作品封面 1：项目文件 2：项目录像]
     * @return [type]       [文件名]
     */
    private function save($type){
        // create floder
        if (!file_exists("../project")) {
            mkdir ("../project");
        }
        $filename = $_FILES['filedata']['name'];
        switch ($type) {
            case "0":
                $path = "../project/".$filename.".jpg";
                break;
            case "1":
                $path = "../project/".$filename.".sb2";
                break;
            case "2":
                $path = "../project/".$filename.".mp4";
                break;
            default:
                $path = "../project/".$filename;
        }
        if (move_uploaded_file($_FILES['filedata']['tmp_name'], $path)) {
            return $filename;
        } else {
            return false;
        }
    }
}