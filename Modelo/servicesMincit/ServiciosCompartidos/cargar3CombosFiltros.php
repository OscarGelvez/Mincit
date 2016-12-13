<?php
include("../Conexion_BD/conexion_mysql.php");

$data = json_decode(file_get_contents("php://input"));  



$qry="select * from valoresCombosFiltros ";
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());


$numero_filas = mysql_num_rows($res);

if($numero_filas>=1){
  while ($obj=mysql_fetch_object($res)) 
      {
     
      //print_r($obj);
      $datos[]=$obj; 
   
      }

       echo json_encode ($datos);
        mysql_close();


}else{
  echo 0;
}


?>


   