<?php 
// Realizo la conexión a la base de datos 
include_once '../Conexion_BD/conexion_mysql.php'; 

require 'smtpEnviarCorreo.php';
require 'PHPMailer/PHPMailerAutoload.php';

// Recibo los datos enviados desde el controlador
$data = json_decode(file_get_contents("php://input")); 
 
$usuarioCorreo=$data->usuario;

 
//Realizo la consulta SQL
$query = "SELECT * FROM usuario WHERE correo='".$usuarioCorreo."' ";
consultar($query);

function consultar($query){
	$resultado=mysql_query($query);
	$numero_filas = mysql_num_rows($resultado);

	$obj=mysql_fetch_object($resultado);
	print_r($obj);

	$claveLista=sha1($obj->clave);
	print_r($claveLista);

	 if($numero_filas==1){ // si es uno el usuario existe.
	 		$usuarioNombre=$obj->nombre_usuario;
	 		$Objmail = new PHPMailer;
	 		$objCorreo = new enviarCorreo;
	 		//$objCorreo->enviarA($usuarioNombre,$usuarioCorreo,$Objmail);

		}else{
				echo(0);
		}

}

mysql_close(); 
  
?>

