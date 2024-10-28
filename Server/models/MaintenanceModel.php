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
                location,
                mileage,
                vehicle_rego AS rego,
                maintenance_id AS id
            FROM maintenance_whole
            WHERE maintenance_id = $id";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode($result->fetch());
}

function getallMain() {

    // startIndex = 0
    // num = 50
    // 

    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT 
                start_date,
                end_date,
                location,
                mileage,
                vehicle_category AS category,
                vehicle_rego AS rego,
                maintenance_id AS id
            FROM maintenance_whole WHERE ";
    $countQuery = "SELECT COUNT(vehicle_rego) as count FROM maintenance_whole WHERE ";
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
    if (isset($_GET['location'])) {
        $location = $_GET['location'];
        $query .= " location = '$location' AND";
        $countQuery .= " location = '$location' AND";
    }
    if (isset($_GET['mileage'])) {
        $mileage = $_GET['mileage'];
        $query .= " mileage = $mileage AND";
        $countQuery .= " mileage = $mileage AND";
    }
    if (isset($_GET['rego'])) {
        $rego = $_GET['rego'];
        $query .= " vehicle_rego = '$rego' AND";
        $countQuery .= " vehicle_rego = '$rego' AND";
    }
    if (isset($_GET['category'])) {
        $category = $_GET['category'];
        $query .= " vehicle_category = '$category' AND";
        $countQuery .= " vehicle_category = '$category' AND";
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
        echo $query;
        fatalError($e->getMessage());
        return;
    }
    $mains = json_encode($result->fetchAll());
    $count = $count->fetch()['count'];
    return '{"count":' . $count . ',"maintenances":' . $mains . '}';
}

if (isset($_GET['id'])) {
    echo getSingle();
} else {
    echo getallMain();
}

?>