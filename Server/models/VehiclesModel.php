<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function getCount() {
    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                COUNT(vehicle_rego) as count
            FROM vehicle
            LIMIT 50";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }

    $row = $result->fetch();
    return $row['count'];
}

function getVehicles()
{
	$data = [];

    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                vehicle_rego AS rego,
                vehicle_category AS category,
                odometer,
                commissioned,
                decommissioned
            FROM vehicle
            LIMIT 50";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    $i = 0;
    echo '{"vehicles": ';
    echo json_encode($result->fetchall());
    while ($row = $result->fetch()) {
        $i++;
        $data[] = [
            'rego' => htmlspecialchars($row['rego']),
            'category' => htmlspecialchars($row['category']),
            'odometer' => htmlspecialchars($row['odometer']),
            'commisioned' => htmlspecialchars($row['commissioned']),
            'decommisioned' => htmlspecialchars($row['decommissioned']),
        ];
        // echo json_encode($data[0]);
        if ($i < 50) echo ',';
    }
    echo ', ';
    echo '"count": ' . getCount();
    echo '}';

    
}

getVehicles();

?>