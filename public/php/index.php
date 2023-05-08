<?php
header("Access-Control-Allow-Origin: *"); //To Allow Access From Other Servers
header("Access-Control-Allow-Methods: POST"); //To Allow POST 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// $pdo = require_once 'connect.php';
// $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Post_object = file_get_contents('php://input');
    $POST_data = json_decode($Post_object, true);
    $api_name = @$POST_data["api_name"];
} else {
    $api_name = @$_GET["api_name"];
    echo "Do Not Allow To Be There <br>";
}

if ($api_name == "CheckCredentials") {
    $Username = htmlspecialchars(@$POST_data["Username"]);
    $Password = htmlspecialchars(@$POST_data["Password"]);
    if ($Username != '' || $Password != '') {
        $Reponse = array(
            "api_respone" => "CheckCredentials",
            "Result" => true,
        );
        echo json_encode($Reponse);
    }
}

if ($api_name == "UpdateAccessToken") {
    $Username = htmlspecialchars(@$POST_data["Username"]);
    $Token = htmlspecialchars(@$POST_data["Token"]);
    if ($Username != '' || $Token != '') {
        $Reponse = array(
            "api_respone" => "UpdateAccessToken",
            "Result" => true,
        );
        echo json_encode($Reponse);
    }
}


if ($api_name == "CheckAccessToken") {
    $Token = htmlspecialchars(@$POST_data["Token"]);
    if ($Token != '') {
        $Reponse = array(
            "api_respone" => "CheckAccessToken",
            "Result" => true,
        );
        echo json_encode($Reponse);
    }
}
