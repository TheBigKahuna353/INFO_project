<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

function getVehicles()
{
	$data = [];

    // startIndex = 0
    // num = 50
    // cats = []
    // minOdo = 0
    // maxOdo = 1000000
    // rego = ''

    // Execute select query onto the database
    $pdo = openConnection();
	$query = "SELECT 
                vehicle_rego AS rego,
                vehicle_category AS category,
                odometer,
                commissioned,
                decommissioned
            FROM vehicle WHERE";
    $countQuery = "SELECT COUNT(vehicle_rego) as count FROM vehicle WHERE";
    if (isset($_GET['cats'])) {
        $cats = $_GET['cats'];
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
    if (isset($_GET['minOdo'])) {
        $minOdo = $_GET['minOdo'];
        $query .= " odometer >= $minOdo AND";
        $countQuery .= " odometer >= $minOdo AND";
    }
    if (isset($_GET['maxOdo'])) {
        $maxOdo = $_GET['maxOdo'];
        $query .= " odometer <= $maxOdo AND";
        $countQuery .= " odometer <= $maxOdo AND";
    }
    if (isset($_GET['MinLifetime'])) {
        $lifetime = $_GET['MinLifetime'];
        $query .= " (decommissioned - commissioned) >= $lifetime AND";
        $countQuery .= " (decommissioned - commissioned) >= $lifetime AND";
    }
    if (isset($_GET['MaxLifetime'])) {
        $lifetime = $_GET['MaxLifetime'];
        $query .= " (decommissioned - commissioned) <= $lifetime AND";
        $countQuery .= " (decommissioned - commissioned) <= $lifetime AND";
    }
    if (isset($_GET['rego'])) {
        $rego = $_GET['rego'];
        $query .= " vehicle_rego LIKE '$rego%'";
        $countQuery .= " vehicle_rego LIKE '$rego%'";
    }
    if ($query[strlen($query) - 1] == 'D' && $query[strlen($query) - 2] == 'N' && $query[strlen($query) - 3] == 'A') {
        $query = substr($query, 0, strlen($query) - 4);
        $countQuery = substr($countQuery, 0, strlen($countQuery) - 4);
    }
    if ($query[strlen($query) - 1] == 'E' && $query[strlen($query) - 2] == 'R' && $query[strlen($query) - 3] == 'E') {
        $query = substr($query, 0, strlen($query) - 6);
        $countQuery = substr($countQuery, 0, strlen($countQuery) - 6);
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
    echo '"count": ' . $count->fetch()['count'];
    echo '}';

    
}

getVehicles();

?>