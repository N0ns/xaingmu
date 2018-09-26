<?php
    include 'connect.php';


    // 接收请求参数
    $sort = isset($_GET['sort']) ? $_GET['sort'] : null;
    $desc = isset($_GET['desc']) ? true : false;
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 8;
    $sql = "select * from goodslist";

    if($sort){
        $sql .= " order by $sort*1";

        // 降序
        if($desc){
            $sql .= " desc";
        }
    }

    // var_dump($conn);
    
    // 读取数据
    // 获取查询结果集（集合）
    $result = $conn->query($sql);

    // 从集合中取出所有数据
    $row = $result->fetch_all(MYSQLI_ASSOC);

   
    //释放查询结果集，避免资源浪费
    // $result->close();
    // 关闭数据库，避免资源浪费
    // $conn->close();
    // var_dump($row);
    // 
   $res = array(
        'total' => count($row),
        'pageNo' => $page*1,
        'qty' => $qty*1,
        'data' => array_slice($row,($page-1)*$qty,$qty)
    ); 
    // var_dump($res);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);




?>