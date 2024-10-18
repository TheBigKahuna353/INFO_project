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
                S.date AS commissioned,
                E.date AS decommissioned
            FROM vehicle
            LEFT JOIN sim_day_date S ON S.sim_day = commissioned
            LEFT JOIN sim_day_date E ON E.sim_day = decommissioned
            WHERE";
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
    }
    try {
        $result = $pdo->query($query);
        $count = $pdo->query($countQuery);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        http_response_code(500);
        echo $countQuery;
        return;
    }
    $i = 0;
    echo '{"vehicles": ';
    echo json_encode($result->fetchall());
    echo ', ';
    echo '"count": ' . $count->fetch()['count'];
    echo '}';

    
}

getVehicles();

?>