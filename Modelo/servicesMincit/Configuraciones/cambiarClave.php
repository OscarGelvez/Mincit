 <?php
include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));

$val=$data->val;
$id_user=$data->id_user;

if($val==1){

$claveNueva=$data->claveNueva;


$query="UPDATE usuario SET clave='".$claveNueva."' WHERE id_usuario='".$id_user."'";

	if (mysql_query($query)) {
		 		
		 echo(1);          
		}else{
			echo(2);
		}

}else if($val==2){
	$query2="SELECT clave FROM usuario WHERE id_usuario='".$id_user."'";
		$res=mysql_query($query2);

		$numero_filas = mysql_num_rows($res);

	if ($numero_filas==1) {		 
				$datos=array();

				//print_r($obj=mysql_fetch_object($res));

				
				while ($obj=mysql_fetch_object($res)) 
				{
					
				      $arch = array(
				      	"clave" => $obj->clave
				 
				     );
					    $datos[]=$arch;	
					 
				}
				echo json_encode($datos);

		}else{
			echo(2);
		}
}


mysql_close();	



?>