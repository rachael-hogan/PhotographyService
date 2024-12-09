<?php

namespace Rachaelhogan\PhotographyService\Backend;
require __DIR__ . '/../vendor/autoload.php';

// Set the CORS headers to allow requests from your React app
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
// Set the content type to JSON for the API responses
header('Content-Type: application/json');
// Get the request URI and split it into parts
$requestUri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

// Instantiate the Photographers class
$photographers = new Photographers();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Endpoint: GET /api/photographers
    if (count($requestUri) === 2 && $requestUri[0] === 'api' && $requestUri[1] === 'photographers') {
        echo json_encode($photographers->getPhotographers());
        exit;
    }

    // Endpoint: GET /api/photographers/{photographerID}
    if (count($requestUri) === 3 && $requestUri[0] === 'api' && $requestUri[1] === 'photographers' && is_numeric($requestUri[2])) {
        echo json_encode($photographers->getPhotographersById($requestUri[2]));
        exit;
    }

    // Endpoint: GET /api/photographers/event/{eventType}
    if (count($requestUri) === 4 && $requestUri[0] === 'api' && $requestUri[1] === 'photographers' && $requestUri[2] === 'event') {
        echo json_encode($photographers->getPhotographersByEventType($requestUri[3]));
        exit;
    }
}

// If no valid endpoint was hit, return a 404 error
http_response_code(404);
echo json_encode(['error' => 'Endpoint not found']);
