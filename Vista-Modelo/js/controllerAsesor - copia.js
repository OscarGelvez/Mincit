var app=angular.module('mincit.controllersAsesor',['LocalStorageModule']);


app.run([ "CONFIG", "$http", function(CONFIG, $http)
{

  var sesion;
function verificar(){

  $http.get('servicesMincit/Sesiones/verificaSession.php')
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


$scope.currentPage = 0;
$scope.pageSize = 3; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];


$scope.mostrarEmpre=function(){
	usSpinnerService.spin('spinner-1');
		$http.get("servicesMincit/Asesor/listarEmpresas.php")
		.success(function(data){
			usSpinnerService.stop('spinner-1');
			$scope.empresas=data
			$scope.configPages();
		})
	}
   
	$scope.mostrarEmpre();


$scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.empresas.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.empresas.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.empresas.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.empresas.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.empresas.length / $scope.pageSize);
            }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
            $scope.pages.push({no: i});
        }

        if ($scope.currentPage >= $scope.pages.length)
            $scope.currentPage = $scope.pages.length - 1;
    };

    $scope.setPage = function(index) {
        $scope.currentPage = index - 1;
    };



  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }

}]).filter('startFromGrid', function() {

   return function(input, start) {
   	if(input!=undefined){
		 start =+ start;
        return input.slice(start);
	}
   
    }
});


app.controller('controllerEmpresaE_Asesor', ['$scope', '$http', 'cerrarSesion', 'localStorageService', 'usSpinnerService', '$location', 'upload', function($scope, $http, cerrarSesion, localStorageService, usSpinnerService, $location, upload){

var datos_usuarios=localStorageService.get("usuarioActual");


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

$scope.cargarComboDpto=function(){
	$http.get('servicesMincit/Asesor/cargaCombo_Dptos.php')

		.success(function(data) {
              console.log(data);

              if(data!=0){
              	 $scope.dptosCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
}
$scope.cargarComboDpto();


$scope.cargarComboCiudad=function(){
	$http.post('servicesMincit/Asesor/cargaCombo_Ciudades.php',{
				dpto_select:$scope.id_dpto_seleccionado
			}).success(function(data) {
              console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
}

$scope.cargarComboCiudad2=function(){
	$http.post('servicesMincit/Asesor/cargaCombo_Ciudades.php',{
				dpto_select:$scope.id_dpto_seleccionado2
			}).success(function(data) {
              console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo2=data;
              	
              }       
                   
             })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
}

//en caso contrario espero el evento change para mostrar el campo oculto

$('#constitucion_legal').bind('change', function() {

var cons= document.getElementById("constitucion_legal").value;

if(cons=="Otra"){
	$scope.otra_activa=true;
	
}else{
	$scope.otra_activa=false;
	$scope.constitucion2="";
}

});

//En caso de que seleccione comercial y seguidamente elija opcion Otra
$('#tipoEm').bind('change', function() {

var cons= document.getElementById("tipoEm").value;

if(cons=="Otra"){
	$scope.comercial_otra_activa=true;
	
}else{
	$scope.comercial_otra_activa=false;
	$scope.tipoEm2="";
}

});


//En caso de que seleccione comercial y seguidamente elija opcion Otra
$('#tipoEm').bind('change', function() {

var cons= document.getElementById("tipoEm").value;

if(cons=="Comercial"){
	$scope.comercial_activa=true;
	
}else{
	$scope.comercial_activa=false;
	$scope.tipoEm3="";
}

});

//En caso de que seleccione otro medio por cual se entero 
$('#medioCde').bind('change', function() {

var cons= document.getElementById("medioCde").value;

if(cons=="Otro"){
	$scope.medioCde_otro_activo=true;
	
}else{
	$scope.medioCde_otro_activo=false;
	$scope.medioCde2="";
}

});

//Para saber cuando selecciona un depto 
$('#dptoContacto').click(function(e) {

var cons= document.getElementById("dptoContacto").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
	if($scope.dptosCombo[i].nombre==$scope.departamento){
		$scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
		$scope.cargarComboCiudad();
	}
	
};


});

$('#dptoEmpresa').click(function(e) {

var cons= document.getElementById("dptoEmpresa").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
	if($scope.dptosCombo[i].nombre==$scope.dptoEm){
		$scope.id_dpto_seleccionado2=$scope.dptosCombo[i].id;
		$scope.cargarComboCiudad2();
	}
	
};


});




$scope.$watch('registroM', function(newVal, oldVal){
                       console.log("Search was changed to:"+newVal);
    
                                 if($scope.registroM=="si"){
									$scope.tiene_rm=true;

											if($scope.numRegistro==0){
												$scope.numRegistro="";
												$scope.anoRenova=="";
												}
									
	
									}else{
										$scope.tiene_rm=false;
										$scope.numRegistro=0;
										$scope.anoRenova=0;
									}
    
                                 // $scope.watch =$scope.ver;
       
                        });





$(window).bind('beforeunload',function(){
return '¿Está seguro de recargar y perder los datos que no han sido guardados?';
});


 $scope.ir=function(i){
             var stepName = "step" + i;
            $("#" + stepName).hide();
            $("#step" + (i)).show();
            selectStep(i);
        }
function selectStep(i) {
            $("#steps li").removeClass("current");
            $("#stepDesc" + i).addClass("current");
        }        


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
	miEmpresa.discapacidad=$scope.discapacidad;

	miEmpresa.nombreE=$scope.nombreE;
	miEmpresa.nit=$scope.nit;
	miEmpresa.nombreR=$scope.nombreR;
	miEmpresa.constitucion=$scope.constitucion;
	miEmpresa.constitucion2=$scope.constitucion2;
	miEmpresa.fechaC=$scope.fechaC;
	miEmpresa.tc=$scope.tc;
	miEmpresa.mt=$scope.mt;
	miEmpresa.directos=$scope.directos;
	miEmpresa.indirectos=$scope.indirectos;
	miEmpresa.direccionEm=$scope.direccionEm;
	miEmpresa.dptoEm=$scope.dptoEm;
	miEmpresa.ciudadEm=$scope.ciudadEm;
	miEmpresa.telefonoFijo=$scope.telefonoFijo;
	miEmpresa.telefonoCelular=$scope.telefonoCelular;
	miEmpresa.correoEm=$scope.correoEm;
	miEmpresa.sitioWeb=$scope.sitioWeb;
	miEmpresa.tipoEm=$scope.tipoEm;
	miEmpresa.tipoEm2=$scope.tipoEm2;
	miEmpresa.tipoEm3=$scope.tipoEm3;
	miEmpresa.tipoVenta=$scope.tipoVenta;
	miEmpresa.registroM=$scope.registroM;
	miEmpresa.numRegistro=$scope.numRegistro;
	miEmpresa.anoRenova=$scope.anoRenova;


	miEmpresa.ciiu=$scope.ciiu;
	miEmpresa.actividadI=$scope.actividadI;
	miEmpresa.paisesCome=$scope.paisesCome;
	miEmpresa.neg_internet=$scope.neg_internet;
	miEmpresa.medioCde=$scope.medioCde;
	miEmpresa.medioCde2=$scope.medioCde2;
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
		$scope.subeLogo=true;
	}
 }

 if(cant==7){
 	$scope.btnRegistrarEmpE=false;
 }

  if(cant==0){
 	$scope.subeLogo=false;
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
$scope.discapacidad=datos.discapacidad;

$scope.nombreE=datos.nombreE;
$scope.nit=datos.nit;
$scope.nombreR=datos.nombreR;
$scope.constitucion=datos.constitucion;
$scope.constitucion2=datos.constitucion2;
$scope.fechaC=datos.fechaC;
$scope.tc=datos.tc;
$scope.mt=datos.mt;
$scope.directos=datos.directos;
$scope.indirectos=datos.indirectos;
$scope.direccionEm=datos.direccionEm;
$scope.dptoEm=datos.dptoEm;
$scope.ciudadEm=datos.ciudadEm;
$scope.telefonoFijo=datos.telefonoFijo;
$scope.telefonoCelular=datos.telefonoCelular;
$scope.correoEm=datos.correoEm;
$scope.sitioWeb=datos.sitioWeb;
$scope.tipoEm=datos.tipoEm;
$scope.tipoEm2=datos.tipoEm2;
$scope.tipoEm3=datos.tipoEm3;
$scope.tipoVenta=datos.tipoVenta;
$scope.registroM=datos.registroM;
$scope.numRegistro=datos.numRegistro;
$scope.anoRenova=datos.anoRenova;

$scope.ciiu=datos.ciiu;
$scope.actividadI=datos.actividadI;
$scope.paisesCome=datos.paisesCome;
$scope.neg_internet=datos.neg_internet;
$scope.medioCde=datos.medioCde;
$scope.medioCde2=datos.medioCde2;
$scope.serviciosEmpre=datos.serviciosEmpre;
$scope.observaciones=datos.observaciones;

/*var cant=0;
for(i in datos){

 	var obj=datos[i];
 	console.log(obj);
 	cant++;
 }
 if(cant<=39){
 		
 		console.log("vacios "+(cant))
		$scope.btnRegistrarEmpE=true;
		$scope.subeLogo=true;
	}else if(cant==40){
		$scope.btnRegistrarEmpE=false;

	}else if(cant==47){
		$scope.subeLogo=false;
	}

*/
});

//lo hace siempre por si el dato quedo guardado se muestre correctamente
var cons= document.getElementById("constitucion_legal").value;

if(cons=="Otra"){
	$scope.otra_activa=true;
	
}else{
	$scope.otra_activa=false;
	$scope.constitucion2="";
}
////////////////////////////////////////////////////////////////////////////
////lo hace siempre por si el dato quedo guardado se muestre correctamente
var tipoEm= document.getElementById("tipoEm").value;

if(tipoEm=="Otra"){
	$scope.comercial_otra_activa=true;
	
}else{
	$scope.comercial_otra_activa=false;
	$scope.tipoEm2="";
}
////////////////////////////////////////////////////

var tipoEm2= document.getElementById("tipoEm").value;

if(tipoEm2=="Comercial"){
	$scope.comercial_activa=true;
	
}else{
	$scope.comercial_activa=false;
	$scope.tipoEm3="";
}
////////////////////////////////////////////////////////////////////////////
var mediocentero= document.getElementById("medioCde").value;

if(mediocentero=="Otro"){
	$scope.medioCde_otro_activo=true;
	
}else{
	$scope.medioCde_otro_activo=false;
	$scope.edioCde2="";
}

}


// hay 47 datos enviandose
// hay 48 datos q se estan guardando
$scope.registrarEmpresa=function(){  

//Validaciones campos con opcion "Otro" o "Cual"
     if($scope.constitucion=="Otra"){
     	$scope.constitucion=$scope.constitucion2;
     }
     if($scope.tipoEm=="Otra"){
     	$scope.tipoEm=$scope.tipoEm2;
     }
     if($scope.tipoEm=="Comercial"){
     	$scope.tipoEm=$scope.tipoEm3;
     }

	usSpinnerService.spin('spinner-1');
     $http.post("servicesMincit/Asesor/registrarEmpresa.php",
     	{
     		//Clasificacion de clientes
     		'clasificacion':$scope.clasificacion,
        //Datos de contacto
     		
			'id_usuario_registro':datos_usuarios.id_usuario,

			'cedula':$scope.cedula,
			'nombres':$scope.nombres,
			'apellidos':$scope.apellidos,
			'cargo':$scope.cargo,
			'antiguedadCargo':$scope.antiguedad,
			'fechaNacimiento':$scope.fechaN,
			'lugarNacimiento':$scope.lugarN,
			'nivelEstudios':$scope.nivelEstudio,
			'direccion':$scope.direccion,
			'telefonoF':$scope.telefonoF,
			'telefonoC':$scope.telefonoC,			
			'departamento':$scope.departamento,
			'ciudad':$scope.ciudad,
			'genero':$scope.genero,
			'correo':$scope.correo,
			'grupoEtnico':$scope.grupoE,
			'condicionDesplazamiento':$scope.condicionD,
			'discapacidad':$scope.discapacidad,
			
			//Datos de la empresa
			//'fecha':$scope.fecha,
		    'nombreE':$scope.nombreE,
		    'nit':$scope.nit,
		    'nombreR':$scope.nombreR,
		    'constitucion':$scope.constitucion,
		    'fechaC':$scope.fechaC,
		    'tc':$scope.tc,
		    'mt':$scope.mt,
		    'directos':$scope.directos,
		    'indirectos':$scope.indirectos,
		    'direccionEm':$scope.direccionEm,
		    'ciudadEm':$scope.ciudadEm,
		    'dptoEm':$scope.dptoEm,
		    'telefonoFijo':$scope.telefonoFijo,
		    'telefonoCelular':$scope.telefonoCelular,
		    'correoEm':$scope.correoEm,
		    'sitioWeb':$scope.sitioWeb,
		    'tipoEm':$scope.tipoEm,
            'registroM':$scope.registroM,
		    'numRegistro':$scope.numRegistro,		    
		    'anoRenova':$scope.anoRenova,
		    'ciiu':$scope.ciiu,
		    'actividadI':$scope.actividadI,
		    'paisesCome':$scope.paisesCome,
		    'negocio_internet':$scope.neg_internet,		    
		    'serviciosEmpre':$scope.serviciosEmpre,
		    'medioCde':$scope.medioCde,
		    'observaciones':$scope.observaciones
		    //'url_logo':$scope.urlLogo
		    
		    }).success(function(data){
		    	console.log(data);
			usSpinnerService.stop('spinner-1');
			if(data==1){
			//localStorageService.remove("miEmpresa");
			swal(
      			'Exito',
     			 'La empresa fue registrada exitosamente',
    			  'success'
   				 );
				$location.path("/Asesor_inicio");
			}else if(data==5){
				swal('Error',
     			 'La empresa no fue registrada, puesto que su Nit ya existe en el sistema. Verifique e intente nuevamente',
    			  'error'
   				 );
			}
			else if(data==4){
				swal('Error',
     			 'Se presento un error en la inserción o actualización del contacto',
    			  'error'
   				 );
			}
			else if(data==2 || data==3){
				swal('Error',
     			 'La empresa no fue registrada, Inténtelo nuevamente',
    			  'error'
   				 );
			}
		}).error(function(err){
			usSpinnerService.stop('spinner-1');
           console.log(err);

    });
	
	}




		$scope.buscarContacto=function(){
		usSpinnerService.spin('spinner-1');
		$http.post("servicesMincit/Asesor/buscarContacto.php",{'cedula':$scope.cedula})
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
    localStorageService.remove("usuarioActual");
   cerrarSesion.cerrar();
  }


$('#logo').bind('change', function() {

 //this.files[0].size gets the size of your file.
 //alert((this.files[0].size)/1000);
 $scope.tam=(this.files[0].size)/1000;

});

$('#logo').bind('change', function() {

 //this.files[0].size gets the size of your file.
//alert((this.files[0].type));
$scope.aux=this.files[0].type;
$scope.tipo=$scope.aux.split("/");
	if($scope.tipo[1]=="jpeg"){
	  	$scope.tipo[1]="jpg";
	  }
  console.log("tipo "+$scope.tipo[1]);
});


$scope.subirLogo=function(){

	if($scope.tam>100){
			swal({
  				title: 'Error Peso Exedido',
  				text: 'El peso de la imagen seleccionada supera los 100KB',
  				type: 'warning',
 				 timer: 2000
				})				
		}else{
			
				var name = $scope.nit;
				var file = $scope.file;
				
				upload.uploadFile(file, name).then(function(res)
				{
					console.log(res);
					if(res.data==1){
						console.log("es 1. salio bien");
						console.log("La ruta de la img es: "+"http://localhost/proyectoWeb/LogosEmpresas/"+name+"."+$scope.tipo[1])
						$scope.urlLogo="http://localhost/proyectoWeb/LogosEmpresas/"+name+"."+$scope.tipo[1];
					}else{
						console.log("es 0. Algo salio mal");
					}
				})
		}
		
}


}])

app.controller('controllerEmpresaT_Asesor', ['$scope', '$http', 'cerrarSesion', function($scope, $http, cerrarSesion){






	$scope.buscarContacto=function(){
		
		$http.post("servicesMincit/Asesor/buscarContacto.php",{'cedula':$scope.cedula})
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
  
		$http.post("servicesMincit/Asesor/registrarContacto.php",{'nombres':$scope.nombres, 'apellidos':$scope.apellidos, 'cedula':$scope.cedula,'correo':$scope.correo, 
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
