<?php
include("../Conexion_BD/conexion_mysql.php");
$qry="select * from departamento";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());

$datos=array();
$numero_filas = mysql_num_rows($res);

if($numero_filas>=1){
  while ($obj=mysql_fetch_object($res)) 
      {
      
      $arch = array(
      "id" => utf8_encode($obj->id_dpto),
       "nombre" => utf8_encode($obj->nombre_dpto)

        
     );
     // print_r($obj);
      $datos[]=$arch; 
   
      }

       echo json_encode($datos);
        mysql_close();


}else{
  echo 0;
}


?>


   