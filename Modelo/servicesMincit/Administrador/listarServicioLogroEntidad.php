<?php
include("../Conexion_BD/conexion_mysql.php");
$qry="SELECT * FROM entidad_servicio_logro";

if($res=mysql_query($qry)){

$datos=array();
while ($obj=mysql_fetch_object($res)) 
{
      $qry2="SELECT nombre_logro, descrip_logro FROM logro WHERE id_logro=".$obj->id_logro;
      if($res2=mysql_query($qry2)){
            $obj2=mysql_fetch_object($res2);

                        $qry3="SELECT nombre_servicio, descrip_servicio FROM servicio WHERE id_servicio=".$obj->id_servicio;
                        if($res3=mysql_query($qry3)){
                              $obj3=mysql_fetch_object($res3);

                              $arch = array(
                                    "nit" => $obj->nit_entidad,
                                     "nombreLogro" => utf8_encode($obj2->nombre_logro),
                                     "DescripLogro" => utf8_encode($obj2->descrip_logro),
                                     "nombreServicio" => utf8_encode($obj3->nombre_servicio),
                                     "DescripServicio" => utf8_encode($obj3->descrip_servicio)
                                     
      
                                    );
                        }

      
      }
          $datos[]=$arch;
            
       
}






}



echo json_encode($datos);
mysql_close();

?>