<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: image/png');

if (!isset($_GET['type'])) {
    header('HTTP/1.0 400 Bad Request');
    header('Content-Type: text/plain');
    echo 'ERROR: Missing Type';
    return;
}
$type = $_GET['type'];

readfile('../images/' . $type . '.png');

?>
