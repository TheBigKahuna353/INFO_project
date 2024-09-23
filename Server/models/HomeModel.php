<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');


function getVehicleTypes() {
    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT 
                DISTINCT vehicle_category as category
            FROM vehicle";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }

    $data = [];
    while ($row = $result->fetch()) {
        $data[] = [
            'category' => htmlspecialchars($row['category']),
            'price' => 0
        ];
    }
    return $data;
}

function getAllItems()
{
	$data = [];

    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT * FROM [simulation_summary]";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        header('HTTP/1.0 500 Server Error');
        echo 'Database Error';
        echo $query;
        return;
    }

    $result = $result->fetch();

    $data = [
        'tripsCompleted' => htmlspecialchars($result['Trips Completed']),
        'tripsUpgraded' => htmlspecialchars($result['Trips Upgraded']),
        'refusedBookings' => htmlspecialchars($result['Refused Bookings']),
        'refusedWalkins' => htmlspecialchars($result['Refused Walk-ins']),
        'vehiclesRelocated' => htmlspecialchars($result['Vehicles Relocated']),
        'vehiclesServiced' => htmlspecialchars($result['Vehicles Serviced']),
        'vehicleCategories' => getVehicleTypes()
    ];

    echo json_encode($data);
    
}

getAllItems();

?>