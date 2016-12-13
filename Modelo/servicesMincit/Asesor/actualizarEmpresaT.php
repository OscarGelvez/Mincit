<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));


				//Clasificacion de clientes
        	
       			 //Datos a Actualizar en tabla contacto
     	
			$clasificacion=$data->clasificacion;
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
			
			//Datos a Actualizar en tabla empresa
		   
		     $nombreE=$data->nombreE;
		     $nit=$data->nit;
		     $nombreR=$data->nombreR;
		     $constitucion=$data->constitucion;
		     $fechaC=$data->fechaC;
		     $tc=$data->tc;
		     $mt=$data->mt;
		     $directos=$data->directos;
		     $indirectos=$data->indirectos;
		     $direccionEm=$data->direccionEm;
		     $ciudadEm=$data->ciudadEm;
		     $dptoEm=$data->dptoEm;
		     $telefonoFijo=$data->telefonoFijo;
		     $telefonoCelular=$data->telefonoCelular;
		     $correoEm=$data->correoEm;
		     $sitioWeb=$data->sitioWeb;

		     $registroM=$data->registroM;
		     $numRegistro=$data->numRegistro;		    
		     $anoRenova=$data->anoRenova;  
		     $serviciosEmpre=$data->serviciosEmpre;
		     $observaciones=$data->observaciones;
		     $url_logo=$data->url_logo;	

		     //Datos a Actualizar en tabla empresa_Turistica
		    
		    $ccExtra=$data->ccExtra;
			$sostenibilidad=$data->sostenibilidad;
			$codEtica=$data->codEtica;
			$grupoEtnico=$data->grupoEtnico;
			$imptoTurismo=$data->imptoTurismo;
			$libroMigrac=$data->libroMigrac;
			$numSeguro=$data->numSeguro;
			$poliza=$data->poliza;
			$exportaServicios=$data->exportaServicios;
			$regNalTurismo=$data->regNalTurismo;
			$tipoActTuristica=$data->tipoActTuristica;
			$alojamiento=$data->alojamiento;
			$turismoDesarrolla=$data->turismoDesarrolla;

			$modificoNit=$data->modificoNit;
            





$queryExisteEmpresa="SELECT * FROM empresa WHERE nit=".$nit;
$existe2=mysql_query($queryExisteEmpresa);
$numero_filas2 = mysql_num_rows($existe2);

if($numero_filas2==1 && $modificoNit=="si"){
	echo(5); // nit de Empresa ya existe.
}else{
			

	$queryEmpresa = "UPDATE `empresa` SET 
	clasif_cliente='$clasificacion',
	nombre_empresa='$nombreE',
	nombre_rep_legal='$nombreR',
	nit='$nit',
	tipo_constitucion='$constitucion',
	direccion='$direccionEm',
	ciudad='$ciudadEm',
	departamento='$dptoEm',
	fecha_const_legal='$fechaC',
	no_emple_mt='$mt',
	no_emple_tc='$tc',
	no_emple_directo='$directos',
	no_emple_indirecto='$indirectos',
	
	telefonoF='$telefonoFijo',
	telefonoC='$telefonoCelular',
	registro_mercantil='$registroM',
	url_sitio_web='$sitioWeb',
	numero_registro_mercantil='$numRegistro',
	renov_mercantil='$anoRenova',
	servicios_ofrecidos='$serviciosEmpre',
	observaciones='$observaciones',
	
	
	contacto_cc='$cedula',
	 url_logo ='$url_logo'
	 
	 WHERE correo='$correoEm' "; 
				 	//print_r($queryEmpresa);
				if (mysql_query($queryEmpresa)) {

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
						discapacidad='".$discapacidad."'
						WHERE cc_contacto=".$cedula;
					
//print_r($queryContactoUpdate);
	  
					 if(mysql_query($queryContactoUpdate)){
					

								 
$queryEmpTurUpdate="UPDATE `empresa_turistica` SET 
						

						cc_extranj_opc='$ccExtra',
						certif_sostenib='$sostenibilidad',
						cod_etica='$codEtica',
						grupo_etnico_empr='$grupoEtnico',
						impto_turismo='$imptoTurismo',
						libro_migrac_col='$libroMigrac',
						num_seguro='$numSeguro',
						poliza_turistica='$poliza',
						reg_export_servicios='$exportaServicios',
						reg_nal_turismo='$regNalTurismo',
						tipo_activ_turistica='$tipoActTuristica',
						tipo_alojamiento='$alojamiento',
						turismo_desarrolla='$turismoDesarrolla',
						nit_empresa='$nit'
												
						
						
						WHERE correo_emp='$correoEm' "; 

//print_r($queryEmpTurUpdate);
						if(mysql_query($queryEmpTurUpdate)){
							echo (1); //Resultado 	EXITOSO!
					 	mysql_close();
					 	}else{
					 		echo(4); //En caso de que no se pueda realizar la Actualizacion en tabla empresa turistica
					 	}	


					 	
					 }else{
					 	echo (3);//En caso de que no se pueda realizar la Actualizacion en tabla contacto
					 }
			                           
				}else{
					echo (2);//En caso de que no se pueda realizar la actualizacion en tabla empresa
				}
			}




  	

?>