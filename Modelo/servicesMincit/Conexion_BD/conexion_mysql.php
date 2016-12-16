<?php
    // Atributos para realizar la conexión a la base de datos
	/*$server="sandbox2.ufps.edu.co";
	$username="ufps_13";
	$password="ufps_82";  
	$db="ufps_13"; 	
	
   
	$server="localhost";
	$username="root";
	$password="";  
	$db="bd_mincit_respaldo"; */

	$server="sql302.epizy.com";
	$username="epiz_19227766";
	$password="12345678";  
	$db="epiz_19227766_mincit"; 	

	conectar($server, $username, $password, $db);
	//Realizando conexión a la base de datos
	function conectar($server, $username, $password, $db){
		$con=mysql_connect($server,$username,$password)or die("9");
			$sdb=mysql_select_db($db,$con)or die("la base de datos no existe");
	}
	

?>
