<?php

//header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('status' => false));
    exit;
}

$path = 'uploads/';

if (isset($_FILES['file'])) {
    $originalName = $_FILES['file']['name'];
    $ext = '.'.pathinfo($originalName, PATHINFO_EXTENSION);
    $generatedName = md5($_FILES['file']['tmp_name']).$ext;
    $filePath = $path.$generatedName;

    if (!is_writable($path)) {
        echo json_encode(array(
            'status' => false,
            'msg'    => 'Destination directory not writable.'
        ));
        exit;
    }

    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
        echo json_encode(array(
            'status'        => true,
            'originalName'  => $originalName,
            'generatedName' => $generatedName
        ));
    }
}
else {
    echo json_encode(
        array('status' => false, 'msg' => 'No file uploaded.')
    );
    exit;
}