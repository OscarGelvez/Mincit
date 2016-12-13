<?php
include "../Conexion_BD/conexion_mysql.php";
require_once dirname(__FILE__) . '/Classes/PHPExcel/IOFactory.php';

$data=json_decode(file_get_contents("php://input"));


$id_usuario_registro=$_POST['idUsuarioRegistro'];


$formatos=array('.xlsx','.xls');
//$directorio="../archivosEcaes/$periodo";
$directorio="ArchivosExcelEntidades";


    $nombreArchivo=$_FILES['file']['name'];
    $nombreTmpArchivo=$_FILES['file']['tmp_name'];
$ruta="ArchivosExcelEntidades/$nombreArchivo";
    $ext=substr($nombreArchivo, strrpos($nombreArchivo, '.'));

  if(in_array($ext, $formatos))
  {
          if(file_exists("ArchivosExcelEntidades/$nombreArchivo"))
          {
                 echo ",303";// indica que el archivo excel ya existe en el sistema
          }else{
                if(move_uploaded_file($nombreTmpArchivo, "ArchivosExcelEntidades/$nombreArchivo"))
                {
                echo ",11"; // indica q subio el archivo exitosamente

              
                 $tmpfname =$ruta;      
                 $excelReader = PHPExcel_IOFactory::createReaderForFile($tmpfname);
                  $excelObj = $excelReader->load($tmpfname);
                  $worksheet = $excelObj->getSheet(0);
                  $lastRow = $worksheet->getHighestRow();

                    $cont=0;                  
                  for ($row = 6; $row <= $lastRow; $row++) {
                   $cantTotalFilas=$lastRow-$row;
                  
                      $nitS=$worksheet->getCell("A".$row)->getValue();                  
                      $nombreS=$worksheet->getCell("B".$row)->getValue();
                      $correoS=$worksheet->getCell("C".$row)->getValue();
                      $telefonoS=$worksheet->getCell("D".$row)->getValue();                  
                      $direccionS=$worksheet->getCell("E".$row)->getValue();
                      $descripcionS=$worksheet->getCell("F".$row)->getValue();

                        // valores estaticos siempre
                        $correoUsuario=$correoS; // dejo como correo usuario asociado y correo de la entidad el mismo..! ya no es para el usuario el tipico et#@mail.com
                        $claveUsuario=sha1("123Mincit");

                      /////////////////////////////////////////////////////////////////////////////////                      
                                               

                                  $query= "INSERT INTO `entidad`(nit_entidad,nombre_entidad,correo_entidad,tel_entidad,direccion,descrip_entidad,id_usuario_registro,estado_actual,correo_usuario_asociado,url_logo) 
                                  VALUES('$nitS','$nombreS','$correoS','$telefonoS','$direccionS','$descripcionS','$id_usuario_registro','1','$correoUsuario','nologo.jpg')";

                                  if(mysql_query($query)){
                                    
                                      $query2= "INSERT INTO `usuario`(nombre_usuario,correo,clave,privilegio,estado_actual) VALUES('$nombreS','$correoUsuario','$claveUsuario','en','1')";
                                      if(mysql_query($query2)){
                                          $cont++;
                                        if($cont==$cantTotalFilas){
                                           echo (",10"); // Registro exitoso 
                                        }
                                       
                                      }else{

                                        if($cont==$cantTotalFilas){
                                           echo (",40"); // // no se pudo registrar el usuario
                                        }
                                         
                                      }


                                  }else{
                                    echo (",20"); //no se pudo registrar la entidad
                                  }
              
                         
                    }
                    
              }else{
                    echo ",4040";
                   }
          }

        
  }else{
        	echo ",4005"; // si sube un archivo con otro formato q no es excel
       }





?>