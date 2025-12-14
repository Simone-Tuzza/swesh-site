<?php
// Per debug: mentre testi puoi mettere 1, poi meglio 0
error_reporting(E_ALL);
ini_set('display_errors', 0);

ob_start(); // evita problemi con gli header

// === CONFIG DB PER INFINITYFREE ===
$DB_HOST = "sql201.infinityfree.com";
$DB_NAME = "if0_40354267_newsletter";
$DB_USER = "if0_40354267";
$DB_PASS = "aTATvT42x9qkb"; // <-- SOSTITUISCI con la password MySQL

// Connessione (se fallisce, non blocchiamo il redirect)
$mysqli = @new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

// Gestione POST dal form
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['email'])) {
    $email = trim((string)$_POST['email']);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        if ($mysqli && !$mysqli->connect_errno) {
            // Tabella: subscribers (email unica)
            if ($stmt = $mysqli->prepare("INSERT IGNORE INTO subscribers (email) VALUES (?)")) {
                $stmt->bind_param("s", $email);
                @$stmt->execute();
                $stmt->close();
            }
        } else {
            // Se vuoi puoi loggare l'errore DB:
            // file_put_contents(__DIR__.'/db_error.log', $mysqli->connect_error.PHP_EOL, FILE_APPEND);
        }
    }
}

// Redirect SEMPRE alla pagina di grazie ONLINE
header("Location: https://swesh.free.nf/thankyou.html", true, 303); // 303 = redirect dopo POST
header("Connection: close");
exit;

