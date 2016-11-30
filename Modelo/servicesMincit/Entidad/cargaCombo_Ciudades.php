<?php
include("../Conexion_BD/conexion_mysql.php");

$data = json_decode(file_get_contents("php://input"));  


$array = json_decode(json_encode($data), True);
$op=$array['dpto_select'];


$qry="select * from ciudad where id_dpto=".$op;
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());

$datos=array();
$numero_filas = mysql_num_rows($res);

if($numero_filas>=1){
  while ($obj=mysql_fetch_object($res)) 
      {
      
      $arch = array(
      "id" => utf8_encode($obj->id_ciudad),
       "nombre" => utf8_encode($obj->nombre_ciudad)

        
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


   