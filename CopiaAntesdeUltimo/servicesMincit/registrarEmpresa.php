<?php

include "conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));

$nombreE=$data->nombreE;
$nombreR=$data->nombreR;
$nit=$data->nit;
$constitucion=$data->constitucion;
$fechaC=$data->fechaC;
$tc=$data->tc;
$mt=$data->mt;
$directos=$data->directos;
$indirectos=$data->indirectos;
$direccionEm=$data->direccionEm;
$ciudadEm=$data->ciudadEm;

$telefonoFijo=$data->telefonoFijo;
$telefonoCelular=$data->telefonoCelular;
$correoEm=$data->correoEm;
$tipoEm=$data->tipoEm;
$tipoVenta=$data->tipoVenta;
$registroM=$data->registroM;


$sitioWeb=$data->sitioWeb;
$numRegistro=$data->numRegistro;
$anoRenova=$data->anoRenova;
$ciiu=$data->ciiu;
$actividadI=$data->actividadI;
$inter=$data->inter;
$paisesCome=$data->paisesCome;
$serviciosEmpre=$data->serviciosEmpre;
$medioCde=$data->medioCde;
$observaciones=$data->observaciones;

$clasificacion=$data->clasificacion;

$cedula=$data->cedula;
$antiguedadCargo=$data->antiguedadCargo;
$lugarNacimiento=$data->lugarNacimiento;
$nivelEstudios=$data->nivelEstudios;
$grupoEtnico=$data->grupoEtnico;
$condicionDesplazamiento=$data->condicionDesplazamiento;
$fechaNacimiento=$data->fechaNacimiento;

$queryP="UPDATE contacto SET antiguedadCargo = '$antiguedadCargo' WHERE cedula=".$cedula;
echo $queryP;




$query = "INSERT INTO `empresa` (clasificacion,nombreEmpresa,nombreRepresentante,nit,constitucion,direccion,fechaCons,TC,MT,directos,indirectos,ciudad,correo,telefonoF,telefonoC,tipoEmp,tipoVenta,registroM,sitioWeb,numeroMercantil,anoRenova,codigoPrincipal,actividadInterna,negociosInternet,comercioPaises,serviciosEm,medioDifusion,observaciones) VALUES ('$clasificacion','$nombreE','$nombreR','$nit','$constitucion','$direccionEm','$fechaC','$tc','$mt','$directos','$indirectos','$ciudadEm','$correoEm','$telefonoFijo','$telefonoCelular','$tipoEm','$tipoVenta','$registroM','$sitioWeb','$numRegistro','$anoRenova','$ciiu','$actividadI','$inter','$paisesCome','$serviciosEmpre','$medioCde','$observaciones')";
echo mysql_error();
if (mysql_query($query)) 
{
	
		 mysql_close();			
        echo json_encode(mysql_query($query));           
         
}
 

 

  	

?>