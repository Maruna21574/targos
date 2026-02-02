<?php
// mail.php – jednoduchý PHP handler pre odosielanie e-mailov z formulára
// Nahraj tento súbor na Websupport do koreňa webu (napr. www.targos.sk/mail.php)

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://www.targos.sk'); // uprav podľa domény
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Získaj dáta z POST
$data = json_decode(file_get_contents('php://input'), true);
$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$interest = trim($data['interest'] ?? '');
$message = trim($data['message'] ?? '');

if (!$name || !$email || !$interest) {
    http_response_code(400);
    echo json_encode(['error' => 'Chýbajú povinné údaje.']);
    exit();
}


$year = date('Y');
$replace = [
    '{{name}}' => $name,
    '{{email}}' => $email,
    '{{phone}}' => $phone,
    '{{interest}}' => $interest,
    '{{message}}' => $message,
    '{{year}}' => $year
];

// Admin šablóna (HTML alebo TXT)
if (file_exists('admin-notification.html')) {
    $adminTpl = file_get_contents('admin-notification.html');
    $adminBody = str_replace(array_keys($replace), array_values($replace), $adminTpl);
    $adminHeaders = "From: TARGOŠ <{$from}>\r\nReply-To: {$email}\r\nContent-Type: text/html; charset=UTF-8";
} else if (file_exists('admin-notification.txt')) {
    $adminTpl = file_get_contents('admin-notification.txt');
    $adminBody = str_replace(array_keys($replace), array_values($replace), $adminTpl);
    $adminHeaders = "From: TARGOŠ <{$from}>\r\nReply-To: {$email}\r\nContent-Type: text/plain; charset=UTF-8";
} else {
    $adminBody = "Nový dopyt:\nMeno: $name\nE-mail: $email\nTelefón: $phone\nTyp projektu: $interest\nSpráva: $message";
    $adminHeaders = "From: TARGOŠ <{$from}>\r\nReply-To: {$email}\r\nContent-Type: text/plain; charset=UTF-8";
}

// Klient šablóna (HTML alebo TXT)
if (file_exists('client-confirmation.html')) {
    $clientTpl = file_get_contents('client-confirmation.html');
    $clientBody = str_replace(array_keys($replace), array_values($replace), $clientTpl);
    $clientHeaders = "From: TARGOŠ <{$from}>\r\nReply-To: {$adminMail}\r\nContent-Type: text/html; charset=UTF-8";
} else if (file_exists('client-confirmation.txt')) {
    $clientTpl = file_get_contents('client-confirmation.txt');
    $clientBody = str_replace(array_keys($replace), array_values($replace), $clientTpl);
    $clientHeaders = "From: TARGOŠ <{$from}>\r\nReply-To: {$adminMail}\r\nContent-Type: text/plain; charset=UTF-8";
} else {
    $clientBody = "Ďakujeme za váš dopyt, $name!\nVaša požiadavka bola prijatá.\n\nKópia vašej správy:\n$message";
    $clientHeaders = "From: TARGOŠ <{$from}>\r\nReply-To: {$adminMail}\r\nContent-Type: text/plain; charset=UTF-8";
}


$adminMail = 'info@targos.sk'; // uprav na svoj e-mail
$from = "info@targos.sk";

// Pošli adminovi
mail($adminMail, "Nový dopyt z webu: $interest", $adminBody, $adminHeaders);
// Pošli klientovi
mail($email, "Potvrdenie prijatia dopytu | TARGOŠ", $clientBody, $clientHeaders);

echo json_encode(['success' => true]);
