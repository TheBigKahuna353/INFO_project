<?php

require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents("php://input"), true);

// Post requests are funny with params, so we need to check if the auth_token is set
// If not, could be stored in a params key
if (!isset($data['auth_token'])) {
    if (!isset($data['params'])) {
        echo json_encode(['error' => 'No Auth Token specified']);
        return;
    }
    $data = $data['params'];
    if (!isset($data['auth_token'])) {
        echo json_encode(['error' => 'No Auth Token specified']);
        return;
    }
}

if (!isset($data['method'])) {
    echo json_encode(['error' => 'No action specified']);
    return;
}

function getData() {
    // Execute select query onto the database
    $pdo = openConnection();
    $query = "SELECT * FROM costs_and_rates";
    try {
        $result = $pdo->query($query);
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }

    return json_encode($result->fetchAll());
}

function writeData($data) {
    // Execute select query onto the database
    $pdo = openConnection();
    $query = "UPDATE costs_and_rates SET ";
    # -----------------------------------------
    $options = ['daily_hire_rate', 'flat_maintenance_rate', 'hourly_relocation_rate', "purchase_cost", "monthly_lease_cost"];
    # -----------------------------------------
    $none = true;
    foreach ($options as $option) {
        if (isset($data[$option])) {
            $query .= $option . " = " . $data[$option] . ", ";
            $none = false;
        }
    }
    if ($none) {
        return json_encode(['error' => 'No data to update']);
    }
    $query = substr($query, 0, -2);

    if (isset($data['category'])) {
        $query .= " WHERE vehicle_category = '" . $data['category'] . "'";
    } else {
        return json_encode(['error' => 'No category specified']);
    }

    try {
        $pdo->query($query);
    } catch (PDOException $e) {
        echo $query;
        fatalError($e->getMessage());
        return;
    }

    return json_encode(['message' => 'Data updated successfully']);
}


switch ($data['method']) {
    case 'getData':
        echo getData();
        break;
    case 'writeData':
        echo writeData($data);
        break;
    default:
        echo json_encode(['error' => 'Invalid method']);
        break;
}

?>