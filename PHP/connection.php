<!--
    This file connects to database and have function
-->
<?php
    session_start();

    Class database {
        var $server = "localhost";
        var $user = "root";
        var $password = "";
        var $db = "harkka";
        var $conn;

        function getConnstring() {
            $con = mysqli_connect($this->server, $this->user, $this->password, $this->dbname) or die("Yhdistäminen epäonnistui: ".mysqli_connect_error());
            
            if(mysqli_connect_error()) {
                printf("Yhdostys ei onnistunut: %s", mysqli_connect_error());
                exit();
            } else {
                $this->conn = $con;
            }
            return $this->conn;
        }

    }
?>