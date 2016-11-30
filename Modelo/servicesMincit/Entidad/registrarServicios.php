<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
$nombre_servicio=$data->nombre;
$descrip_servicio=$data->descripcion;
$id=$data->user;


$query = "INSERT INTO `servicio`(nombre_servicio,descrip_servicio,correo_usuario_asociado) VALUES 
					('$nombre_servicio','$descrip_servicio','$id')";


if (mysql_query($query)) 
			{	
				echo (1);
			}else{
				echo (2);
			}


	mysql_close();	

?>
