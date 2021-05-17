<?php

include_once './mySqlDB.php';
$mySql = new MySqlDB();
$id = $_GET['id'];

$tablaNeve = "naptar";
$where = "datum = '2021-05-$id'";

$eredmeny = $mySql->lekerdez($tablaNeve, $where);

if ($eredmeny->num_rows > 0) {
     while($sor = $eredmeny->fetch_assoc()){
        $tevekenyseg[] = $sor;
    }
    echo json_encode($tevekenyseg);
} else{
    echo "Nincsenek adatok!";
}