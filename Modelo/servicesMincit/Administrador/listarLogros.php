<?php
include("../Conexion_BD/conexion_mysql.php");
$qry="select * from logro";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	
      $arch = array(
      "id_logro"=> $obj->id_logro,	
       "nombre_logro" =>  utf8_encode($obj->nombre_logro),
       "descrip_logro" => utf8_encode($obj->descrip_logro)
       
      
     );
	    $datos[]=$arch;	
	 
}
//print_r($datos);
echo json_encode($datos);
mysql_close();

?>
 