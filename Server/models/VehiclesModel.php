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
            FROM vehicle";
    $countQuery = "SELECT COUNT(vehicle_rego) as count FROM vehicle";
    if (isset($_GET['cats'])) {
        $cats = $_GET['cats'];
        $query .= " WHERE vehicle_category IN (";
        $countQuery .= " WHERE vehicle_category IN (";
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
    if (isset($_GET['minOdo'])) {
        $minOdo = $_GET['minOdo'];
        $query .= " WHERE odometer >= $minOdo";
        $countQuery .= " WHERE odometer >= $minOdo";
    }
    if (isset($_GET['maxOdo'])) {
        $maxOdo = $_GET['maxOdo'];
        $query .= " WHERE odometer <= $maxOdo";
        $countQuery .= " WHERE odometer <= $maxOdo";
    }
    if (isset($_GET['rego'])) {
        $rego = $_GET['rego'];
        $query .= " WHERE vehicle_rego = '$rego'";
        $countQuery .= " WHERE vehicle_rego = '$rego'";
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