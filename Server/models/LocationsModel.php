<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function getLocations() {
    $query = "SELECT * FROM locations";
    $pdo = openConnection();
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    $data =[];
    while ($row = $result->fetch()) {
        array_push($data, $row['origin']);
    }
    return $data;
}

$locations = getLocations();
echo json_encode($locations);
?>