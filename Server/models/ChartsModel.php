<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');


function getQuarterly() {
    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT 
                Period,
                [Hire revenue] as HireRevenue,
                [Vehicle purchasing] as VehiclePurchasing,
                [Maintenance expenses] as MaintenanceExpenses,
                [Relocations expenses] as RelocationExpenses,
                [Upgrade losses] as UpgradeLosses,
                Profit
            FROM quarterly_indicators";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }

    $data = [];
    while ($row = $result->fetch()) {
        $data[] = [
            'period' => htmlspecialchars($row['Period']),
            'hireRevenue' => htmlspecialchars($row['HireRevenue']),
            'vehiclePurchasing' => htmlspecialchars($row['VehiclePurchasing']),
            'maintenanceExpenses' => htmlspecialchars($row['MaintenanceExpenses']),
            'relocationExpenses' => htmlspecialchars($row['RelocationExpenses']),
            'upgradeLosses' => htmlspecialchars($row['UpgradeLosses']),
            'profit' => htmlspecialchars($row['Profit'])
        ];
    }
    return json_encode($data);
}

function getCityTraffic() {
    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT
                A.place,
                A.date,
                num1 + num2 as num
            FROM (SELECT
                    origin as place,
                    start_date as date,
                    count(*) as num1
                FROM trip_whole
                GROUP BY origin, start_date) A
            JOIN (SELECT
                    origin as place,
                    end_date as date,
                    count(*) as num2
                FROM trip_whole
                GROUP BY origin, end_date) B 
            ON A.place = B.place AND A.date = B.date;";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }

    $data = [];
    while ($row = $result->fetch()) {
        $data[] = [
            'place' => htmlspecialchars($row['place']),
            'date' => htmlspecialchars($row['date']),
            'num' => htmlspecialchars($row['num'])
        ];
    }
    return json_encode($data);
}

function getCityNames() {
    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT DISTINCT origin FROM trip_whole";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }

    $data = [];
    while ($row = $result->fetch()) {
        $data[] = [
            'place' => htmlspecialchars($row['origin'])
        ];
    }
    return json_encode($data);
}

function lifeTimeDuration() {
    $pdo = openConnection();
    $query = "SELECT * FROM lifetime";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }

    return json_encode($result->fetchAll());

}

echo '{"quarterly": ' . getQuarterly() . ', "cityTraffic": ' . getCityTraffic() . ', "cityNames": ' . getCityNames();
echo ', "lifeTimeDuration": ' . lifeTimeDuration() . '}';
?>