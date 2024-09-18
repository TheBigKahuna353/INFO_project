<?php
require_once 'login.php';

/**
 * Create connection to the database
 *
 * @return PDO (PHP Data Objects) provides access to the database
 */
function openConnection()
{
    try {
        $pdo = new PDO(
            CONNECTION_STRING,
            CONNECTION_USER,
            CONNECTION_PASSWORD,
            CONNECTION_OPTIONS
        );
    } catch (PDOException $e) {
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }

    return $pdo;
}

/**
 * Echos an mysql error.
 *
 * @param string $errorMessage The error message passed.
 */
function fatalError($errorMessage)
{
    echo "<p><strong>Something went wrong: $errorMessage</strong></p>";
}
?>
