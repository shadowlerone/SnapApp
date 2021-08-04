<?php
    header("Access-Control-Allow-Origin: *");
    
    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        /*Creating variables*/
        $session = $_GET["session"];
        $contributor = $_GET["contributor"];
        $value = $_GET["value"];


        $dbhost = "localhost"; /*most of the time it's localhost*/
        $username = "bendouek_snap";
        $password = "robotinacansnap";
        $dbname = "bendouek_snapcom";

        $mysql = mysqli_connect($dbhost, $username, $password, $dbname); //It connects
        if (!$mysql) {
           die("Connection failed: " . mysqli_connect_error());
        }

        //echo "Connected successfully<br><br>";
        

        $query = "SELECT * FROM `experiment` WHERE 1";
        $result = $mysql->query($query);
        $numRows = $result->num_rows;
        $i = 1;

        echo " <table border='1'><tr><td> Session Number </td><td> Contributor Name </td><td> Value Stored </td></tr>";

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "<tr><td> " . $row["session"]. " </td><td> " . $row["contributor"]. " </td><td> " . $row["value"]. "</td></tr>";
                if($i == $numRows){
                    echo $row["value"];
                }
                $i++;
            }
        } else {
            //echo "0 results";
        }

        echo "</table>";

        mysqli_close($mysql);
    }
?>