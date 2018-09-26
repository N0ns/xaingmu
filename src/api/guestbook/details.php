<?php
include 'connect.php';
    
    $idx = isset($_GET['idx']) ? $_GET['idx'] : null;


    $sql = "select * from goodslist where id='$idx'";

    // echo "$sql";
    // echo "$sql";
    // 执行sql语句
    $result = $conn->query($sql);
    // 从集合中取出所有数据
    $row = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    
    

?>