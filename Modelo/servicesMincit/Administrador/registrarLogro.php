<?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));


$nombreLogro=$data->nombre;
$descripLogro=$data->descrip;



$query= "INSERT INTO `logro`(nombre_logro,descrip_logro) VALUES('$nombreLogro','$descripLogro')";

if(mysql_query($query)){
	echo (1); // Registro exitoso 
}else{
	echo (2);
}


mysql_close();
?>