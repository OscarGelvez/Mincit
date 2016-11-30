<?php
include("../Conexion_BD/conexion_mysql.php");
$data=json_decode(file_get_contents("php://input"));
$id=$data->user;

$qry="SELECT * FROM servicio WHERE correo_usuario_asociado='$id'";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	
      $arch = array(
      "nombre_servicio" => utf8_encode($obj->nombre_servicio),
       "descrip_servicio" => utf8_encode($obj->descrip_servicio)
       
      
     );
	    $datos[]=$arch;	
	 
}
echo json_encode($datos);
mysql_close();

?>