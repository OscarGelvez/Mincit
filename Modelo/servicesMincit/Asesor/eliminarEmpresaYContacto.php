<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));


        	$ccContacto=$data->ccContacto;
       			    		
			$correoEmp=$data->correoEmp;

			$tipo=$data->tipo;
    


			

						$queryDeleteEmpresa = "DELETE FROM `empresa` WHERE correo='$correoEmp'";
				 	//print_r($queryEmpresa);
				if (mysql_query($queryDeleteEmpresa)) {

					$queryDeleteEmpresaE = "DELETE FROM `empresa_emprend` WHERE correo_emp='$correoEmp'";

					$queryDeleteEmpresaT = "DELETE FROM `empresa_turistica` WHERE correo_emp='$correoEmp'";

						if($tipo=="Emprendedora"){
							$consulta=$queryDeleteEmpresaE;
						}else if($tipo=="Turística"){
							$consulta=$queryDeleteEmpresaT;
						}

					 if(mysql_query($consulta)){

					 	$queryDeleteContacto = "DELETE FROM `contacto` WHERE cc_contacto='$ccContacto'";

					 	if(mysql_query($queryDeleteContacto)){
					 			mysql_close();
					 	echo (1); //Resultado 	EXITOSO!
					 	}
					 
					 }else{
					 	echo (3);//En caso de que no se pueda realizar la insercion en tabla empresa emprendedora o turistica
					 }
			                           
				}else{
					echo (2);//En caso de que no se pueda realizar la insercion en tabla empresa
				}
			

?>