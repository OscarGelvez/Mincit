<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
$id_usuario_registro=$data->id_usuario_registro;
$nombres=$data->nombres;
$apellidos=$data->apellidos;
$cedula=$data->cedula;
$correo=$data->correo;
$genero=$data->genero;
$recibirCorreos=$data->recibirC;
$cargo=$data->cargo;
$numTelefono=$data->numTelefono;
$numCelular=$data->numCelular;
$direccion=$data->direccion;
$cde=$data->cde;
$ciudad=$data->ciudad;
$departamento=$data->departamento;
$notas=$data->notas;







$query = "INSERT INTO `contacto`(id_usuario_registro,nombre_cont,apellido_cont,cc_contacto,correo,genero,recibir_correos,cargo_cont,tel_cel,tel_fijo,direccion,cde,ciudad,departamento,notas) VALUES 
					('$id_usuario_registro','$nombres','$apellidos','$cedula','$correo','$genero','$recibirCorreos','$cargo','$numCelular','$numTelefono','$direccion','$cde','$ciudad','$departamento','$notas')";



$queryExisteContacto="SELECT * FROM contacto WHERE cc_contacto=".$cedula;
$existe=mysql_query($queryExisteContacto);
$num_filas=mysql_num_rows($existe);

if($num_filas==1){	

echo(2);
}else{
			
		if (mysql_query($query)) 
			{	
				echo (1);
				    
			}

}

	mysql_close();	

?>
