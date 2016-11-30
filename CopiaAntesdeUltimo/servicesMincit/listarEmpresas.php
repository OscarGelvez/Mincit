<?php
include("conexion_mysql.php");
$qry="select * from empresa";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	
      $arch = array(
      	"nombre" => $obj->nombreEmpresa,
       "nombreR" => $obj->nombreRepresentante,
       "nit" => $obj->nit,
       "sitioWeb" => $obj->sitioWeb,
       "ciudad" => $obj->ciudad,
       "correo" => $obj->correo
 
     );
	    $datos[]=$arch;	
	 
}
echo json_encode($datos);
mysql_close();

?>
 
    