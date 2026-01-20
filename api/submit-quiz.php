<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Adjust for production
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid JSON']));
}

if (empty($data['email']) || empty($data['phone'])) {
    http_response_code(400);
    exit(json_encode(['error' => 'Email and phone required']));
}

$payload = [
    'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
    'phone' => preg_replace('/[^0-9+\s()-]/', '', $data['phone']),
    'quiz_answers' => $data['quiz_answers'] ?? [],
    'source' => 'corepetitus_quiz'
];

$token = getenv('CRM_API_TOKEN') ?: 'YOUR_TOKEN_HERE';

$ch = curl_init('https://app.corepetitus.lt/api/registration');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $token
    ],
    CURLOPT_TIMEOUT => 30
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    exit(json_encode(['error' => 'Request failed']));
}

http_response_code($httpCode);
echo $response;