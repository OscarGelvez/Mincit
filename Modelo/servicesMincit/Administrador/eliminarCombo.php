<?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));



$valor=$data->id;




		$query= "DELETE FROM `valoresCombosFiltros` WHERE id=".$valor;
	
		if(mysql_query($query)){
	
					echo (1); // Eliminado exitoso 
		}else{
			echo (2); //no se pudo eliminar la opcion combo
		}


mysql_close();
?>