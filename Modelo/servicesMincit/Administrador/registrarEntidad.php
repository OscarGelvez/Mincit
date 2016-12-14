<?php
include "../Conexion_BD/conexion_mysql.php";
require '../Sesiones/smtpEnviarCorreo.php';
require '../Sesiones/PHPMailer/PHPMailerAutoload.php';


$data=json_decode(file_get_contents("php://input"));



$id_usuario_registro=$data->id_usuario_registro;
$nombreEntidad=$data->nombre;
$correoEntidad=$data->correo;
$descripEntidad=$data->descrip;
$telefonoEntidad=$data->telefono;
$direccionEntidad=$data->direccion;
$nitEntidad=$data->nit;
$urlLogo=$data->url_logo;
$correoUsuario=$data->correoUser;
$claveUsuario=sha1($data->claveUser);


$queryExisteEntidad="SELECT * FROM entidad WHERE nit_entidad=".$nitEntidad;
$existe=mysql_query($queryExisteEntidad);
$numero_filas = mysql_num_rows($existe);

if($numero_filas==1){
	echo(3); // nit de Entidad ya existe.
}else{

		$query= "INSERT INTO `entidad`(nit_entidad,nombre_entidad,correo_entidad,tel_entidad,direccion,descrip_entidad,id_usuario_registro,estado_actual,url_logo,correo_usuario_asociado) VALUES('$nitEntidad','$nombreEntidad','$correoEntidad','$telefonoEntidad','$direccionEntidad','$descripEntidad','$id_usuario_registro','1','$urlLogo','$correoUsuario')";

		if(mysql_query($query)){
			
				$query2= "INSERT INTO `usuario`(nombre_usuario,correo,clave,privilegio,estado_actual) VALUES('$nombreEntidad','$correoUsuario','$claveUsuario','en','1')";
				if(mysql_query($query2)){

						$usuarioNombre=$correoUsuario; // el nombre es el mismo del correo
				 		$Objmail = new PHPMailer;
				 		$objCorreo = new enviarCorreo;
				 		$claveSinEncrip=$data->claveUser;
				 		$objCorreo->enviarA($usuarioNombre,$usuarioNombre,$claveSinEncrip,$Objmail);


					echo (1); // Registro exitoso 
				}else{
					echo (4); // no se pudo registrar el usuario
				}


		}else{
			echo (2); //no se pudo registrar la entidad
		}

}
mysql_close();
?>