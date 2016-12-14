<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));


        	$ccContacto=$data->ccContacto;
       			    		
			$correoEmp=$data->correoEmp;

			$tipo=$data->tipo;
    				
					$queryDeleteEmpresaE = "DELETE FROM `empresa_emprend` WHERE correo_emp='$correoEmp'";

					$queryDeleteEmpresaT = "DELETE FROM `empresa_turistica` WHERE correo_emp='$correoEmp'";

				if($tipo=="Emprendedora"){
							$consulta=$queryDeleteEmpresaE;
						}else if($tipo=="Turística"){
							$consulta=$queryDeleteEmpresaT;
						}
			
						//print_r($consulta);
				if (mysql_query($consulta)) {

						$queryDeleteEmpresa = "DELETE FROM `empresa` WHERE correo='$correoEmp'";
				 	//print_r($queryDeleteEmpresa);
						

					 if(mysql_query($queryDeleteEmpresa)){

					 	$queryDeleteContacto = "DELETE FROM `contacto` WHERE cc_contacto='$ccContacto'";

					 	if(mysql_query($queryDeleteContacto)){
					 			mysql_close();
					 	echo (1); //Resultado 	EXITOSO!
					 	}else{
					 		echo (4); // en caso de q no pueda borrar el contacto
					 	}
					 
					 }else{
					 	echo (3);//En caso de que no se pueda realizar la eliminacion en tabla empresa 
					 }
			                           
				}else{
					echo (2);//En caso de que no se pueda realizar la eliminacion  en tabla empresa_emprend o empresa Turistica
				}
			

?>