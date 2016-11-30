<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));


				//Clasificacion de clientes
        	$clasificacion=$data->clasificacion;
       			 //Datos a insertar o actualizar en tabla contacto
     		
			$id_usuario_registro=$data->id_usuario_registro;

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
			
			//Datos a insertar en tabla empresa
		   
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

		     //Datos a insertar en tabla empresa_emprend
		     $tipoEm=$data->tipoEm;
		     $ciiu=$data->ciiu;
		     $actividadI=$data->actividadI;
		     $paisesCome=$data->paisesCome;
		     $negocio_internet=$data->negocio_internet;	
		     $medioCde=$data->medioCde;

            



$queryExisteEmpresa="SELECT * FROM empresa WHERE nit=".$nit;
$existe2=mysql_query($queryExisteEmpresa);
$numero_filas2 = mysql_num_rows($existe2);

if($numero_filas2==1){
	echo(5); // nit de Empresa ya existe.
}else{

				$queryExisteContacto="SELECT * FROM contacto WHERE cc_contacto=".$cedula;
				$existe=mysql_query($queryExisteContacto);
				$numero_filas = mysql_num_rows($existe);
				
				if($numero_filas==1){

							$queryContactoUpdate="UPDATE `contacto` SET 
						id_usuario_registro='".$id_usuario_registro."',	
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

				//print_r(mysql_query($queryContactoUpdate)." fin");
										if(mysql_query($queryContactoUpdate)==1){
											$okContacto=0; // Bien
											
										}else{
											$okContacto=1; //Mal
											
										}
						//mysql_close();

					}else if($numero_filas==0){

							$queryContactoInsercion="INSERT INTO `contacto`(cc_contacto,id_usuario_registro,nombre_cont,apellido_cont,cargo_cont,fecha_ingreso_cargo,fecha_nacimiento,lugar_nacimiento,nivel_estudio,direccion,tel_fijo,tel_cel,departamento,ciudad,genero,correo,etnia,desplazado,discapacidad) VALUES
							 ('$cedula','$id_usuario_registro','$nombres','$apellidos','$cargo','$antiguedadCargo','$fechaNacimiento','$lugarNacimiento','$nivelEstudios','$direccion','$telefonoF','$telefonoC','$departamento','$ciudad','$genero','$correo','$grupoEtnico','$condicionDesplazamiento','$discapacidad')";
							

							if(mysql_query($queryContactoInsercion)==1){
											$okContacto=0; // Bien
											
										}else{
											$okContacto=1; //Mal
											

										}
							//print_r($queryContactoInsercion);
							//mysql_close();
					}

				if($okContacto==0){

						$queryEmpresa = "INSERT INTO `empresa`(clasif_cliente,nombre_empresa,nombre_rep_legal,nit,tipo_constitucion,direccion,ciudad,departamento,fecha_const_legal,no_emple_mt,no_emple_tc,no_emple_directo,no_emple_indirecto,correo,telefonoF,telefonoC,registro_mercantil,url_sitio_web,numero_registro_mercantil,renov_mercantil,servicios_ofrecidos,observaciones,id_usuario_registro,tipo_empresa,contacto_cc, url_logo, estado_actual) VALUES
				 ('$clasificacion','$nombreE','$nombreR','$nit','$constitucion','$direccionEm','$ciudadEm','$dptoEm','$fechaC','$mt','$tc','$directos','$indirectos','$correoEm','$telefonoFijo','$telefonoCelular','$registroM','$sitioWeb','$numRegistro','$anoRenova','$serviciosEmpre','$observaciones','$id_usuario_registro','e','$cedula','$url_logo','1')";
				 	//print_r($queryEmpresa);
				if (mysql_query($queryEmpresa)) {

						 $queryEmpresaEmprend = "INSERT INTO `empresa_emprend`(correo_emp,nit_empresa,tipo_activ_empresa,cod_ciiu,activ_intern,paises_comercializa,negoc_internet,como_se_entero) VALUES
								 ('$correoEm','$nit','$tipoEm','$ciiu','$actividadI','$paisesCome','$negocio_internet','$medioCde')"; 
								 
					 if(mysql_query($queryEmpresaEmprend)){
					 	mysql_close();
					 	echo (1); //Resultado 	EXITOSO!
					 }else{
					 	echo (3);//En caso de que no se pueda realizar la insercion en tabla empresa emprendedora
					 }
			                           
				}else{
					echo (2);//En caso de que no se pueda realizar la insercion en tabla empresa
				}
			}else{
				echo(4); //En caso de okContacto sea = a 1, no se pudo actualizarlo o registrarlo, entonces no Registro empresa.
			}

}


  	

?>