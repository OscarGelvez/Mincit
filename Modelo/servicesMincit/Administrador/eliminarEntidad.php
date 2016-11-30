<?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));



$nitEntidad=$data->nit;




		$query= "UPDATE `entidad` SET estado_actual='0' WHERE nit_entidad='$nitEntidad' ";
	
		if(mysql_query($query)){
	
					echo (1); // Eliminado exitoso 
		}else{
			echo (2); //no se pudo eliminar la entidad
		}


mysql_close();
?>