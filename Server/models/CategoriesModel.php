<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');



function getVehicleTypes() {
    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT 
                vehicle_category as category
            FROM costs_and_rates";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    $data = [];
    while ($row = $result->fetch()) {
        array_push($data, $row['category']);
    }
    return json_encode($data);
}

echo getVehicleTypes();

?>