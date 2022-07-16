<?php

include_once './config.php';

$id = $_GET['id'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT * FROM `user` WHERE  `id` = {$id}";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all( $result , MYSQLI_ASSOC);

//  返回查询结果
echo json_encode( $arr[0] );
