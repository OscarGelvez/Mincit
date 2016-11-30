<?php

include "../Conexion_BD/conexion_mysql.php";
$data=json_decode(file_get_contents("php://input"));

/*
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

            */
 $url_logo=$data->url_logo;	
$modificoNit="no";

$queryExisteEmpresa="SELECT * FROM empresa WHERE nit=".$nit;
$existe2=mysql_query($queryExisteEmpresa);
$numero_filas2 = mysql_num_rows($existe2);

if($numero_filas2==1 && $modificoNit=="si"){
	echo(5); // nit de Empresa ya existe.
}else{
			

	$queryEmpresa = "UPDATE `empresa` SET
	url_logo='".$url_logo."' VALUES ";
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
			}




  	

?>