<?php
include_once './config.php';

$userName = $_POST['userName'];
$userPwd = $_POST['userPwd'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT * FROM `user` WHERE `name` = '{$userName}' AND `pwd` = '{$userPwd}'";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all($result , MYSQLI_ASSOC);

if(count($arr) == 1){
    echo json_encode(['code'=>1,'msg'=>'登录成功','name' => $arr[0]['name']]);
}else{
    echo json_encode(['code'=>0,'msg'=>'登录失败']);
}


