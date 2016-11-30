<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
$cedula=$data->cedula;

$antiguedadCargo=$data->antiguedadCargo;
$lugarNacimiento=$data->lugarNacimiento;
$fechaNacimiento=$data->fechaNacimiento;
$nivelEstudios=$data->nivelEstudios;
$grupoEtnico=$data->grupoEtnico;
$condicionDesplazamiento=$data->condicionDesplazamiento;


$query="UPDATE contacto SET antiguedadCargo = '".$antiguedadCargo."', 
                           lugarNacimiento = '".$lugarNacimiento."',
                           fechaNacimiento = '".$fechaNacimiento."',
                           nivelEstudios = '".$nivelEstudios."',
                           grupoEtnico = '".$grupoEtnico."',
                           condicionDesplazamiento = '".$condicionDesplazamiento."'WHERE cedula=".$cedula;

if (mysql_query($query)) 
{
 mysql_close();			
 echo json_encode(mysql_query($query));           
}
  
  	

?>