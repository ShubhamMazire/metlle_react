<?php

// simple stl file uplaod and return url

$target_dir = "uploads/";
$target_file = $target_dir . time() . "_" . basename($_FILES["fileToUpload"]["name"]);

$uploadOk = 1;
$FileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));



// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {

    echo json_encode(["status" => "error", "path" => $target_file, "error" => "Sorry, your file is too large."]);

    $uploadOk = 0;
}

// Allow certain file formats
// if ($FileType  != "stl") {
//   echo json_encode(["status"=>"error","path"=>$target_file,"error"=>"Sorry, only STL files are allowed."]);
//     $uploadOk = 0;
// }

// Check if $uploadOk is set to 0 by an error

if ($uploadOk == 0) {
    echo json_encode(["status" => "error", "path" => $target_file, "error" => "Sorry, your file was not uploaded."]);

    // if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo json_encode(["status" => "success", "path" => $target_file]);
    } else {
        echo json_encode(["status" => "error", "path" => $target_file,]);
    }
}
