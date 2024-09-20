<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

/**
 * Queries the database for all shopping list items.
 *
 * For each result returned from the query create a new Item and add to an array of Items.
 * Order the results returned by name.
 *
 * @return array list of Items
 */
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
        return;
    }

    $result = $result->fetch();

    $data = [
        'tripsCompleted' => htmlspecialchars($result['Trips Completed']),
        'tripsUpgraded' => htmlspecialchars($result['Trips Upgraded']),
        'refusedBookings' => htmlspecialchars($result['Refused Bookings']),
        'refusedWalkins' => htmlspecialchars($result['Refused Walk-ins']),
        'vehiclesRelocated' => htmlspecialchars($result['Vehicles Relocated']),
        'vehiclesServiced' => htmlspecialchars($result['Vehicles Serviced'])
    ];

    echo json_encode($data);
    
}

getAllItems();

?>