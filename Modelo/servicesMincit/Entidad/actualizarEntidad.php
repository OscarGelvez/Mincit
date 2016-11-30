<?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));



$nombreEntidad=$data->nombre;
$correoEntidad=$data->correo;
$descripEntidad=$data->descrip;
$telefonoEntidad=$data->telefono;
$direccionEntidad=$data->direccion;
$nitEntidad=$data->nit;
$urlLogo=$data->url_logo;



		$query= "UPDATE `entidad` SET nombre_entidad='$nombreEntidad',correo_entidad='$correoEntidad',tel_entidad='$telefonoEntidad',direccion='$direccionEntidad',descrip_entidad='$descripEntidad',url_logo='$urlLogo'
		 WHERE nit_entidad='$nitEntidad' ";
	
		if(mysql_query($query)){
	
					echo (1); // Registro exitoso 
		}else{
			echo (2); //no se pudo registrar la entidad
		}


mysql_close();
?>