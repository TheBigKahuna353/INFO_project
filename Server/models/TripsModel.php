<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function getSingle() {
    $pdo = openConnection();
    $rego = $_GET['trip_id'];
    $query = "SELECT 
                vehicle_rego AS rego,
                vehicle_category AS category,
                distance,
                origin,
                destination,
                start_date,
                end_date,
                trip_id
            FROM trip_whole
            WHERE trip_id = $rego";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    echo json_encode($result->fetch());
}

function getAll()
{
	$data = [];

    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                vehicle_rego AS rego,
                vehicle_category AS category,
                distance,
                origin,
                destination,
                start_date,
                end_date,
                trip_id
            FROM trip_whole";
    $countQuery = "SELECT COUNT(vehicle_rego) as count FROM trip_whole";
    if (isset($_GET['cats'])) {
        $cats = $_GET['cats'];
        $query .= " WHERE category IN (";
        $countQuery .= " WHERE ategory IN (";
        $i = 0;
        foreach ($cats as $cat) {
            $query .= "'$cat'";
            $countQuery .= "'$cat'";
            if ($i < count($cats) - 1) {
                $query .= ', ';
                $countQuery .= ', ';
            }
            $i++;
        }
        $query .= ')';
        $countQuery .= ')';
    }
    if (isset($_GET['startDate'])) {
        $startDate = $_GET['startDate'];
        $query .= " WHERE start_date >= $startDate";
        $countQuery .= " WHERE start_date >= $startDate";
    }
    if (isset($_GET['endDate'])) {
        $endDate = $_GET['endDate'];
        $query .= " WHERE odometer <= $endDate";
        $countQuery .= " WHERE odometer <= $endDate";
    }
    if (isset($_GET['rego'])) {
        $rego = $_GET['rego'];
        $query .= " WHERE vehicle_rego LIKE '$rego%'";
        $countQuery .= " WHERE vehicle_rego LIKE '$rego%'";
    }
    if (isset($_GET['num'])) {
        $num = $_GET['num'];
        $query .= " LIMIT $num";
    } else {
        $query .= " LIMIT 50";
    }
    if (isset($_GET['startIndex'])) {
        $startIndex = $_GET['startIndex'];
        $query .= " OFFSET $startIndex";
    }
    try {
        $result = $pdo->query($query);
        $count = $pdo->query($countQuery);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        http_response_code(500);
        echo $query;
        return;
    }
    $i = 0;
    echo '{"trips": ';
    echo json_encode($result->fetchall());
    while ($row = $result->fetch()) {
        $i++;
        $data[] = [
            'rego' => htmlspecialchars($row['rego']),
            'category' => htmlspecialchars($row['category']),
            'distance' => htmlspecialchars($row['distance']),
            'origin' => htmlspecialchars($row['origin']),
            'destination' => htmlspecialchars($row['destination']),
            'start_date' => htmlspecialchars($row['start_date']),
            'end_date' => htmlspecialchars($row['end_date']),
            'trip_id' => htmlspecialchars($row['trip_id'])
        ];
        // echo json_encode($data[0]);
        if ($i < 50) echo ',';
    }
    echo ', ';
    echo '"count": ' . $count->fetch()['count'];
    echo '}';

    
}

if (isset($_GET['trip_id'])) {
    getSingle();
} else {
    getAll();
}

?>