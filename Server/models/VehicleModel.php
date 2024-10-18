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
        header('HTTP/1.0 500 Server Error');
        echo 'Database Error';
        echo $query;
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
                S.date AS commissioned,
                E.date AS decommissioned
            FROM vehicle
            JOIN sim_day_date S ON S.sim_day = commissioned
            JOIN sim_day_date E ON E.sim_day = decommissioned
            WHERE vehicle_rego = '$rego'";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        header('HTTP/1.0 500 Server Error');
        echo 'Database Error';
        echo $query;
        return;
    }
    
    $row = $result->fetch();
    echo '{';
    echo '"rego": "' . $rego . '",';
    echo '"category": "' . htmlspecialchars($row['category']) . '",';
    echo '"odometer": "' . htmlspecialchars($row['odometer']) . '",';
    echo '"commissioned": "' . htmlspecialchars($row['commissioned']) . '",';
    echo '"decommissioned": "' . htmlspecialchars($row['decommissioned']) . '"';
    echo '}';
    
}

getVehicles();

?>