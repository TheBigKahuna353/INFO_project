<?php
require_once '../db/database.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

function create_auth_token($user_id) {
    $token = bin2hex(random_bytes(64));
    $pdo = openConnection();
    $query = "UPDATE user SET token = :token WHERE user_id = :user_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':token', $token);
    try {
        $stmt->execute();
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return $token;
}

function login($email, $password) {
    $password = password_hash($password, PASSWORD_DEFAULT);
    $pdo = openConnection();
    $query = "SELECT user_id FROM user WHERE email = :email AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $password);
    try {
        $stmt->execute();
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    $result = $stmt->fetch();
    if ($result) {
        return json_encode(['token' => create_auth_token($result['user_id'])]);
    } else {
        return json_encode(['error' => 'Invalid username or password']);
    }
}

function register($first_name, $last_name, $email, $password) {
    $password = password_hash($password, PASSWORD_DEFAULT);
    $pdo = openConnection();
    $query = "INSERT INTO user (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    try {
        $stmt->execute();
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        echo $query;
        return;
    }
    $user_id = $pdo->lastInsertId();
    return json_encode(['user_id' => $user_id]);

}

# Function to set a new password
# for marking purposes
function set_password($email, $password) {
    $password = password_hash($password, PASSWORD_DEFAULT);
    $pdo = openConnection();
    $query = "UPDATE user SET password = :password WHERE email = :email";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    try {
        $stmt->execute();
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode(['message' => 'Password updated successfully']);
}

function logout($auth_token) {
    $pdo = openConnection();
    $query = "UPDATE user SET token = NULL WHERE token = :auth";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':auth', $auth_token);
    try {
        $stmt->execute();
    } catch (PDOException $e) {
        fatalError($e->getMessage());
        return;
    }
    return json_encode(['message' => 'User logged out successfully']);
}
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['method'])) {
    echo json_encode(['error' => 'No action specified']);
    return;
}
if ($data['method'] === 'login') {
    echo login($data['email'], $data['password']);
} else if ($data['method'] === 'register') {
    echo register($data['first_name'], $data['last_name'], $data['email'], $data['password']);
} else if ($data['method'] === 'logout') {
    echo logout($data['auth_token']);
} else if ($data['method'] === 'set_password') {
    echo set_password($data['email'], $data['password']);
} else {
    echo json_encode(['error' => 'Invalid action']);
}

?>