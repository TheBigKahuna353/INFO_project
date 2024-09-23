<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function getTrips($rego) {
    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                start_date,
                end_date,
                origin,
                destination,
                distance
            FROM trip_whole
            WHERE vehicle_rego = '$rego'";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode($result->fetchall());
}

function getRelocations($rego) {
    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                start_date,
                end_date,
                origin,
                destination,
                distance
            FROM relocation_whole
            WHERE vehicle_rego = '$rego'";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode($result->fetchall());
}

function getMaintenance($rego) {
    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                start_date,
                end_date,
                location,
                mileage
            FROM maintenance_whole
            WHERE vehicle_rego = '$rego'";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode($result->fetchall());
}

function getVehicles()
{
	$data = [];
    if (isset($_GET['rego']) == false || empty($_GET['rego'])) {
        return;
    }
    $rego = $_GET['rego'];
    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                vehicle_category AS category,
                odometer,
                commissioned,
                decommissioned
            FROM vehicle
            WHERE vehicle_rego = '$rego'";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    
    $row = $result->fetch();
    echo '{';
    echo '"rego": "' . $rego . '",';
    echo '"category": "' . htmlspecialchars($row['category']) . '",';
    echo '"odometer": "' . htmlspecialchars($row['odometer']) . '",';
    echo '"commissioned": "' . htmlspecialchars($row['commissioned']) . '",';
    echo '"decommissioned": "' . htmlspecialchars($row['decommissioned']) . '",';
    echo '"trips": ' . getTrips($rego) . ',';
    echo '"relocations": ' . getRelocations($rego) . ',';
    echo '"maintenance": ' . getMaintenance($rego);
    echo '}';
    
}

getVehicles();

?>