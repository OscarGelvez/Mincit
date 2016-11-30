<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));
$cedula=$data->cedula;
$qry="select * from contacto where cc_contacto=".$cedula;
$res=mysql_query($qry) or die("Query: $qry ".mysql_error());
$datos=array();

$numero_filas = mysql_num_rows($res);
if($numero_filas==1){
  while ($obj=mysql_fetch_object($res)) 
{
      
      $arch = array(
       "nombres" => $obj->nombre_cont,
       "apellidos" => $obj->apellido_cont,
       "cargo" => $obj->cargo_cont,
       "direccion" => $obj->direccion,
       "ciudad" => $obj->ciudad,
       "departamento" => $obj->departamento,
       "telefonoF" => $obj->tel_fijo,
       "telefonoC" => $obj->tel_cel,
       "correo" => $obj->correo,
       "genero" => $obj->genero,
 
     );
          $datos[]=$arch;     
} 
echo json_encode($datos);
 
}
    else{
         echo(0);
      }


mysql_close();  

    



?>