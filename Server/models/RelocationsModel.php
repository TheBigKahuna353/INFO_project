<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');


function getallRelocations() {

    // startIndex = 0
    // num = 50

    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT 
                start_date,
                end_date,
                origin,
                destination,
                distance,
                vehicle_rego AS rego
            FROM relocation_whole";
    
    if (isset($_GET['num'])) {
        $num = $_GET['num'];
        $query .= " LIMIT $num";
    } else {
        $query .= " LIMIT 50";
    }
    if (isset($_GET['startIndex'])) {
        $startIndex = $_GET['startIndex'];
        $query .= " OFFSET $startIndex";
    } else {
        $query .= " OFFSET 0";
    }

    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode($result->fetchall());
}

echo getallRelocations();


?>