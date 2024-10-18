<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');


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
            LEFT JOIN sim_day_date S ON S.sim_day = commissioned
            LEFT JOIN sim_day_date E ON E.sim_day = decommissioned
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
    
    echo json_encode($result->fetch());
    
}

getVehicles();

?>