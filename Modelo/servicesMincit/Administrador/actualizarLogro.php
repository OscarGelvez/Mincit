<?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));



$nombreLogro=utf8_decode($data->nombre);
$descripLogro=utf8_decode($data->descrip);
$id=$data->id_logro;




		$query= "UPDATE `logro` SET nombre_logro='$nombreLogro',descrip_logro='$descripLogro' WHERE id_logro='$id' ";
	
		if(mysql_query($query)){
	
					echo (1); // Registro exitoso 
		}else{
			echo (2); //no se pudo registrar la entidad
		}


mysql_close();
?>