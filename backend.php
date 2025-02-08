<?php
header('Content-Type: application/json');

$dataFile = "data.json";
if (!file_exists($dataFile)) {
    echo json_encode(["error" => "Data file not found"]);
    exit;
}

$data = file_get_contents($dataFile);
if ($data === false) {
    echo json_encode(["error" => "Failed to read data file"]);
    exit;
}

echo $data;
?>