<?php 
// Realizo la conexión a la base de datos 
include_once '../Conexion_BD/conexion_mysql.php'; 





// Recibo los datos enviados desde el controlador
$data = json_decode(file_get_contents("php://input")); 
 
$usuario=$data->usuario;
$clave=$data->clave; // -> encriptar con sha1
 
//Realizo la consulta SQL
$query = "SELECT * FROM usuario WHERE correo='".$usuario."' AND clave= '".$clave."'";
consultar($query);

function consultar($query){
	$resultado=mysql_query($query);
	$numero_filas = mysql_num_rows($resultado);


	 if($numero_filas==1){

	 	crearSession($resultado);
	 
		}else{
				echo(0);
		}

}

function crearSession($resultado){

	  //print_r($fila);
	  session_start();
	  $fila=mysql_fetch_object($resultado);
	  
	  $tipo=$fila->privilegio;

	 
	  		if (isset($_SESSION['SI'])){

	  					if($_SESSION['SI'][0]==$tipo){
	  						echo (-1);
	  					}
	  					else{

	  						 $_SESSION['SI'][0]=$tipo; 
        					 $_SESSION['SI'][1]=$fila->correo; 
        					  echo json_encode($fila); 
	  					}

	  			 }

	  					else if(!isset($_SESSION['SI'])){

	  			    		$_SESSION['SI'][0]=$tipo; 
        			 		$_SESSION['SI'][1]=$fila->correo;
        			 		echo json_encode($fila);  
	  		} 
	  			
	 		 
	  		 //echo($_SESSION["ad"][0]);

}
	/*if(mysql_query($query)){
			echo json_encode(mysql_query("r".$query)); 
			mysql_close();
		}
		else{
			
		}
*/


mysql_close(); 
  
?>

