<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$data =  ["message" => "Hello World!"];

echo json_encode($data);
?>
