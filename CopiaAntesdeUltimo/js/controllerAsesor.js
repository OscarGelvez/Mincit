var app=angular.module('mincit.controllersAsesor',['LocalStorageModule']);

app.run([ "CONFIG", "$http", function(CONFIG, $http)
{

  var sesion;
function verificar(){

  $http.get('servicesMincit/verificaSession.php')
            .success(function(data) {
              console.log(data);
                    sesion=data;
                    if(data=="as"){
                       CONFIG.ROL_CURRENT_USER= 2;
                       
                        }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}
verificar();

}])


app.directive('dateFormat', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      //Angular 1.3 insert a formater that force to set model to date object, otherwise throw exception.
      //Reset default angular formatters/parsers
      ngModelCtrl.$formatters.length = 0;
      ngModelCtrl.$parsers.length = 0;
    }
  };
});



app.controller('controllerInicio_Asesor', ['$scope', '$http', 'usSpinnerService', 'cerrarSesion',  function($scope, $http, usSpinnerService, cerrarSesion){

$scope.mostrarEmpre=function(){
	usSpinnerService.spin('spinner-1');
		$http.get("servicesMincit/listarEmpresas.php")
		.success(function(data){
			usSpinnerService.stop('spinner-1');
			$scope.data=data
		})
	}
   
	$scope.mostrarEmpre();



  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])


app.controller('controllerEmpresaE_Asesor', ['$scope', '$http', 'cerrarSesion', 'localStorageService', 'usSpinnerService', '$location', function($scope, $http, cerrarSesion, localStorageService, usSpinnerService, $location){

 

if(localStorageService.get("miEmpresa")){
	swal({
  title: 'Autoguardado',
  text: "Se han encontrado datos previos de un registro, ¿Desea continuar el registro anterior o empezar un registro nuevo?",
  type: 'info',
  allowOutsideClick: false,
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#388E3C',
  confirmButtonText: 'Continuar registro',
  cancelButtonText:'Registro nuevo'

}).then(function() {
  
    $scope.emp=localStorageService.get("miEmpresa");
    
    $scope.reestablecerDatos($scope.emp);

}, function(dismiss) {
   if (dismiss === 'cancel') {
  localStorageService.remove("miEmpresa");
    swal(
      'Nuevo Registro',
      'Iniciando un nuevo registro',
      'success'
    );

  }
})

}



$(window).bind('beforeunload',function(){
return '¿Está seguro de recargar y perder los datos que no han sido guardados?';
});

$scope.guardarTemporal=function(){

	var miEmpresa= new Object();

	miEmpresa.clasificacion=$scope.clasificacion;
	miEmpresa.cedula=$scope.cedula;
	miEmpresa.apellidos=$scope.apellidos;
	miEmpresa.nombres=$scope.nombres;
	miEmpresa.cargo=$scope.cargo;
	miEmpresa.antiguedad=$scope.antiguedad;

	
	miEmpresa.fechaN=$scope.fechaN;
	miEmpresa.lugarN=$scope.lugarN;
	miEmpresa.nivelEstudio=$scope.nivelEstudio;
	miEmpresa.direccion=$scope.direccion;
	miEmpresa.telefonoF=$scope.telefonoF;
	miEmpresa.telefonoC=$scope.telefonoC;
	miEmpresa.ciudad=$scope.ciudad;
	miEmpresa.departamento=$scope.departamento;
	miEmpresa.genero=$scope.genero;
	miEmpresa.correo=$scope.correo;
	miEmpresa.grupoE=$scope.grupoE;
	miEmpresa.condicionD=$scope.condicionD;

	miEmpresa.nombreE=$scope.nombreE;
	miEmpresa.nit=$scope.nit;
	miEmpresa.nombreR=$scope.nombreR;
	miEmpresa.constitucion=$scope.constitucion;
	miEmpresa.fechaC=$scope.fechaC;
	miEmpresa.tc=$scope.tc;
	miEmpresa.mt=$scope.mt;
	miEmpresa.directos=$scope.directos;
	miEmpresa.indirectos=$scope.indirectos;
	miEmpresa.direccionEm=$scope.direccionEm;
	miEmpresa.ciudadEm=$scope.ciudadEm;
	miEmpresa.telefonoFijo=$scope.telefonoFijo;
	miEmpresa.telefonoCelular=$scope.telefonoCelular;
	miEmpresa.correoEm=$scope.correoEm;
	miEmpresa.sitiWeb=$scope.sitiWeb;
	miEmpresa.tipoEm=$scope.tipoEm;
	miEmpresa.tipoVenta=$scope.tipoVenta;
	miEmpresa.registroM=$scope.registroM;
	miEmpresa.numRegistro=$scope.numRegistro;
	miEmpresa.anoRenova=$scope.anoRenova;


	miEmpresa.ciiu=$scope.ciiu;
	miEmpresa.actividadI=$scope.actividadI;
	miEmpresa.paisesCome=$scope.paisesCome;
	miEmpresa.inter=$scope.inter;
	miEmpresa.medioCde=$scope.medioCde;
	miEmpresa.serviciosEmpre=$scope.serviciosEmpre;
	miEmpresa.observaciones=$scope.observaciones;


	localStorageService.set("miEmpresa",miEmpresa);

var cant=0;
for(i in miEmpresa){

 	var obj=miEmpresa[i];
 	console.log(obj);
 	 if((obj=="" || obj==undefined)){
 		cant++;
 		console.log("vacios "+(cant))
		$scope.btnRegistrarEmpE=true;
	}
 }

 if(cant==7){
 	$scope.btnRegistrarEmpE=false;
 }

	

}

$scope.reestablecerDatos=function(datos){
	//var datos =JSON.parse(datos1);
$scope.$apply(function(){
$scope.clasificacion=datos.clasificacion;
$scope.cedula=datos.cedula;
$scope.apellidos=datos.apellidos;
$scope.nombres=datos.nombres;
$scope.cargo=datos.cargo;
$scope.antiguedad=datos.antiguedad;
$scope.fechaN=datos.fechaN;
$scope.lugarN=datos.lugarN;
$scope.nivelEstudio=datos.nivelEstudio;
$scope.direccion=datos.direccion;
$scope.telefonoF=datos.telefonoF;
$scope.telefonoC=datos.telefonoC;
$scope.ciudad=datos.ciudad;
$scope.departamento=datos.departamento;
$scope.genero=datos.genero;
$scope.correo=datos.correo;
$scope.grupoE=datos.grupoE;
$scope.condicionD=datos.condicionD;

$scope.nombreE=datos.nombreE;
$scope.nit=datos.nit;
$scope.nombreR=datos.nombreR;
$scope.constitucion=datos.constitucion;
$scope.fechaC=datos.fechaC;
$scope.tc=datos.tc;
$scope.mt=datos.mt;
$scope.directos=datos.directos;
$scope.indirectos=datos.indirectos;
$scope.direccionEm=datos.direccionEm;
$scope.ciudadEm=datos.ciudadEm;
$scope.telefonoFijo=datos.telefonoFijo;
$scope.telefonoCelular=datos.telefonoCelular;
$scope.correoEm=datos.correoEm;
$scope.sitiWeb=datos.sitiWeb;
$scope.tipoEm=datos.tipoEm;
$scope.tipoVenta=datos.tipoVenta;
$scope.registroM=datos.registroM;
$scope.numRegistro=datos.numRegistro;
$scope.anoRenova=datos.anoRenova;

$scope.ciiu=datos.ciiu;
$scope.actividadI=datos.actividadI;
$scope.paisesCome=datos.paisesCome;
$scope.inter=datos.inter;
$scope.medioCde=datos.medioCde;
$scope.serviciosEmpre=datos.serviciosEmpre;
$scope.observaciones=datos.observaciones;

var cant=0;
for(i in datos){

 	var obj=datos[i];
 	console.log(obj);
 	cant++;
 }
 if(cant<=37){
 		
 		console.log("vacios "+(cant))
		$scope.btnRegistrarEmpE=true;
	}else if(cant==38){
		$scope.btnRegistrarEmpE=false;
	}


});



}



$scope.registrarEmpresa=function(){  

	usSpinnerService.spin('spinner-1');
     $http.post("servicesMincit/registrarEmpresa.php",{'nombres':$scope.nombres,'cedula':$scope.cedula,'nivelEstudios':$scope.nivelEstudio,'apellidos':$scope.apellidos, 'cedula':$scope.cedula,'correo':$scope.correo, 
			'genero':$scope.genero,'cargo':$scope.cargo, 'antiguedadCargo':$scope.antiguedad,'telefonoF':$scope.telefonoF, 'telefonoC':$scope.telefonoC,'lugarNacimiento':$scope.lugarN,
			'direccion':$scope.direccion,'fechaNacimiento':$scope.fechaN ,'ciudad':$scope.ciudad, 'departamento':$scope.departamento,'grupoEtnico':$scope.grupoE,'condicionDesplazamiento':$scope.condicionD,'fecha':$scope.fecha,
		    'nombreE':$scope.nombreE,'nombreR':$scope.nombreR ,'nit':$scope.nit, 'fechaC':$scope.fechaC,'tc':$scope.tc,'mt':$scope.mt,'directos':$scope.directos,'indirectos':$scope.indirectos,
		    'direccionEm':$scope.direccionEm,'ciudadEm':$scope.ciudadEm,'telefonoFijo':$scope.telefonoFijo, 'telefonoCelular':$scope.telefonoCelular,'correoEm':$scope.correoEm,'tipoEm':$scope.tipoEm,
		    'tipoVenta':$scope.tipoVenta,'registroM':$scope.registroM,'constitucion':$scope.constitucion,'sitioWeb':$scope.sitiWeb,'anoRenova':$scope.anoRenova,'ciiu':$scope.ciiu,'actividadI':$scope.actividadI,
		    'inter':$scope.inter,'paisesCome':$scope.paisesCome,'serviciosEmpre':$scope.serviciosEmpre,'medioCde':$scope.medioCde,'observaciones':$scope.observaciones,'numRegistro':$scope.numRegistro,'clasificacion':$scope.clasificacion})
		.success(function(data){
			usSpinnerService.stop('spinner-1');
			if(data){
			localStorageService.remove("miEmpresa");
			swal(
      			'Exito',
     			 'La empresa fue registrada',
    			  'success'
   				 );
				$location.path("/Asesor_inicio");
			}
		}).error(function(err){
			usSpinnerService.stop('spinner-1');
           console.log(err);

    });
	
	}




		$scope.buscarContacto=function(){
		usSpinnerService.spin('spinner-1');
		$http.post("servicesMincit/buscarContacto.php",{'cedula':$scope.cedula})
		.success(function(data){
			console.log(data);
			usSpinnerService.stop('spinner-1');
			if(data!=0){
			swal(
      			'Exito',
     			 'Se encontro un contacto previamente registrado. Cargando sus datos',
    			  'success'
   				 );
			$scope.nombres=data[0].nombres;
			$scope.apellidos=data[0].apellidos;
			$scope.cargo=data[0].cargo;
			$scope.direccion=data[0].direccion;
			$scope.ciudad=data[0].ciudad;
			$scope.departamento=data[0].departamento;
			$scope.telefonoF=data[0].telefonoF;
			$scope.telefonoC=data[0].telefonoC;
			$scope.correo=data[0].correo;
			$scope.genero=data[0].genero;
		}else{
			swal(
      			'Aviso',
     			 'No se encontro un contacto asociado a la cédula consultada',
    			  'error'
   				 );
			}

		}).error(function(err){
      	usSpinnerService.stop('spinner-1');
        console.log(err);

    });

	}


  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])

app.controller('controllerEmpresaT_Asesor', ['$scope', '$http', 'cerrarSesion', function($scope, $http, cerrarSesion){

/*
     $http.post("servicesMincit/registrarEmpresa.php",{'nombres':$scope.nombres,'cedula':$scope.cedula,'nivelEstudios':$scope.nivelEstudio,'apellidos':$scope.apellidos, 'cedula':$scope.cedula,'correo':$scope.correo, 
			'genero':$scope.genero,'cargo':$scope.cargo, 'antiguedadCargo':$scope.antiguedad,'telefonoF':$scope.telefonoF, 'telefonoC':$scope.telefonoC,'lugarNacimiento':$scope.lugarN,
			'direccion':$scope.direccion,'fechaNacimiento':$scope.fechaN ,'ciudad':$scope.ciudad, 'departamento':$scope.departamento,'grupoEtnico':$scope.grupoE,'condicionDesplazamiento':$scope.condicionD,'fecha':$scope.fecha,
		    'nombreE':$scope.nombreE,'nombreR':$scope.nombreR ,'nit':$scope.nit, 'fechaC':$scope.fechaC,'tc':$scope.tc,'mt':$scope.mt,'directos':$scope.directos,'indirectos':$scope.indirectos,
		    'direccionEm':$scope.direccionEm,'ciudadEm':$scope.ciudadEm,'telefonoFijo':$scope.telefonoFijo, 'telefonoCelular':$scope.telefonoCelular,'correoEm':$scope.correoEm,'tipoEm':$scope.tipoEm,
		    'tipoVenta':$scope.tipoVenta,'registroM':$scope.registroM,'constitucion':$scope.constitucion,'sitioWeb':$scope.sitiWeb,'anoRenova':$scope.anoRenova,'ciiu':$scope.ciiu,'actividadI':$scope.actividadI,
		    'inter':$scope.inter,'paisesCome':$scope.paisesCome,'serviciosEmpre':$scope.serviciosEmpre,'medioCde':$scope.medioCde,'observaciones':$scope.observaciones,'numRegistro':$scope.numRegistro,'clasificacion':$scope.clasificacion})
		.success(function(data){
			if(data){
			alert("registro exitoso");
			
			}
		})	
	
*/

	$scope.buscarContacto=function(){
		
		$http.post("servicesMincit/buscarContacto.php",{'cedula':$scope.cedula})
		.success(function(data){
			if(data!=undefined){
			alert("busqueda exitosa")
			$scope.nombres=data[0].nombres;
			$scope.apellidos=data[0].apellidos;
			$scope.cargo=data[0].cargo;
			$scope.direccion=data[0].direccion;
			$scope.ciudad=data[0].ciudad;
			$scope.departamento=data[0].departamento;
			$scope.telefonoF=data[0].telefonoF;
			$scope.telefonoC=data[0].telefonoC;
			$scope.correo=data[0].correo;
			$scope.genero=data[0].genero;
		}else{
			alert("Contacto no encontrado")
			}

		})
	}

  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])


app.controller('controllerContacto_Asesor', ['$scope', '$http', 'cerrarSesion', function($scope, $http, cerrarSesion){

   $scope.registrarContacto=function(){
  
		$http.post("servicesMincit/registrarContacto.php",{'nombres':$scope.nombres, 'apellidos':$scope.apellidos, 'cedula':$scope.cedula,'correo':$scope.correo, 
			'genero':$scope.genero,'cargo':$scope.cargo, 'recibirC':$scope.recibirC,'numTelefono':$scope.numTelefono, 'numCelular':$scope.numCelular,'cde':$scope.cde,
			'direccion':$scope.direccion,'ciudad':$scope.ciudad, 'departamento':$scope.departamento,'pais':$scope.pais,'notas':$scope.notas,'fecha':$scope.fecha})
		.success(function(data){
			if(data){
			alert("registro exitoso");
			
			}
		

		})

	}
	
  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])



app.controller('controllerConfiguraciones_Asesor', ['$scope', 'cerrarSesion', function($scope, cerrarSesion){


  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
  }])
