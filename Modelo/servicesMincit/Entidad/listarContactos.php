<?php
include("../Conexion_BD/conexion_mysql.php");
$qry="select * from contacto";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
	
      /*$arch = array(
       "nombre" => $obj->nombre_empresa,
       "nombreR" => $obj->nombre_rep_legal,
       "nit" => $obj->nit,
       "sitioWeb" => $obj->url_sitio_web,
       "ciudad" => $obj->ciudad,
       "correo" => $obj->correo,
       "img_logo" => $obj->url_logo,
       "const_legal" =>$obj->tipo_constitucion,
      "dpto" =>$obj->departamento, 
      "ciudad" =>$obj->ciudad,
      "clasif_cliente" =>$obj->clasif_cliente,
      "tipo_emp" =>$obj->tipo_empresa
      
     ); */
	    $datos[]=$obj;
         	
	 
}
echo json_encode($datos);
mysql_close();

?>
 
    