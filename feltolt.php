<?php

require_once './mySqlDB.php';


$id = 0;
$tev = $_POST['tev'];
$datum = $_POST['datum'];
$ido = $_POST['ido'];

$mySql = new MySqlDB();

$tablaNeve = "naptar";
$oszlopok = "(id, tevekenyseg, datum, ido)";
$ertekek = "$id, \"$tev\", '$datum', '$ido'";
$eredmeny = $mySql->ujRekord($tablaNeve, $oszlopok, $ertekek);

if ($eredmeny) {
    json_encode($eredmeny);
} else {
    echo "Hiba az adatok feltoltesekor!";
}
