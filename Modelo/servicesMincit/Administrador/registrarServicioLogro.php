<?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));


$id_logro=$data->id_logro;
$id_servicio=$data->id_servicio;
$nit=$data->nit;



$query= "INSERT INTO `entidad_servicio_logro`(nit_entidad,id_servicio,id_logro) VALUES('$nit','$id_servicio','$id_logro')";

if(mysql_query($query)){

	$query2= "UPDATE `servicio` SET estado_asociado='1' WHERE id_servicio='$id_servicio' ";
			if(mysql_query($query2)){
				echo (1); // Registro exitoso 
			}else{
				echo(2); // error de actualizacion
			}
	
}else{
	echo (2); //error en insercion tabla entidad_servicio_logro
}


mysql_close();
?>