<?php

include_once './mySqlDB.php';

$mySql = new MySqlDB();

$feladatok = array();

$tablaNeve = "naptar";

$eredmeny = $mySql->lekerdez($tablaNeve);

if($eredmeny->num_rows > 0){
    while($sor = $eredmeny->fetch_assoc()){
        $feladatok[] = $sor;
    }
    echo json_encode($feladatok);
} else{
    echo "Nincsenek adatok!";
}

