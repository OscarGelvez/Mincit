<?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));


$nombreCombo=$data->nombre;
$comboPadre=$data->padre;



$query= "INSERT INTO `valoresCombosFiltros`(nombre_opc,combo_padre) VALUES('$nombreCombo','$comboPadre')";

if(mysql_query($query)){
	echo (1); // Registro exitoso 
}else{
	echo (2);
}


mysql_close();
?>