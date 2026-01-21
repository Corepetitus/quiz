<?php

session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://quiz.corepetitus.lt');
header('Access-Control-Allow-Credentials: true');

if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

echo json_encode(['csrf_token' => $_SESSION['csrf_token']]);
