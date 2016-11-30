<?php
include("../Conexion_BD/conexion_mysql.php");


$data=json_decode(file_get_contents("php://input"));


$correo=$data->correo_usuario_asociado;

$query= "SELECT nit_entidad FROM entidad WHERE correo_usuario_asociado='$correo'";
 $datos=array();
if($res=mysql_query($query)){
      $obj=mysql_fetch_object($res);
      $nitEntidad=$obj->nit_entidad;
   
      $query2="SELECT* FROM entidad WHERE estado_actual=1 AND nit_entidad='$nitEntidad'";
      $res2=mysql_query($query2) or die("Query: $qry ".mysql_error());

      if($res2=mysql_query($query2)){
            $obj2=mysql_fetch_object($res2);
            $datos[]=$obj2;
            echo json_encode($datos);      
            
      }

}
mysql_close();

?>

