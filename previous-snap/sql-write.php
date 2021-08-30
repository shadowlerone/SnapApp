<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Authorization, Content-Type");
    header('content-type: application/json; charset=utf-8');
    
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        /*Creating variables*/
        $json = file_get_contents('php://input');
        $obj = json_decode($json);
        $session = $obj->{'session'};
        $contributor = $obj->{'contributor'};
        $value = $obj->{'value'};


        $dbhost = "localhost"; /*most of the time it's localhost*/
        $username = "bendouek_snap";
        $password = "robotinacansnap";
        $dbname = "bendouek_snapcom";

        $mysql = mysqli_connect($dbhost, $username, $password, $dbname); //It connects
        if (!$mysql) {
           die("Connection failed: " . mysqli_connect_error());
        }
        echo "Connected successfully";

        $query = "INSERT INTO experiment (session,contributor,value) VALUES ('".$session."', '".$contributor."', '".$value."')";

        if (mysqli_query($mysql, $query)) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $query . "<br>" . mysqli_error($mysql);
        }

        mysqli_close($mysql);
    }
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <form method="post">
        <input name="session" type="text"/>
        <input name="contributor" type="text"/>
        <input name="value" type="text"/>
        <input type="submit" value="Submit">
    </form>
</body>