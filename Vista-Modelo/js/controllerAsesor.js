var app=angular.module('mincit.controllersAsesor',['LocalStorageModule']);


app.run([ "CONFIG", "$http", function(CONFIG, $http)
{

  var sesion;
function verificar(){

  $http.get('Modelo/servicesMincit/Sesiones/verificaSession.php')
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



app.controller('controllerInicio_Asesor', ['$scope', '$http', 'usSpinnerService', 'cerrarSesion', function($scope, $http, usSpinnerService, cerrarSesion){
$scope.tipo_busqueda_inicio="Empresas";
$scope.tipo_filter=true; //Si es true por defecto carga los filtros para empresa
$scope.currentPage = 0;
$scope.pageSize = 3; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];
$scope.filtro= new Object();
$scope.paginacionDinamica="empresas";


$scope.mostrarEmpre=function(){
	usSpinnerService.spin('spinner-1');
		$http.get("Modelo/servicesMincit/Asesor/listarEmpresas.php")
		.success(function(data){
			usSpinnerService.stop('spinner-1');
			$scope.empresas=data

			for (var i = 0; i < $scope.empresas.length; i++) {
				if($scope.empresas[i].tipo_emp=="t"){
					$scope.empresas[i].tipo_emp="Turística"
				}else if($scope.empresas[i].tipo_emp=="e"){
					$scope.empresas[i].tipo_emp="Emprendedora"
				}
			};
			console.log($scope.empresas);

			$scope.configPages($scope.empresas);
			$scope.cargarComboDpto();

		})
	}
   
	$scope.mostrarEmpre();

$scope.mostrarContactos=function(){
usSpinnerService.spin('spinner-1');
	$http.get("Modelo/servicesMincit/Asesor/listarContactos.php")
	.success(function(data){
		usSpinnerService.stop('spinner-1');
		$scope.contactos=data	
		for (var i = 0; i < $scope.contactos.length; i++) {
				if($scope.contactos[i].cde==""){
					$scope.contactos[i].cde="Pendiente Actualizar" // indica que el contacto fue registrado directamente desde el reg. empresa y no existia con anterioridad
				}
			};

		console.log($scope.contactos);
		$scope.configPages($scope.contactos);
		

	})
}
   
	$scope.mostrarContactos();

	$scope.cargarComboDpto=function(){
	$http.get('Modelo/servicesMincit/Asesor/cargaCombo_Dptos.php')

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

$('#dptoEmpFilter').click(function(e) {

var cons= document.getElementById("dptoEmpFilter").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
	if($scope.dptosCombo[i].nombre==$scope.dptoFilter){
		$scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
		$scope.cargarComboCiudad();
	}
	
};


});

$scope.$watch('filtro.nombreEmpFilter', function(newVal, oldVal){
 console.log("nombreEmpFilter changed to:"+newVal);
    

});

//Escuchador que permite mostrar u ocultar los filtros para buscar en el inicio
$scope.$watch('tipo_busqueda_inicio', function(newVal, oldVal){
 console.log("tipo_busqueda_inicio changed to:"+newVal);
    
 if($scope.tipo_busqueda_inicio=="Empresas"){
	$scope.tipo_filter=true;
	$scope.paginacionDinamica="empresas";
	}else{
		$scope.tipo_filter=false;	
		$scope.paginacionDinamica="contactos"	
	}
});
$scope.cargarComboCiudad=function(){
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
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


$scope.borrarFiltros=function(){	
alert("borro")
	 $scope.filtro.nombreEmpFilter="";
	 $scope.filtro.NitEmpFilter="";
	 $scope.filtro.constitucionFilter="";
	 $scope.filtro.tipoEmpFilter="";
	 $scope.filtro.clasificFilter="";
	
		$scope.filtro.nombreContFilter="";
		$scope.filtro.cedulaContFilter="";
		$scope.filtro.cdeFilter="";
	

	 
	 $scope.dptoFilter="";
	 $scope.ciudadFilter="";
}


//Metodo llamado desde Empresas
$scope.configPages = function(objeto) {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil(objeto.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil(objeto.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil(objeto.length / $scope.pageSize) - 10) {
                ini = Math.ceil(objeto.length / $scope.pageSize) - 10;
                fin = Math.ceil(objeto.length / $scope.pageSize);
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
var tama=0;
$scope.auxiliar= new Object();

$scope.requerido=false;
var datos_usuarios=localStorageService.get("usuarioActual");
if(localStorageService.get("miEmpresa")!=undefined){
	 $scope.emp=localStorageService.get("miEmpresa");

	 tama=Object.keys(localStorageService.get("miEmpresa")).length;

	 if($scope.emp.numRegistro=="" && $scope.emp.anoRenova=="" && tama==2){
	 	tama=0;
	 	console.log("if")
	 }else{
	 	
	 	console.log("else")
	 }
	 
}else{
	tama=0;
}

console.log(tama);
if(localStorageService.get("miEmpresa")!="vacio" && tama!=0){
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
   	//var miEmpresa= new Object();
	localStorageService.set("miEmpresa","vacio");
  //localStorageService.remove("miEmpresa");
    swal({
      title: 'Nuevo Registro',
      text: 'Iniciando un nuevo registro',
      type: 'success',
      timer: 2000
    });

  }
})

}

$scope.cargarComboDpto=function(){
	$http.get('Modelo/servicesMincit/Asesor/cargaCombo_Dptos.php')

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
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
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
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
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

//en caso de que seleccione empresa formal el campo nit se vuelve requerido
$scope.$watch('clasificacion', function(newVal, oldVal){
 console.log("clasificacion changed to:"+newVal);
    
 if($scope.clasificacion=="Empresa Formal"){
	$scope.requerido=true;
	
	}else{
		$scope.requerido=false;
	
		
	}
});

//en caso contrario espero el evento change para mostrar el campo oculto

$('#constitucion_legal').bind('change', function() {

var cons= document.getElementById("constitucion_legal").value;

if(cons=="Otra"){
	$scope.otra_activa=true;
	
}else{
	$scope.otra_activa=false;
	$scope.auxiliar.constitucion2="";
}

});

//En caso de que seleccione comercial y seguidamente elija opcion Otra
$('#tipoEm').bind('change', function() {

var cons= document.getElementById("tipoEm").value;

if(cons=="Otra"){
	$scope.comercial_otra_activa=true;
	
	
}else{
	$scope.comercial_otra_activa=false;
	$scope.auxiliar.tipoEm2="";


}

});


//En caso de que seleccione comercial y seguidamente elija opcion Otra
$('#tipoEm').bind('change', function() {

var cons= document.getElementById("tipoEm").value;

if(cons=="Comercial"){
	$scope.comercial_activa=true;
	
}else{
	$scope.comercial_activa=false;
	$scope.auxiliar.tipoEm3="";
}

});

//En caso de que seleccione otro medio por cual se entero 
$('#medioCde').bind('change', function() {

var cons= document.getElementById("medioCde").value;

if(cons=="Otro"){
	$scope.medioCde_otro_activo=true;
	
}else{
	$scope.medioCde_otro_activo=false;
	$scope.auxiliar.medioCde2="";
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

											if($scope.auxiliar.numRegistro==0){
												$scope.auxiliar.numRegistro="";
												$scope.auxiliar.anoRenova="";
												}
									
	
									}else{
										$scope.tiene_rm=false;
										$scope.auxiliar.numRegistro="";
										$scope.auxiliar.anoRenova="";
										
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
	miEmpresa.constitucion2=$scope.auxiliar.constitucion2;
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
	miEmpresa.tipoEm2=$scope.auxiliar.tipoEm2;
	miEmpresa.tipoEm3=$scope.auxiliar.tipoEm3;
	miEmpresa.registroM=$scope.registroM;
	miEmpresa.numRegistro=$scope.auxiliar.numRegistro;
	miEmpresa.anoRenova=$scope.auxiliar.anoRenova;


	miEmpresa.ciiu=$scope.ciiu;
	miEmpresa.actividadI=$scope.actividadI;
	miEmpresa.paisesCome=$scope.paisesCome;
	miEmpresa.neg_internet=$scope.neg_internet;
	miEmpresa.medioCde=$scope.medioCde;
	miEmpresa.medioCde2=$scope.auxiliar.medioCde2;
	miEmpresa.serviciosEmpre=$scope.serviciosEmpre;
	miEmpresa.observaciones=$scope.observaciones;


	localStorageService.set("miEmpresa",miEmpresa);

var cant=0;
for(i in miEmpresa){

 	var obj=miEmpresa[i];
 	//console.log(obj);
 	 if((obj=="" || obj==undefined)){
 		cant++;
 		//console.log("vacios "+(cant))
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
$scope.auxiliar.constitucion2=datos.constitucion2;
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
$scope.auxiliar.tipoEm2=datos.tipoEm2;
$scope.auxiliar.tipoEm3=datos.tipoEm3;
$scope.registroM=datos.registroM;
$scope.auxiliar.numRegistro=datos.numRegistro;
$scope.auxiliar.anoRenova=datos.anoRenova;

$scope.ciiu=datos.ciiu;
$scope.actividadI=datos.actividadI;
$scope.paisesCome=datos.paisesCome;
$scope.neg_internet=datos.neg_internet;
$scope.medioCde=datos.medioCde;
$scope.auxiliar.medioCde2=datos.medioCde;
$scope.auxiliar.medioCde2=datos.medioCde2;
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
	$scope.auxiliar.constitucion2="";
}
////////////////////////////////////////////////////////////////////////////
////lo hace siempre por si el dato quedo guardado se muestre correctamente
var tipoEm= document.getElementById("tipoEm").value;

if(tipoEm=="Otra"){
	$scope.comercial_otra_activa=true;
	
}else{
	$scope.comercial_otra_activa=false;
	$scope.auxiliar.tipoEm2="";
}
////////////////////////////////////////////////////

var auxtipoEm2= document.getElementById("tipoEm").value;

if(auxtipoEm2=="Comercial"){
	$scope.comercial_activa=true;
	
}else{
	$scope.comercial_activa=false;
	$scope.auxiliar.tipoEm3="";
}
////////////////////////////////////////////////////////////////////////////
var mediocentero= document.getElementById("medioCde").value;

if(mediocentero=="Otro"){
	$scope.medioCde_otro_activo=true;
	
}else{
	$scope.medioCde_otro_activo=false;
	$scope.auxiliar.medioCde2="";
}

}

$scope.registrarEmpresa=function(){
	$scope.subirLogo();
}

// hay 47 datos enviandose
// hay 48 datos q se estan guardando
$scope.registrarEmpresa2=function(hayLogo){  

//Validaciones campos con opcion "Otro" o "Cual"
//alert("$scope.constitucion "+$scope.constitucion);
     if($scope.constitucion=="Otra"){
     	$scope.constitucion=$scope.auxiliar.constitucion2;
//alert("$scope.constitucion "+$scope.constitucion);

     }
     
     if($scope.tipoEm=="Otra"){
     	//alert("tipoEm "+$scope.tipoEm);
     	$scope.tipoEm=$scope.auxiliar.tipoEm2;
     	//alert("tipoEm "+$scope.tipoEm);
     }
     if($scope.tipoEm=="Comercial"){
     	//alert("tipoEm "+$scope.tipoEm);
     	$scope.tipoEm=$scope.auxiliar.tipoEm3;
     	//alert("tipoEm "+$scope.tipoEm);
     } 
     if($scope.medioCde=="Otro"){
     	//alert("medio cde "+$scope.medioCde);
     	$scope.medioCde=$scope.auxiliar.medioCde2;
     	//alert("medio cde "+$scope.medioCde);
     }
     
	usSpinnerService.spin('spinner-1');
     $http.post("Modelo/servicesMincit/Asesor/registrarEmpresaE.php",
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
		    'numRegistro':$scope.auxiliar.numRegistro,		    
		    'anoRenova':$scope.auxiliar.anoRenova,
		    'ciiu':$scope.ciiu,
		    'actividadI':$scope.actividadI,
		    'paisesCome':$scope.paisesCome,
		    'negocio_internet':$scope.neg_internet,		    
		    'serviciosEmpre':$scope.serviciosEmpre,
		    'medioCde':$scope.medioCde,
		    'observaciones':$scope.observaciones,
		    'url_logo':$scope.urlLogo
		    
		    }).success(function(data){
		    	console.log(data);
			usSpinnerService.stop('spinner-1');
			if(data==1){
				localStorageService.set("miEmpresa","vacio");
							
			swal(
      			'Exito',
     			 'La empresa fue registrada exitosamente',
    			  'success'
   				 );
				$location.path("/Asesor_inicio");
			}else{
				if(hayLogo){
					$scope.borrarLogo();
				}

			
				
				if(data==5){
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

		} 

		}).error(function(err){
			usSpinnerService.stop('spinner-1');
           console.log(err);

    });

		
	
	}




		$scope.buscarContacto=function(){
		usSpinnerService.spin('spinner-1');
		$http.post("Modelo/servicesMincit/Asesor/buscarContacto.php",{'cedula':$scope.cedula})
		.success(function(data){
			console.log(data);
			usSpinnerService.stop('spinner-1');
			if(data!=0){
			swal({
      			title: 'Exito',
     			 text: 'Se encontro un contacto previamente registrado',
    			  type: 'success',
    			  timer: 2000
   				 });
			$scope.nombres=data[0].nombres;
			$scope.apellidos=data[0].apellidos;
			$scope.cargo=data[0].cargo;
			$scope.direccion=data[0].direccion;
			$scope.ciudad=data[0].ciudad;
			$scope.telefonoF=parseInt(data[0].telefonoF);
			$scope.telefonoC=parseInt(data[0].telefonoC);
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
				return false;			
		}else{
			
				var name = $scope.nombreE;
				var file = $scope.file;
				
				upload.uploadFile(file, name).then(function(res)
				{
					console.log(res);
					if(res.data==1){
						console.log("es 1. salio bien");
						console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
						$scope.urlLogo=name+"."+$scope.tipo[1];
						$scope.registrarEmpresa2(true);
					}else{
						$scope.urlLogo="nologo.jpg";
						$scope.registrarEmpresa2(false);

						console.log("es 0. Algo salio mal o No desea subir logo");
					}
				})
		 return true;
		}
		
}

$scope.borrarLogo=function(){

console.log($scope.nombreE);	
console.log("borrando...");
$http.post("Modelo/servicesMincit/ArchivosSubidos/borrarArchivo.php",{
	nombre: $scope.nombreE,
	tipo: $scope.tipo[1]
}).success(function(data){
		console.log(data);

})

}	
}])

app.controller('controllerEmpresaT_Asesor', ['$scope', '$http', 'cerrarSesion', 'localStorageService', 'usSpinnerService', '$location', 'upload', function($scope, $http, cerrarSesion, localStorageService, usSpinnerService, $location, upload){
var tama=0;
$scope.auxiliar= new Object();
var datos_usuarios=localStorageService.get("usuarioActual");
if(localStorageService.get("miEmpresaT")!=undefined){
	 $scope.emp=localStorageService.get("miEmpresaT");

	 tama=Object.keys(localStorageService.get("miEmpresaT")).length;

	 if($scope.emp.numRegistro=="" && $scope.emp.anoRenova=="" && tama==2){
	 	tama=0;
	 	console.log("if")
	 }else{
	 	
	 	console.log("else")
	 }
	 
}else{
	tama=0;
}
console.log(tama);
if(localStorageService.get("miEmpresaT")!="vacio" && tama!=0){
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
  
    $scope.emp=localStorageService.get("miEmpresaT");
    
    $scope.reestablecerDatos($scope.emp);

}, function(dismiss) {
   if (dismiss === 'cancel') {
   //	var miEmpresaT= new Object();
	localStorageService.set("miEmpresaT","vacio");
  //localStorageService.remove("miEmpresaT");
    swal({
      title: 'Nuevo Registro',
      text: 'Iniciando un nuevo registro',
      type: 'success',
      timer: 2000
    });

  }
})

}

$scope.cargarComboDpto=function(){
	$http.get('Modelo/servicesMincit/Asesor/cargaCombo_Dptos.php')

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
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
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
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
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
// metodos on change aqui!

//en caso contrario espero el evento change para mostrar el campo oculto

$('#constitucion_legal').bind('change', function() {

var cons= document.getElementById("constitucion_legal").value;

if(cons=="Otra"){
	$scope.otra_activa=true;
	
}else{
	$scope.otra_activa=false;
	$scope.auxiliar.constitucion2="";
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

		if($scope.auxiliar.numRegistro==0){
			$scope.auxiliar.numRegistro="";
			$scope.auxiliar.anoRenova="";
			}


}else{
	$scope.tiene_rm=false;
	$scope.auxiliar.numRegistro="";
	$scope.auxiliar.anoRenova="";
}

         // $scope.watch =$scope.ver;

});

//lo hace siempre por si el dato quedo guardado se muestre correctamente
$scope.$watch('seguro', function(newVal, oldVal){
 console.log("Search was changed to:"+newVal);
    
 if($scope.seguro=="si"){
	$scope.seguro_cual=true;

	}else{
		$scope.seguro_cual=false;
		
	}
});

//lo hace siempre por si el dato quedo guardado se muestre correctamente
$scope.$watch('sostenibilidad', function(newVal, oldVal){
 console.log("Search was changed to:"+newVal);
    
 if($scope.sostenibilidad=="Si" || $scope.sostenibilidad=="Parcial" || $scope.sostenibilidad=="General" || $scope.sostenibilidad=="NTS"){
	$scope.sostenibilidad_cual=true;

	}else{
		$scope.sostenibilidad_cual=false;
		
	}
});

$scope.$watch('tipo_tur_desarrolla', function(newVal, oldVal){
 console.log("Search was changed to:"+newVal);
    
 if($scope.tipo_tur_desarrolla=="Otro"){
	$scope.tipo_tur_cual=true;

	}else{
		$scope.tipo_tur_cual=false;
		
	}
});





$(window).bind('beforeunload',function(){
return '¿Está seguro de recargar y perder los datos que no han sido guardados?';
});

$scope.guardarTemporal=function(){

	var miEmpresaT= new Object();

	miEmpresaT.clasificacion=$scope.clasificacion;
	miEmpresaT.cedula=$scope.cedula;
	miEmpresaT.apellidos=$scope.apellidos;
	miEmpresaT.nombres=$scope.nombres;
	miEmpresaT.cargo=$scope.cargo;
	miEmpresaT.antiguedad=$scope.antiguedad;

	
	miEmpresaT.fechaN=$scope.fechaN;
	miEmpresaT.lugarN=$scope.lugarN;
	miEmpresaT.nivelEstudio=$scope.nivelEstudio;
	miEmpresaT.direccion=$scope.direccion;
	miEmpresaT.telefonoF=$scope.telefonoF;
	miEmpresaT.telefonoC=$scope.telefonoC;
	miEmpresaT.ciudad=$scope.ciudad;
	miEmpresaT.departamento=$scope.departamento;
	miEmpresaT.genero=$scope.genero;
	miEmpresaT.correo=$scope.correo;
	miEmpresaT.grupoE=$scope.grupoE;
	miEmpresaT.condicionD=$scope.condicionD;
	miEmpresaT.discapacidad=$scope.discapacidad;

	miEmpresaT.nombreE=$scope.nombreE;
	miEmpresaT.nit=$scope.nit;
	miEmpresaT.nombreR=$scope.nombreR;
	miEmpresaT.constitucion=$scope.constitucion;
	miEmpresaT.constitucion2=$scope.auxiliar.constitucion2;
	miEmpresaT.fechaC=$scope.fechaC;
	miEmpresaT.tc=$scope.tc;
	miEmpresaT.mt=$scope.mt;
	miEmpresaT.directos=$scope.directos;
	miEmpresaT.indirectos=$scope.indirectos;
	miEmpresaT.direccionEm=$scope.direccionEm;
	miEmpresaT.dptoEm=$scope.dptoEm;
	miEmpresaT.ciudadEm=$scope.ciudadEm;
	miEmpresaT.telefonoFijo=$scope.telefonoFijo;
	miEmpresaT.telefonoCelular=$scope.telefonoCelular;
	miEmpresaT.correoEm=$scope.correoEm;
	miEmpresaT.sitioWeb=$scope.sitioWeb;
	miEmpresaT.registroM=$scope.registroM;
	miEmpresaT.numRegistro=$scope.auxiliar.numRegistro;
	miEmpresaT.anoRenova=$scope.auxiliar.anoRenova;

//info de Emp. Turistica

	miEmpresaT.registroN=$scope.registroN;
	miEmpresaT.poliza=$scope.poliza;
	miEmpresaT.serviciosEmpre=$scope.serviciosEmpre;
	miEmpresaT.seguro=$scope.seguro;
	miEmpresaT.seguro2=$scope.auxiliar.seguro2;
	miEmpresaT.registroExp=$scope.registroExp;
	miEmpresaT.sostenibilidad=$scope.sostenibilidad;
	miEmpresaT.sostenibilidad2=$scope.auxiliar.sostenibilidad2;
	miEmpresaT.libro_mig_col=$scope.libro_mig_col;
	miEmpresaT.impuesto=$scope.impuesto;
	miEmpresaT.codigoE=$scope.codigoE;
	miEmpresaT.grupoEt=$scope.grupoEt;
	miEmpresaT.cedulaEx=$scope.cedulaEx;	
	miEmpresaT.tipo_empresa_turistica=$scope.tipo_empresa_turistica;
	miEmpresaT.tipo_alojamiento=$scope.tipo_alojamiento;
	miEmpresaT.tipo_tur_desarrolla=$scope.tipo_tur_desarrolla;
	miEmpresaT.tipo_tur_desarrolla2=$scope.auxiliar.tipo_tur_desarrolla2;
	miEmpresaT.observaciones=$scope.observaciones;

	localStorageService.set("miEmpresaT",miEmpresaT);

var cant=0;
for(i in miEmpresaT){

 	var obj=miEmpresaT[i];
 	
 	 if((obj=="" || obj==undefined)){
 		cant++;
 		console.log("vacios "+(cant))
		$scope.btnRegistrarEmpE=true;
		$scope.subeLogo=true;
	}
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
$scope.auxiliar.constitucion2=datos.constitucion2;
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
$scope.registroM=datos.registroM;
$scope.auxiliar.numRegistro=datos.numRegistro;
$scope.auxiliar.anoRenova=datos.anoRenova;

$scope.registroN=datos.registroN;
$scope.poliza=datos.poliza;
$scope.serviciosEmpre=datos.serviciosEmpre;
$scope.seguro=datos.seguro;
$scope.auxiliar.seguro2=datos.seguro2;
$scope.registroExp=datos.registroExp;
$scope.sostenibilidad=datos.sostenibilidad;
$scope.auxiliar.sostenibilidad2=datos.sostenibilidad2;
$scope.libro_mig_col=datos.libro_mig_col;
$scope.impuesto=datos.impuesto;
$scope.codigoE=datos.codigoE;
$scope.grupoEt=datos.grupoEt;
$scope.cedulaEx=datos.cedulaEx;
$scope.tipo_empresa_turistica=datos.tipo_empresa_turistica;
$scope.tipo_alojamiento=datos.tipo_alojamiento;
$scope.tipo_tur_desarrolla=datos.tipo_tur_desarrolla;
$scope.auxiliar.tipo_tur_desarrolla2=datos.tipo_tur_desarrolla2;

$scope.observaciones=datos.observaciones;

});

//lo hace siempre por si el dato quedo guardado se muestre correctamente
var cons= document.getElementById("constitucion_legal").value;

if(cons=="Otra"){
	$scope.otra_activa=true;
	
}else{
	$scope.otra_activa=false;
	$scope.auxiliar.constitucion2="";
}



}

$scope.registrarEmpresa=function(){
	$scope.subirLogo();
}

$scope.registrarEmpresa2=function(hayLogo){  

	// Validacion de vacion de cc de extranjeria

if($scope.cedulaEx==undefined){
	$scope.cedulaEx="No Aplica"
}

//Validaciones campos con opcion "Otro" o "Cual"
     if($scope.constitucion=="Otra"){
     	//alert("$scope.constitucion "+$scope.constitucion);
     	$scope.constitucion=$scope.auxiliar.constitucion2;
     	//alert("$scope.constitucion "+$scope.constitucion);
     }

     if($scope.seguro=="si"){
     	//alert("$scope.seguro "+$scope.seguro);
     	$scope.seguro=$scope.auxiliar.seguro2;
     	//alert("$scope.seguro "+$scope.seguro);
     }

     if($scope.sostenibilidad!="No"){
     	//alert("$scope.sostenibilidad "+$scope.sostenibilidad);
     	$scope.sostenibilidad=$scope.auxiliar.sostenibilidad2;
     	//alert("$scope.sostenibilidad "+$scope.sostenibilidad);
     }

     if($scope.tipo_tur_desarrolla=="Otro"){
     	//alert("$scope.tipo_tur_desarrolla "+$scope.tipo_tur_desarrolla);
     	$scope.tipo_tur_desarrolla=$scope.auxiliar.tipo_tur_desarrolla2;
     	//alert("$scope.tipo_tur_desarrolla "+$scope.tipo_tur_desarrolla);
     }
  

	usSpinnerService.spin('spinner-1');
     $http.post("Modelo/servicesMincit/Asesor/registrarEmpresaT.php",
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
		    'registroM':$scope.registroM,
		    'numRegistro':$scope.auxiliar.numRegistro,		    
		    'anoRenova':$scope.auxiliar.anoRenova,

            'registroN':$scope.registroN,
            'poliza':$scope.poliza,
            'serviciosEmpre':$scope.serviciosEmpre,
            'seguro':$scope.seguro,
            'registroExp':$scope.registroExp,
            'sostenibilidad':$scope.sostenibilidad,
            'libro_mig_col':$scope.libro_mig_col,
            'impuesto':$scope.impuesto,
            'codigoE':$scope.codigoE,
            'grupoEt':$scope.grupoEt,
            'cedulaEx':$scope.cedulaEx,
            'tipo_empresa_turistica':$scope.tipo_empresa_turistica,
            'tipo_alojamiento':$scope.tipo_alojamiento,
            'tipo_tur_desarrolla':$scope.tipo_tur_desarrolla,
            'url_logo2':$scope.urlLogo,
		    'observaciones':$scope.observaciones
		   
		    
		    }).success(function(data){

		    	console.log(data);
			usSpinnerService.stop('spinner-1');
			if(data==1){
			
			localStorageService.set("miEmpresaT","vacio");
			
			swal(
      			'Exito',
     			 'La empresa fue registrada exitosamente',
    			  'success'
   				 );
				$location.path("/Asesor_inicio");
			}else{
				if(hayLogo){
					$scope.borrarLogo();
				}
				
					if(data==5){
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


			} 
		}).error(function(err){
			usSpinnerService.stop('spinner-1');
           console.log(err);

    });
	
	}




	$scope.buscarContacto=function(){
		
		$http.post("Modelo/servicesMincit/Asesor/buscarContacto.php",{'cedula':$scope.cedula})
		.success(function(data){
			if(data!=undefined){
			swal({
      			title: 'Exito',
     			 text: 'Se encontro un contacto previamente registrado',
    			  type: 'success',
    			  timer: 2000
   				 });
			$scope.nombres=data[0].nombres;
			$scope.apellidos=data[0].apellidos;
			$scope.cargo=data[0].cargo;
			$scope.direccion=data[0].direccion;
			$scope.ciudad=data[0].ciudad;
			$scope.telefonoF=parseInt(data[0].telefonoF);
			$scope.telefonoC=parseInt(data[0].telefonoC);
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
			
				var name = $scope.nombreE;
				var file = $scope.file;
				
				upload.uploadFile(file, name).then(function(res) //http://sandbox1.ufps.edu.co/~ufps_11/LogosEmpresas/
				{
					console.log(res);
					if(res.data==1){
						console.log("es 1. salio bien");
						console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
						$scope.urlLogo=name+"."+$scope.tipo[1];
						console.log("el escope logo "+$scope.urlLogo);
						$scope.registrarEmpresa2(true);
						
					}else{
						$scope.urlLogo="nologo.jpg";
						$scope.registrarEmpresa2(false);

						console.log("es 0. Algo salio mal o No desea subir logo");
					}
				})
		 
		}
		
}

$scope.borrarLogo=function(){

console.log("borrando...");
$http.post("Modelo/servicesMincit/ArchivosSubidos/borrarArchivo.php",{
	nombre: $scope.nombreE,
	tipo: $scope.tipo[1]
}).success(function(data){
		console.log(data);

})

}
}])



app.controller('controllerContacto_Asesor', ['$scope', '$http', 'cerrarSesion', 'localStorageService', '$location', 'usSpinnerService', function($scope, $http, cerrarSesion, localStorageService, $location, usSpinnerService){
var tama=0;
var datos_usuarios=localStorageService.get("usuarioActual");
if(localStorageService.get("miContacto")!=undefined){
	

	 tama=Object.keys(localStorageService.get("miContacto")).length;
}else{
	tama=0;
}



if(localStorageService.get("miContacto")!="vacio" && tama!=0){
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
  
    $scope.emp=localStorageService.get("miContacto");
    
    $scope.reestablecerDatos($scope.emp);

}, function(dismiss) {
   if (dismiss === 'cancel') {
   //	var miEmpresaT= new Object();
	localStorageService.set("miContacto","vacio");
  //localStorageService.remove("miEmpresaT");
    swal({
      title: 'Nuevo Registro',
      text: 'Iniciando un nuevo registro',
      type: 'success',
      timer: 2000
    });

  }
})

}



$(window).bind('beforeunload',function(){
return '¿Está seguro de recargar y perder los datos que no han sido guardados?';
});

$scope.guardarTemporal=function(){

	var miContacto= new Object();


        miContacto.nombres=$scope.nombres;
        miContacto.apellidos=$scope.apellidos;
        miContacto.cedula=$scope.cedula;
        miContacto.correo=$scope.correo;
        miContacto.genero=$scope.genero;
        miContacto.cargo=$scope.cargo;
        miContacto.recibirC=$scope.recibirC;
        miContacto.numTelefono=$scope.numTelefono;
        miContacto.numCelular=$scope.numCelular;
        miContacto.cde=$scope.cde;
        miContacto.direccion=$scope.direccion;
        miContacto.ciudad=$scope.ciudad;
        miContacto.departamento=$scope.departamento;
        miContacto.notas=$scope.notas;


	localStorageService.set("miContacto",miContacto);

}

$scope.reestablecerDatos=function(datos) {
		
		$scope.$apply(function(){

		$scope.nombres=datos.nombres;
		$scope.apellidos=datos.apellidos;
		$scope.cedula=datos.cedula;
		$scope.correo=datos.correo;
		$scope.genero=datos.genero;
		$scope.cargo=datos.cargo;
		$scope.recibirC=datos.recibirC;
		$scope.numTelefono=datos.numTelefono;
		$scope.numCelular=datos.numCelular;
		$scope.cde=datos.cde;
		$scope.direccion=datos.direccion;
		$scope.ciudad=datos.ciudad;
		$scope.departamento=datos.departamento;
		$scope.notas=datos.notas;
	})
}


$scope.cargarComboDpto=function(){
	$http.get('Modelo/servicesMincit/Asesor/cargaCombo_Dptos.php')

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
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
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

$('#dpto_Contacto').click(function(e) {

var cons= document.getElementById("dpto_Contacto").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
	if($scope.dptosCombo[i].nombre==$scope.departamento){
		$scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
		$scope.cargarComboCiudad();
	}
	
};
});

$scope.$watchGroup(['nombres', 'apellidos', 'cedula', 'correo', 'genero', 'cargo', 'recibirC', 'numTelefono', 'numCelular', 'cde', 'direccion', 'ciudad', 'departamento', 'notas'], function(newValues, oldValues, scope) {
  $scope.guardarTemporal();
});

   $scope.registrarContacto=function(){

	usSpinnerService.spin('spinner-1');

   		if($scope.notas==undefined){
   			
   			$scope.notas="";
   		}
  
		$http.post("Modelo/servicesMincit/Asesor/registrarContacto.php",
			{
		 'id_usuario_registro':datos_usuarios.id_usuario,	
		 'nombres':$scope.nombres,
		 'apellidos':$scope.apellidos,
		 'cedula':$scope.cedula,
		 'correo':$scope.correo,
		 'genero':$scope.genero,
		 'cargo':$scope.cargo,
		 'recibirC':$scope.recibirC,
		 'numTelefono':$scope.numTelefono,
		 'numCelular':$scope.numCelular,
		 'cde':$scope.cde,
         'direccion':$scope.direccion,
		 'ciudad':$scope.ciudad,
		 'departamento':$scope.departamento,
		 'notas':$scope.notas
	})
		.success(function(data){
			usSpinnerService.stop('spinner-1');
			if(data==1){
				
					localStorageService.set("miContacto","vacio");
				 swal(
			      		'Exito',
			     		'El contacto fue registrado exitosamente',
			    		'success'
			   			 );
					$location.path("/Asesor_registrarContacto");
			}else if(data==2){
					swal({
			      		title: 'Error',
			     		text: 'El contacto ya existe en el sistema',
			    		type: 'error',
			    		timer: 2000
			   			 });
			}
			
			
		

		}).error(function(err){
			usSpinnerService.stop('spinner-1');
			console.log(err);
		})

	}
	
  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])

app.controller('controllerConsultarEntidades_Asesor', ['$scope', '$http', 'usSpinnerService', 'cerrarSesion', function($scope, $http, usSpinnerService, cerrarSesion){


$scope.currentPage = 0;
$scope.pageSize = 5; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];



  $scope.mostrarEntidades=function(){
    usSpinnerService.spin('spinner-1');

    $http.get("Modelo/servicesMincit/Administrador/listarEntidades.php")
    .success(function(data){
   usSpinnerService.stop('spinner-1');
      console.log(data)
      $scope.entidades=data
      $scope.configPages();
    })
  }
   
  $scope.mostrarEntidades();


$scope.verMas=function(id){
  
  $scope.entidadVerMas=$scope.entidades[id];
  console.log( $scope.entidadVerMas);

}  

$scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.entidades.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.entidades.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.entidades.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.entidades.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.entidades.length / $scope.pageSize);
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

app.controller('controllerConsultarLogroServicio_Asesor', ['$scope', 'cerrarSesion', function($scope, cerrarSesion){

 $scope.cerrarSesion=function(){
     cerrarSesion.cerrar();
  	}
}])

app.controller('controllerConfiguraciones_Asesor', ['$scope', 'cerrarSesion', '$http', 'localStorageService', 'usSpinnerService', '$location','cambiarClaveService', function($scope, cerrarSesion, $http, localStorageService, usSpinnerService, $location, cambiarClaveService){
var datos_usuarios=localStorageService.get("usuarioActual");
$scope.visibilidad1="password";
$scope.visibilidad2="password";

$scope.ver=function(v){
	if(v==1){
		$scope.visibilidad1="text";
	}else if(v==2){
		$scope.visibilidad2="text";
	}
	
}
$scope.ocultar=function(v){
	if(v==1){
	$scope.visibilidad1="password";	
	}else if(v==2){
		$scope.visibilidad2="password";
	}
	
}

$scope.cambiarClave=function(){
	cambiarClaveService.cambiar($scope.claveActual, $scope.claveNueva, $scope.claveNueva2, datos_usuarios.id_usuario);
}


/*
$scope.cambiarClave=function(){
	if($scope.claveNueva==$scope.claveNueva2){
		$scope.obtenerClaveActual();

		
	}else{swal(
      			'Error',
     			 'Las contraseñas ingresadas no coinciden, verifique e intente nuevamente',
    			  'error'
   				 );
}

}

$scope.cambiarClave2=function(){
	usSpinnerService.spin('spinner-1');
		$http.post('Modelo/servicesMincit/Configuraciones/cambiarClave.php', {
		'claveNueva': $scope.claveNueva,
		'id_user': datos_usuarios.id_usuario,
		'val': 1

	}).success(function(data){
		usSpinnerService.stop('spinner-1');
		if(data==1){
				swal({
      			title: 'Exito',
     			 text: 'La contraseña fue cambiada exitosamente',
    			  type: 'success'
   				 }).then(function() {
					  	location.reload();	
					})
	
		}else if(data==2){
			swal(
      			'Error',
     			 'Hubo un problema al cambiar la contraseña, intenta nuevamente',
    			  'error'
   				 );

		}

	}).error(function(err){
			usSpinnerService.stop('spinner-1');
           console.log(err);

    });
}

$scope.obtenerClaveActual=function(){

	usSpinnerService.spin('spinner-1');
	$http.post('Modelo/servicesMincit/Configuraciones/cambiarClave.php',{
			'val':2,
			'id_user':datos_usuarios.id_usuario

	}).success(function(data){
		console.log(data[0].clave);

		usSpinnerService.stop('spinner-1');
		if(data[0].clave!=2){
			$scope.claveActualConsultada=data[0].clave;
			if($scope.claveActualConsultada==$scope.claveActual){
				console.log("clave digitada "+$scope.claveActual+" clave consultada "+$scope.claveActualConsultada);

					if($scope.claveActual!=$scope.claveNueva){
						$scope.cambiarClave2();
					}else{
						swal(
			      			'Error',
			     			 'La clave actual y su clave nueva son las mismas, La operacion no se puede realizar',
			    			  'error'
			   				 );
					}

			
			}else{
				swal(
      			'Error',
     			 'Hubo un problema al cambiar la contraseña, intenta nuevamente',
    			  'error'
   				 );
			}
		}else{
			swal(
      			'Error',
     			 'Verifique su clave actual, puesto que no coincide con la que existe en el sistema',
    			  'error'
   				 );
		}
		

	}).error(function(err){
		usSpinnerService.stop('spinner-1');		
           console.log(err);

    });
}
*/
  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
  }])
