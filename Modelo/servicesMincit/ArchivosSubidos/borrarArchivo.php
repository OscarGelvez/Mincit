<?php
$data=json_decode(file_get_contents("php://input"));
$nombre=$data->nombre;
$tipo=$data->tipo;

if($tipo="vacio"){
$file = "../../../Vista/LogosEmpresas/" . $nombre;
print_r($file);
$do = unlink($file);
}else{
$file = "../../../Vista/LogosEmpresas/" . $nombre.".".$tipo;
print_r($file);
$do = unlink($file);
}


 
if($do != true){
 echo "There was an error trying to delete the file" . $nombre . "<br />";
 }

 
?>