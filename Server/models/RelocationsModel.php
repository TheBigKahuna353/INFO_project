<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');


function getSingle() {
    $pdo = openConnection();
    $id = $_GET['id'];
    $query = "SELECT 
                start_date,
                end_date,
                origin,
                destination,
                distance,
                vehicle_rego AS rego,
                relocation_id AS id
            FROM relocation_whole
            WHERE relocation_id = $id";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode($result->fetch());
}

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
                vehicle_rego AS rego,
                vehicle_category AS category, 
                relocation_id AS id
            FROM relocation_whole WHERE ";
    $countQuery = "SELECT COUNT(vehicle_rego) as count FROM relocation_whole WHERE ";
    if (isset($_GET['start_date'])) {
        $start_date = $_GET['start_date'];
        $query .= " start_date >= '$start_date' AND";
        $countQuery .= " start_date >= '$start_date' AND";
    }
    if (isset($_GET['end_date'])) {
        $end_date = $_GET['end_date'];
        $query .= " end_date <= '$end_date' AND";
        $countQuery .= " end_date <= '$end_date' AND";
    }
    if (isset($_GET['origin'])) {
        $origin = $_GET['origin'];
        $query .= " origin = '$origin' AND";
        $countQuery .= " origin = '$origin' AND";
    }
    if (isset($_GET['destination'])) {
        $destination = $_GET['destination'];
        $query .= " destination = '$destination' AND";
        $countQuery .= " destination = '$destination' AND";
    }
    if (isset($_GET['distance'])) {
        $distance = $_GET['distance'];
        $query .= " distance = $distance AND";
        $countQuery .= " distance = $distance AND";
    }
    if (isset($_GET['rego'])) {
        $rego = $_GET['rego'];
        $query .= " vehicle_rego LIKE '$rego%' AND";
        $countQuery .= " vehicle_rego LIKE '$rego%' AND";
    }
    if (isset($_GET['category'])) {
        $cats = $_GET['category'];
        $query .= " vehicle_category IN (";
        $countQuery .= " vehicle_category IN (";
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
        $query .= ') AND';
        $countQuery .= ') AND';
    }
    $query = rtrim($query, "AND ");
    $query = rtrim($query, "WHERE ");
    $countQuery = rtrim($countQuery, "AND ");
    $countQuery = rtrim($countQuery, "WHERE ");
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
        $count = $pdo->query($countQuery);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    $relocs = json_encode($result->fetchall());
    $count = $count->fetch()['count'];
    return '{"relocations": ' . $relocs . ', "count": ' . $count . '}';
}

if (isset($_GET['id'])) {
    echo getSingle();
} else {
    echo getallRelocations();
}

?>
