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

function getAll() {
    $pdo = openConnection();
    $data = [];
    
    $query = "SELECT vehicle_rego AS rego, vehicle_category AS category, distance, origin, destination, start_date, end_date, trip_id
              FROM trip_whole WHERE 1=1"; // Ensure WHERE always exists
    $countQuery = "SELECT COUNT(vehicle_rego) as count FROM trip_whole WHERE 1=1";

    // Filter by categories
    if (isset($_GET['cats']) && is_array($_GET['cats'])) {
        $cats = $_GET['cats'];
        $catsList = implode("', '", array_map('htmlspecialchars', $cats));
        $query .= " AND vehicle_category IN ('$catsList')";
        $countQuery .= " AND vehicle_category IN ('$catsList')";
    }

    // Filter by rego
    if (isset($_GET['rego']) && !empty($_GET['rego'])) {
        $rego = $_GET['rego'] . '%'; // Add % wildcard for LIKE query
        $query .= " AND vehicle_rego LIKE :rego";
        $countQuery .= " AND vehicle_rego LIKE :rego";
    }

    // Pagination and limits
    $startIndex = isset($_GET['startIndex']) ? intval($_GET['startIndex']) : 0;
    $num = isset($_GET['num']) ? intval($_GET['num']) : 50;

    $query .= " LIMIT :num OFFSET :startIndex";

    try {
        // Prepare and execute the main query
        $stmt = $pdo->prepare($query);
        if (isset($rego)) $stmt->bindValue(':rego', $rego, PDO::PARAM_STR);
        $stmt->bindValue(':num', $num, PDO::PARAM_INT);
        $stmt->bindValue(':startIndex', $startIndex, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll();

        // Execute the count query
        $stmtCount = $pdo->prepare($countQuery);
        if (isset($rego)) $stmtCount->bindValue(':rego', $rego, PDO::PARAM_STR);
        $stmtCount->execute();
        $count = $stmtCount->fetch()['count'];
        
        // Output result
        echo json_encode([
            "trips" => $result,
            "count" => $count
        ]);

    } catch (PDOException $e) {
        fatalError($e->getMessage());
        http_response_code(500);
        return;
    }
}


if (isset($_GET['trip_id'])) {
    getSingle();
} else {
    getAll();
}

?>
