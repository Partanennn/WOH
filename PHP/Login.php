<?php
    $conn = mysql_connect("localhost", "root", "");
    $db = mysql_select_db("harkka", $conn);
    $user = $_POST['tunnus'];
    $password = $_POST['salasana'];
  
    // Aloitetaan sesssio ja tarkistetaan onko kirjauduttu
    session_start();
    if($_SESSION['login'] == true) {
        header('Location: etusivu.html');
        exit;
    } else {
        $_SESSION['login'] == false;
    }
    
    // Tämä if tarkistaa onko requesti post tyyppinen
    if($_SERVER["REQUEST_METHOD"] == "POST") {
    
        $result = mysql_query("SELECT * FROM users WHERE tunnus='$user' AND salasana='$password' ");
        //Tämä muuttuja tarkistaa montako riviä mysql query palauttaa
        $data = mysql_num_rows($result);
        //Jos mysql query palauttaa yhden rivin se tarkoittaa että kirjautuminen on onnistunut
        if($data == 1) {
            $_SESSION['login'] = true;
            echo "Olet kirjautunut";
        } else 
            echo "Väärä tunnus tai salasaana...";
        mysql_close($conn);

    }
?>