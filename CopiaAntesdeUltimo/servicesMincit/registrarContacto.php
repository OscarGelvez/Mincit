<?php

include "conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
$fecha=$data->fecha;
$nombres=$data->nombres;
$apellidos=$data->apellidos;
$cedula=$data->cedula;
$correo=$data->correo;
$genero=$data->genero;
$recibirCorreos=$data->recibirC;
$cargos=$data->cargo;
$numTelefono=$data->numTelefono;
$numCelular=$data->numCelular;
$direccion=$data->direccion;
$cde=$data->cde;
$ciudad=$data->ciudad;
$departamento=$data->departamento;
$pais=$data->pais;
$notas=$data->notas;
$asesor="nombreAsesor";

$query = "INSERT INTO `contacto` (asesor,fecha,nombres,apellidos,cedula,correo,genero,recibirCorreos,cargos,numTelefono,numCelular,direccion,cde,ciudad,departamento,pais,notas) VALUES 
					('$asesor','$fecha','$nombres','$apellidos','$cedula','$correo','$genero','$recibirCorreos','$cargos','$numTelefono','$numCelular','$direccion','$cde','$ciudad','$departamento','$pais','$notas')";

if (mysql_query($query)) 
{
 mysql_close();			
 echo json_encode(mysql_query($query));           
}
  
  	

?>