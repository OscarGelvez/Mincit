<?php
include("../Conexion_BD/conexion_mysql.php");

$qry="SELECT * FROM servicio  WHERE estado_asociado=0";



 $res=mysql_query($qry) or die("Query: $qry ".mysql_error());
 

$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	$auxCorreoAsociado=$obj->correo_usuario_asociado;
	$qry2="SELECT nit_entidad,nombre_entidad FROM entidad WHERE correo_usuario_asociado='$auxCorreoAsociado'";	
	 if($res2=mysql_query($qry2)){
	 	$obj2=mysql_fetch_object($res2);

	 
      $arch = array(
       "id_servicio" =>  $obj->id_servicio,
       "nombre_servicio" => utf8_encode($obj->nombre_servicio),
       "descripcion" => utf8_encode($obj->descrip_servicio),
       "correo_usuario" => $obj->correo_usuario_asociado,
       "nit" =>  $obj2->nit_entidad,
	   "nombre_entidad" => utf8_encode($obj2->nombre_entidad)	
              
      
     );
  }

    $datos[]=$arch;	

}

echo json_encode($datos);
mysql_close();

?>

