<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));

    	//Datos a Actualizar en tabla contacto
     	
			
		    $cedula=$data->cedula;
		    $nombres=$data->nombres;
		    $apellidos=$data->apellidos;
		    $cargo=$data->cargo;
		    $antiguedadCargo=$data->antiguedadCargo;
		    $fechaNacimiento=$data->fechaNacimiento;
		    $lugarNacimiento=$data->lugarNacimiento;
		    $nivelEstudios=$data->nivelEstudios;
		    $direccion=$data->direccion;
		    $telefonoF=$data->telefonoF;
		    $telefonoC=$data->telefonoC;			
		    $departamento=$data->departamento;
		    $ciudad=$data->ciudad;
		    $genero=$data->genero;
		    $correo=$data->correo;
		    $grupoEtnico=$data->grupoEtnico;
		    $condicionDesplazamiento=$data->condicionDesplazamiento;
		    $discapacidad=$data->discapacidad;
		    $notas=$data->notas;
			$cde=$data->cde;
			$recibirCorreos=$data->recibirCorreos;


	

$queryContactoUpdate="UPDATE `contacto` SET 
						
						nombre_cont='".$nombres."',
						apellido_cont='".$apellidos."',
						cargo_cont='".$cargo."',
						fecha_ingreso_cargo='".$antiguedadCargo."',
						fecha_nacimiento='".$fechaNacimiento."',
						lugar_nacimiento='".$lugarNacimiento."',
						nivel_estudio='".$nivelEstudios."',
						direccion='".$direccion."',
						tel_fijo='".$telefonoF."',
						tel_cel='".$telefonoC."',
						departamento='".$departamento."',
						ciudad='".$ciudad."',
						genero='".$genero."',
						correo='".$correo."',
						etnia='".$grupoEtnico."',
						desplazado='".$condicionDesplazamiento."',
						discapacidad='".$discapacidad."',
						notas='".$notas."',
						cde='".$cde."',
						recibir_correos='".$recibirCorreos."'
				


						WHERE cc_contacto=".$cedula;
					
//print_r($queryContactoUpdate);
	  
					 if(mysql_query($queryContactoUpdate)){
					  echo (1); //Resultado 	EXITOSO!
					 	mysql_close();
					 	}else{
					 		echo(2); //En caso de que no se pueda realizar la Actualizacion en tabla Contacto
					 	}	

?>