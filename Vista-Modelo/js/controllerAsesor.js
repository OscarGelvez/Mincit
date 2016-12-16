var app=angular.module('mincit.controllersAsesor',['LocalStorageModule']);


app.run([ "CONFIG", "$http", "$rootScope", function(CONFIG, $http, $rootScope)
{

  var sesion;
function verificar(){

  $http.get('Modelo/servicesMincit/Sesiones/verificaSession.php')
            .success(function(data) {
              // console.log(data);
                    sesion=data;
                    if(data=="as"){
                       CONFIG.ROL_CURRENT_USER= 2;
                        $rootScope.rolInicio="Asesor";
                        }
                                   
                })
            .error(function(data) {
                    // console.log('Error: ' + data);
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



app.controller('controllerInicio_Asesor', ['$scope', '$http', 'usSpinnerService', 'cerrarSesion', 'cargar3CombosFiltros', '$timeout', 'tam', 'upload', function($scope, $http, usSpinnerService, cerrarSesion, cargar3CombosFiltros, $timeout, tam, upload){
$scope.tipo_busqueda_inicio="Empresas";
$scope.tipo_filter=true; //Si es true por defecto carga los filtros para empresa
$scope.currentPage = 0;
$scope.pageSize = 3; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];
$scope.filtro= new Object();
$scope.paginacionDinamica="empresas";
$scope.CurrentDate = new Date();

cargar3CombosFiltros.cargarCombos();

$timeout(function() {
          
          $scope.combosLeidos=tam.tam;
          if($scope.combosLeidos==0){
      swal({
      title: 'Error al cargar los filtros de busqueda...',
      text: 'Error al cargar datos de los combos... Vuelva a recargar la pagina y verifique su velocidad de internet',
      type: 'warning',
      timer: 2000
    });
          }
          // console.log($scope.combosLeidos);
          $scope.llenar3Combos();

    }, 4000);

$scope.llenar3Combos=function(){
   $scope.combo1= new Array();
  $scope.combo2= new Array();
  $scope.combo3= new Array();
  for (var i = 0; i < $scope.combosLeidos.length; i++) {
    if($scope.combosLeidos[i].combo_padre=="1"){
      $scope.combo1.push($scope.combosLeidos[i]);
    }
    else if($scope.combosLeidos[i].combo_padre=="2"){
      $scope.combo2.push($scope.combosLeidos[i]);
    }
    else if($scope.combosLeidos[i].combo_padre=="3"){
      $scope.combo3.push($scope.combosLeidos[i]);
    }
  };
 
}

$scope.mostrarEmpre=function(){
	usSpinnerService.spin('spinner-1');
		$http.get("Modelo/servicesMincit/Asesor/listarEmpresas.php")
		.success(function(data){
			usSpinnerService.stop('spinner-1');
			$scope.empresas=data

			for (var i = 0; i < $scope.empresas.length; i++) {
        if($scope.empresas[i].tipo_empresa=="t"){
          $scope.empresas[i].tipo_empresa="Turística"
        }else if($scope.empresas[i].tipo_empresa=="e"){
          $scope.empresas[i].tipo_empresa="Emprendedora"
        }
      };
			// console.log($scope.empresas);

			$scope.configPages($scope.empresas);
			$scope.cargarComboDpto();

		})
	}
   
	$scope.mostrarEmpre();






  $scope.mostrarEmpreE=function(){
  usSpinnerService.spin('spinner-1');
    $http.get("Modelo/servicesMincit/Entidad/listarEmpresasE.php")
    .success(function(data){
      usSpinnerService.stop('spinner-1');
      $scope.empresasE=data

      // console.log("Empresas Emprendedoras "+$scope.empresasE);

      

    })
  }
   
  $scope.mostrarEmpreE();

  $scope.mostrarEmpreT=function(){
  usSpinnerService.spin('spinner-1');
    $http.get("Modelo/servicesMincit/Entidad/listarEmpresasT.php")
    .success(function(data){
      usSpinnerService.stop('spinner-1');
      $scope.empresasT=data

     // console.log("Empresas Turisticas ");

      // console.log($scope.empresasT);


    })
  }
   
  $scope.mostrarEmpreT();

  


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

		// console.log($scope.contactos);
		$scope.configPages($scope.contactos);
		

	})
}
   
	$scope.mostrarContactos();

	$scope.cargarComboDpto=function(){
	$http.get('Modelo/servicesMincit/Asesor/cargaCombo_Dptos.php')

		.success(function(data) {
              // console.log(data);

              if(data!=0){
              	 $scope.dptosCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
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
 // console.log("nombreEmpFilter changed to:"+newVal);
    

});

//Escuchador que permite mostrar u ocultar los filtros para buscar en el inicio
$scope.$watch('tipo_busqueda_inicio', function(newVal, oldVal){
 // console.log("tipo_busqueda_inicio changed to:"+newVal);
    
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
              // console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
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










$('#dptoContacto2').click(function(e) {
	
  $scope.cargarComboDpto();
var cons= document.getElementById("dptoContacto2").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.contactoEdit.departamento){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
  
  }
  

};



// console.log($scope.contactoEdit.ciudad);

});




$('#dptoContacto').click(function(e) {
	
  $scope.cargarComboDpto();
var cons= document.getElementById("dptoContacto").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.contactoEdit.departamento){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
  
  }
  

};



// console.log($scope.contactoEdit.ciudad);

});

$('#dptoEmpresa').click(function(e) {
  $scope.cargarComboDpto();
var cons= document.getElementById("dptoEmpresa").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.EmpEdit.departamento){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
    
  
  }
  

};

});


$('#dptoEmpresa2').click(function(e) {
  $scope.cargarComboDpto();
var cons= document.getElementById("dptoEmpresa2").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.EmpEdit.departamento){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
    
  
  }
  

};

});

function clone( obj ) {
  
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }
  // console.log(temp);
    return temp;
}



$scope.verMasEmpresa=function(index, tipo, correo_emp, contacto){
  
$scope.hayCambioLogo=false;

for (var i = 0; i < $scope.empresas.length; i++) {
  if($scope.empresas[i].correo==correo_emp){

    $scope.EmpEdit=clone($scope.empresas[i]);
$scope.EmpOriginal=clone($scope.empresas[i]);
  }
};



$scope.EmpEdit.nit=parseInt($scope.EmpEdit.nit);
$scope.EmpOriginal.nit=parseInt($scope.EmpOriginal.nit);

// OJO AL COMPARAR CON EMP ORIGINAL NO SERA IGUAL PS EMPEDIT tiene campos en int y no en string
$scope.EmpEdit.no_consecutivo_form=parseInt($scope.EmpEdit.no_consecutivo_form);
$scope.EmpOriginal.no_consecutivo_form=parseInt($scope.EmpOriginal.no_consecutivo_form);


$scope.EmpEdit.no_emple_directo=parseInt($scope.EmpEdit.no_emple_directo);
$scope.EmpOriginal.no_emple_directo=parseInt($scope.EmpOriginal.no_emple_directo);



$scope.EmpEdit.no_emple_indirecto=parseInt($scope.EmpEdit.no_emple_indirecto);
$scope.EmpOriginal.no_emple_indirecto=parseInt($scope.EmpOriginal.no_emple_indirecto);


$scope.EmpEdit.no_emple_mt=parseInt($scope.EmpEdit.no_emple_mt);
$scope.EmpOriginal.no_emple_mt=parseInt($scope.EmpOriginal.no_emple_mt);


$scope.EmpEdit.no_emple_tc=parseInt($scope.EmpEdit.no_emple_tc);
$scope.EmpOriginal.no_emple_tc=parseInt($scope.EmpOriginal.no_emple_tc);


$scope.EmpEdit.telefonoC=parseInt($scope.EmpEdit.telefonoC);
$scope.EmpOriginal.telefonoC=parseInt($scope.EmpOriginal.telefonoC);


$scope.EmpEdit.telefonoF=parseInt($scope.EmpEdit.telefonoF);
$scope.EmpOriginal.telefonoF=parseInt($scope.EmpOriginal.telefonoF);


$scope.EmpEdit.contacto_cc=parseInt($scope.EmpEdit.contacto_cc);
$scope.EmpOriginal.contacto_cc=parseInt($scope.EmpOriginal.contacto_cc);


for (var i = 0; i < $scope.contactos.length; i++) {
 if($scope.contactos[i].cc_contacto==contacto){
  $scope.contactoEdit=clone($scope.contactos[i]);
  $scope.contactoOriginal=clone($scope.contactos[i]);

// console.log("contacto seleccionado")
// console.log($scope.contactoEdit);
 $scope.contactoEdit.cc_contacto=parseInt($scope.contactoEdit.cc_contacto);
 $scope.contactoEdit.tel_cel=parseInt($scope.contactoEdit.tel_cel);
 $scope.contactoEdit.tel_fijo=parseInt($scope.contactoEdit.tel_fijo);

 $scope.contactoOriginal.cc_contacto=parseInt($scope.contactoOriginal.cc_contacto);
 $scope.contactoOriginal.tel_cel=parseInt($scope.contactoOriginal.tel_cel);
 $scope.contactoOriginal.tel_fijo=parseInt($scope.contactoOriginal.tel_fijo);

 }
// console.log($scope.contactos[i].cc_contacto);
};


if(tipo=="Emprendedora"){
  for (var i = 0; i < $scope.empresasE.length; i++) {
  
  if(correo_emp==$scope.empresasE[i].correo_emp){

    $scope.EmpEditEmprend=clone($scope.empresasE[i]);
    $scope.EmpOriginalEmprend=clone($scope.empresasE[i]);

    $scope.EmpEditEmprend.nit_empresa=parseInt($scope.EmpEditEmprend.nit_empresa);
    $scope.EmpEditEmprend.cod_ciiu=parseInt($scope.EmpEditEmprend.cod_ciiu);

    $scope.EmpOriginalEmprend.nit_empresa=parseInt($scope.EmpOriginalEmprend.nit_empresa);
    $scope.EmpOriginalEmprend.cod_ciiu=parseInt($scope.EmpOriginalEmprend.cod_ciiu);
// console.log("info de Emprendedora");
    // console.log($scope.EmpEditEmprend);
  }
};
}else if(tipo=="Turística"){
  for (var i = 0; i < $scope.empresasT.length; i++) {
  
  if(correo_emp==$scope.empresasT[i].correo_emp){

    $scope.EmpEditTuristica=clone($scope.empresasT[i]);
    $scope.EmpOriginalTuristica=clone($scope.empresasT[i]);
$scope.EmpEditTuristica.cc_extranj_opc=parseInt($scope.EmpEditTuristica.cc_extranj_opc);
$scope.EmpOriginalTuristica.cc_extranj_opc=parseInt($scope.EmpOriginalTuristica.cc_extranj_opc);
    

// console.log("info de turistica");
// console.log($scope.EmpEditTuristica);
  }
};
}

//$scope.EmpOriginal=clone($scope.empresas[index]);
// console.log($scope.EmpEdit);
}


 $scope.textoBtn="Editar"
  $scope.esEditable=false;
$scope.hacerEditable=function(){

  if($scope.esEditable){
$scope.esEditable=false;
  $scope.textoBtn="Editar"
  }else{
    
    $scope.esEditable=true;
  $scope.textoBtn="Cancelar"
  }
  
}

$scope.updateEmpresaE=function(){
// console.log("llego update1")
$scope.hayCambios=false;

if($scope.EmpEdit.clasif_cliente!=$scope.EmpOriginal.clasif_cliente){
  $scope.hayCambios=true;
}

if($scope.contactoEdit.cc_contacto!=$scope.contactoOriginal.cc_contacto){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nombre_cont!=$scope.contactoOriginal.nombre_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.apellido_cont!=$scope.contactoOriginal.apellido_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.cargo_cont!= $scope.contactoOriginal.cargo_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_ingreso_cargo!= $scope.contactoOriginal.fecha_ingreso_cargo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_nacimiento!= $scope.contactoOriginal.fecha_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.lugar_nacimiento!= $scope.contactoOriginal.lugar_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nivel_estudio!= $scope.contactoOriginal.nivel_estudio){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.direccion!= $scope.contactoOriginal.direccion){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_fijo!= $scope.contactoOriginal.tel_fijo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_cel!= $scope.contactoOriginal.tel_cel){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.departamento!= $scope.contactoOriginal.departamento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.ciudad!= $scope.contactoOriginal.ciudad){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.genero!= $scope.contactoOriginal.genero){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.correo!= $scope.contactoOriginal.correo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.etnia!= $scope.contactoOriginal.etnia){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.desplazado!= $scope.contactoOriginal.desplazado){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.discapacidad!= $scope.contactoOriginal.discapacidad){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.nombre_empresa!=$scope.EmpOriginal.nombre_empresa){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.nit!=$scope.EmpOriginal.nit){
  $scope.hayCambios=true;
}

if($scope.EmpEdit.nombre_rep_legal!=$scope.EmpOriginal.nombre_rep_legal){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.tipo_constitucion!=$scope.EmpOriginal.tipo_constitucion){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.fecha_const_legal!=$scope.EmpOriginal.fecha_const_legal){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_tc!=$scope.EmpOriginal.no_emple_tc){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_mt!=$scope.EmpOriginal.no_emple_mt){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_directo!=$scope.EmpOriginal.no_emple_directo){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_indirecto!=$scope.EmpOriginal.no_emple_indirecto){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.direccion!=$scope.EmpOriginal.direccion){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.ciudad!=$scope.EmpOriginal.ciudad){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.departamento!=$scope.EmpOriginal.departamento){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.telefonoF!=$scope.EmpOriginal.telefonoF){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.telefonoC!=$scope.EmpOriginal.telefonoC){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.correo!=$scope.EmpOriginal.correo){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.url_sitio_web!=$scope.EmpOriginal.url_sitio_web){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.registro_mercantil!=$scope.EmpOriginal.registro_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.numero_registro_mercantil!=$scope.EmpOriginal.numero_registro_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.renov_mercantil!=$scope.EmpOriginal.renov_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.servicios_ofrecidos!=$scope.EmpOriginal.servicios_ofrecidos){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.observaciones!=$scope.EmpOriginal.observaciones){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.tipo_activ_empresa!=$scope.EmpOriginalEmprend.tipo_activ_empresa){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.cod_ciiu!=$scope.EmpOriginalEmprend.cod_ciiu){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.activ_intern!=$scope.EmpOriginalEmprend.activ_intern){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.paises_comercializa!=$scope.EmpOriginalEmprend.paises_comercializa){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.negoc_internet!=$scope.EmpOriginalEmprend.negoc_internet){
  $scope.hayCambios=true;
}
if($scope.EmpEditEmprend.como_se_entero!=$scope.EmpOriginalEmprend.como_se_entero){
  $scope.hayCambios=true;
}
if($scope.hayCambioLogo){
  $scope.hayCambios=true;
}


   $scope.subirLogo(); 
 
}

$scope.updateEmpresaE2=function(hayLogo){

if(!hayLogo){
  $scope.urlLogo=$scope.EmpEdit.url_logo;
}

//Para controlar que no vaya a cambiar su nit por otro de alguna empresa q ya existe y lo permita el sistema.
//Al mandar si, en php valido q no haya otra emp con ese nit. si mando no. en php no valido eso. 
  if($scope.EmpEdit.nit!=$scope.EmpOriginal.nit){
     $scope.modificoNit="si";
  }else{
     $scope.modificoNit="no"
  }

if($scope.hayCambios){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Asesor/actualizarEmpresaE.php', {
          
clasificacion: $scope.EmpEdit.clasif_cliente,
cedula: $scope.contactoEdit.cc_contacto,
nombres: $scope.contactoEdit.nombre_cont,
apellidos: $scope.contactoEdit.apellido_cont,
cargo: $scope.contactoEdit.cargo_cont,
antiguedadCargo: $scope.contactoEdit.fecha_ingreso_cargo,
fechaNacimiento: $scope.contactoEdit.fecha_nacimiento,
lugarNacimiento: $scope.contactoEdit.lugar_nacimiento,
nivelEstudios: $scope.contactoEdit.nivel_estudio,
direccion: $scope.contactoEdit.direccion,
telefonoF: $scope.contactoEdit.tel_fijo,
telefonoC: $scope.contactoEdit.tel_cel,
departamento: $scope.contactoEdit.departamento,
ciudad: $scope.contactoEdit.ciudad,
genero: $scope.contactoEdit.genero,
 correo: $scope.contactoEdit.correo,
grupoEtnico: $scope.contactoEdit.etnia,
condicionDesplazamiento: $scope.contactoEdit.desplazado,
discapacidad: $scope.contactoEdit.discapacidad,

nombreE: $scope.EmpEdit.nombre_empresa,
nit: $scope.EmpEdit.nit,
nombreR: $scope.EmpEdit.nombre_rep_legal,
constitucion: $scope.EmpEdit.tipo_constitucion,
fechaC: $scope.EmpEdit.fecha_const_legal,
tc: $scope.EmpEdit.no_emple_tc,
mt: $scope.EmpEdit.no_emple_mt,
directos: $scope.EmpEdit.no_emple_directo,
indirectos: $scope.EmpEdit.no_emple_indirecto,
direccionEm: $scope.EmpEdit.direccion,
ciudadEm: $scope.EmpEdit.ciudad,
dptoEm: $scope.EmpEdit.departamento,
telefonoFijo: $scope.EmpEdit.telefonoF,
telefonoCelular: $scope.EmpEdit.telefonoC,
correoEm: $scope.EmpEdit.correo,
sitioWeb: $scope.EmpEdit.url_sitio_web,
registroM: $scope.EmpEdit.registro_mercantil,
numRegistro: $scope.EmpEdit.numero_registro_mercantil,
anoRenova: $scope.EmpEdit.renov_mercantil,
serviciosEmpre: $scope.EmpEdit.servicios_ofrecidos,
observaciones: $scope.EmpEdit.observaciones,
url_logo: $scope.urlLogo,

tipoEm: $scope.EmpEditEmprend.tipo_activ_empresa,
ciiu: $scope.EmpEditEmprend.cod_ciiu,
actividadI: $scope.EmpEditEmprend.activ_intern,
paisesCome: $scope.EmpEditEmprend.paises_comercializa,
negocio_internet: $scope.EmpEditEmprend.negoc_internet,
medioCde: $scope.EmpEditEmprend.como_se_entero,
modificoNit: $scope.modificoNit

                           
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La empresa se modificó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           
          //location.reload();
          $scope.mostrarEmpre();
          $scope.mostrarEmpreE();
          $scope.mostrarContactos();
        })
      
      }else{
        

        if(data==2){
        swal(
            'Error',
           'La empresa no fue modificada, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        // console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        // console.log(err);

    }); 
} else{
  swal(
            'AVISO',
           'No se detectaron cambios en los datos.',
            'info'
           );
          }
}


$('#logo').bind('change', function() {
 
 $scope.tam=(this.files[0].size)/1000;
});

$('#logo').bind('change', function() {
$scope.aux=this.files[0].type;
$scope.tipo=$scope.aux.split("/");
  if($scope.tipo[1]=="jpeg"){
      $scope.tipo[1]="jpg";
    }
  // console.log("tipo "+$scope.tipo[1]);
$scope.hayCambioLogo=true;
  
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
      
        var name = $scope.EmpEdit.nombre_empresa
        var file = $scope.file;
        
        upload.uploadFile(file, name).then(function(res)
        {
          // console.log(res);
          if(res.data==1){
            // console.log("es 1. salio bien");
            // console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
            $scope.urlLogo=name+"."+$scope.tipo[1];
            $scope.updateEmpresaE2(true);
          }else{

            $scope.urlLogo="nologo.jpg";
            $scope.updateEmpresaE2(false);

            // console.log("es 0. Algo salio mal o No desea subir logo");
          }

        })
     return true;
    }
    
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
$scope.updateEmpresaT=function(){
// console.log("llego update1 empTuristica")
$scope.hayCambios=false;

if($scope.EmpEdit.clasif_cliente!=$scope.EmpOriginal.clasif_cliente){
  $scope.hayCambios=true;
}

if($scope.contactoEdit.cc_contacto!=$scope.contactoOriginal.cc_contacto){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nombre_cont!=$scope.contactoOriginal.nombre_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.apellido_cont!=$scope.contactoOriginal.apellido_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.cargo_cont!= $scope.contactoOriginal.cargo_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_ingreso_cargo!= $scope.contactoOriginal.fecha_ingreso_cargo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_nacimiento!= $scope.contactoOriginal.fecha_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.lugar_nacimiento!= $scope.contactoOriginal.lugar_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nivel_estudio!= $scope.contactoOriginal.nivel_estudio){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.direccion!= $scope.contactoOriginal.direccion){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_fijo!= $scope.contactoOriginal.tel_fijo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_cel!= $scope.contactoOriginal.tel_cel){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.departamento!= $scope.contactoOriginal.departamento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.ciudad!= $scope.contactoOriginal.ciudad){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.genero!= $scope.contactoOriginal.genero){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.correo!= $scope.contactoOriginal.correo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.etnia!= $scope.contactoOriginal.etnia){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.desplazado!= $scope.contactoOriginal.desplazado){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.discapacidad!= $scope.contactoOriginal.discapacidad){
  $scope.hayCambios=true;
}




if($scope.EmpEdit.nombre_empresa!=$scope.EmpOriginal.nombre_empresa){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.nit!=$scope.EmpOriginal.nit){
  $scope.hayCambios=true;
}

if($scope.EmpEdit.nombre_rep_legal!=$scope.EmpOriginal.nombre_rep_legal){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.tipo_constitucion!=$scope.EmpOriginal.tipo_constitucion){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.fecha_const_legal!=$scope.EmpOriginal.fecha_const_legal){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_tc!=$scope.EmpOriginal.no_emple_tc){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_mt!=$scope.EmpOriginal.no_emple_mt){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_directo!=$scope.EmpOriginal.no_emple_directo){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.no_emple_indirecto!=$scope.EmpOriginal.no_emple_indirecto){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.direccion!=$scope.EmpOriginal.direccion){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.ciudad!=$scope.EmpOriginal.ciudad){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.departamento!=$scope.EmpOriginal.departamento){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.telefonoF!=$scope.EmpOriginal.telefonoF){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.telefonoC!=$scope.EmpOriginal.telefonoC){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.correo!=$scope.EmpOriginal.correo){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.url_sitio_web!=$scope.EmpOriginal.url_sitio_web){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.registro_mercantil!=$scope.EmpOriginal.registro_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.numero_registro_mercantil!=$scope.EmpOriginal.numero_registro_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.renov_mercantil!=$scope.EmpOriginal.renov_mercantil){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.servicios_ofrecidos!=$scope.EmpOriginal.servicios_ofrecidos){
  $scope.hayCambios=true;
}
if($scope.EmpEdit.observaciones!=$scope.EmpOriginal.observaciones){
  $scope.hayCambios=true;
}





if($scope.EmpEditTuristica.cc_extranj_opc!=$scope.EmpOriginalTuristica.cc_extranj_opc){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.certif_sostenib!=$scope.EmpOriginalTuristica.certif_sostenib){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.cod_etica!=$scope.EmpOriginalTuristica.cod_etica){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.grupo_etnico_empr!=$scope.EmpOriginalTuristica.grupo_etnico_empr){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.impto_turismo!=$scope.EmpOriginalTuristica.impto_turismo){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.libro_migrac_col!=$scope.EmpOriginalTuristica.libro_migrac_col){
  $scope.hayCambios=true;
}


if($scope.EmpEditTuristica.num_seguro!=$scope.EmpOriginalTuristica.num_seguro){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.poliza_turistica!=$scope.EmpOriginalTuristica.poliza_turistica){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.reg_export_servicios!=$scope.EmpOriginalTuristica.reg_export_servicios){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.reg_nal_turismo!=$scope.EmpOriginalTuristica.reg_nal_turismo){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.tipo_activ_turistica!=$scope.EmpOriginalTuristica.tipo_activ_turistica){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.tipo_alojamiento!=$scope.EmpOriginalTuristica.tipo_alojamiento){
  $scope.hayCambios=true;
}

if($scope.EmpEditTuristica.turismo_desarrolla!=$scope.EmpOriginalTuristica.turismo_desarrolla){
  $scope.hayCambios=true;
}

if($scope.hayCambioLogo2){
  $scope.hayCambios=true;
}

   $scope.subirLogo2(); 
 
}



$('#logo2').bind('change', function() {

 $scope.tam2=(this.files[0].size)/1000;
});

$('#logo2').bind('change', function() {
$scope.aux2=this.files[0].type;
$scope.tipo2=$scope.aux2.split("/");
  if($scope.tipo2[1]=="jpeg"){
      $scope.tipo2[1]="jpg";
    }
  // console.log("tipo "+$scope.tipo2[1]);
$scope.hayCambioLogo2=true;
  
});



$scope.subirLogo2=function(){

  if($scope.tam2>100){
      swal({
          title: 'Error Peso Exedido',
          text: 'El peso de la imagen seleccionada supera los 100KB',
          type: 'warning',
         timer: 2000
        })  
        return false;     
    }else{
      
        var name = $scope.EmpEdit.nombre_empresa
        var file = $scope.file;
        
        upload.uploadFile(file, name).then(function(res)
        {
          // console.log(res);
          if(res.data==1){
            // console.log("es 1. salio bien");
            // console.log("La ruta de la img es: "+name+"."+$scope.tipo2[1])
            $scope.urlLogo2=name+"."+$scope.tipo2[1];
            $scope.updateEmpresaT2(true);
          }else{

            $scope.urlLogo2="nologo.jpg";
            $scope.updateEmpresaT2(false);

            // console.log("es 0. Algo salio mal o No desea subir logo");
          }

        })
     return true;
    }
    
}







$scope.updateEmpresaT2=function(hayLogo){

if(!hayLogo){
  $scope.urlLogo2=$scope.EmpEdit.url_logo;
}

//Para controlar que no vaya a cambiar su nit por otro de alguna empresa q ya existe y lo permita el sistema.
//Al mandar si, en php valido q no haya otra emp con ese nit. si mando no. en php no valido eso. 
  if($scope.EmpEdit.nit!=$scope.EmpOriginal.nit){
     $scope.modificoNit="si";
  }else{
     $scope.modificoNit="no"
  }

if($scope.hayCambios){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Asesor/actualizarEmpresaT.php', {
          
clasificacion: $scope.EmpEdit.clasif_cliente,
cedula: $scope.contactoEdit.cc_contacto,
nombres: $scope.contactoEdit.nombre_cont,
apellidos: $scope.contactoEdit.apellido_cont,
cargo: $scope.contactoEdit.cargo_cont,
antiguedadCargo: $scope.contactoEdit.fecha_ingreso_cargo,
fechaNacimiento: $scope.contactoEdit.fecha_nacimiento,
lugarNacimiento: $scope.contactoEdit.lugar_nacimiento,
nivelEstudios: $scope.contactoEdit.nivel_estudio,
direccion: $scope.contactoEdit.direccion,
telefonoF: $scope.contactoEdit.tel_fijo,
telefonoC: $scope.contactoEdit.tel_cel,
departamento: $scope.contactoEdit.departamento,
ciudad: $scope.contactoEdit.ciudad,
genero: $scope.contactoEdit.genero,
 correo: $scope.contactoEdit.correo,
grupoEtnico: $scope.contactoEdit.etnia,
condicionDesplazamiento: $scope.contactoEdit.desplazado,
discapacidad: $scope.contactoEdit.discapacidad,

nombreE: $scope.EmpEdit.nombre_empresa,
nit: $scope.EmpEdit.nit,
nombreR: $scope.EmpEdit.nombre_rep_legal,
constitucion: $scope.EmpEdit.tipo_constitucion,
fechaC: $scope.EmpEdit.fecha_const_legal,
tc: $scope.EmpEdit.no_emple_tc,
mt: $scope.EmpEdit.no_emple_mt,
directos: $scope.EmpEdit.no_emple_directo,
indirectos: $scope.EmpEdit.no_emple_indirecto,
direccionEm: $scope.EmpEdit.direccion,
ciudadEm: $scope.EmpEdit.ciudad,
dptoEm: $scope.EmpEdit.departamento,
telefonoFijo: $scope.EmpEdit.telefonoF,
telefonoCelular: $scope.EmpEdit.telefonoC,
correoEm: $scope.EmpEdit.correo,
sitioWeb: $scope.EmpEdit.url_sitio_web,
registroM: $scope.EmpEdit.registro_mercantil,
numRegistro: $scope.EmpEdit.numero_registro_mercantil,
anoRenova: $scope.EmpEdit.renov_mercantil,
serviciosEmpre: $scope.EmpEdit.servicios_ofrecidos,
observaciones: $scope.EmpEdit.observaciones,
url_logo: $scope.urlLogo2,



ccExtra:$scope.EmpEditTuristica.cc_extranj_opc,
sostenibilidad:$scope.EmpEditTuristica.certif_sostenib,
codEtica:$scope.EmpEditTuristica.cod_etica,
grupoEtnico:$scope.EmpEditTuristica.grupo_etnico_empr,
imptoTurismo:$scope.EmpEditTuristica.impto_turismo,
libroMigrac:$scope.EmpEditTuristica.libro_migrac_col,
numSeguro:$scope.EmpEditTuristica.num_seguro,
poliza:$scope.EmpEditTuristica.poliza_turistica,
exportaServicios:$scope.EmpEditTuristica.reg_export_servicios,
regNalTurismo:$scope.EmpEditTuristica.reg_nal_turismo,
tipoActTuristica:$scope.EmpEditTuristica.tipo_activ_turistica,
alojamiento:$scope.EmpEditTuristica.tipo_alojamiento,
turismoDesarrolla:$scope.EmpEditTuristica.turismo_desarrolla,


modificoNit: $scope.modificoNit

                           
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La empresa se modificó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           
            $scope.mostrarEmpre();
           $scope.mostrarEmpreT();
           $scope.mostrarContactos();
          //location.reload();
        })
      
      }else{
        

        if(data==2){
        swal(
            'Error',
           'La empresa no fue modificada, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        // console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        // console.log(err);

    }); 
} else{
  swal(
            'AVISO',
           'No se detectaron cambios en los datos.',
            'info'
           );
          }
}

/////////////////////////////////////////////ACTUALIZACION DE CONTACTO ///////////////////////////////////


 $scope.textoBtnCont="Editar"
  $scope.esEditableCont=false;
$scope.hacerEditableCont=function(){

  if($scope.esEditableCont){
$scope.esEditableCont=false;
  $scope.textoBtnCont="Editar"
  }else{
    
    $scope.esEditableCont=true;
  $scope.textoBtnCont="Cancelar"
  }
  
}

$scope.verMasContacto=function(index, cc){
  for (var i = 0; i < $scope.contactos.length; i++) {
 if($scope.contactos[i].cc_contacto==cc){
  $scope.contactoEdit=clone($scope.contactos[i]);
  $scope.contactoOriginal=clone($scope.contactos[i]);

// console.log("contacto seleccionado")
// console.log($scope.contactoEdit);
 $scope.contactoEdit.cc_contacto=parseInt($scope.contactoEdit.cc_contacto);
 $scope.contactoEdit.tel_cel=parseInt($scope.contactoEdit.tel_cel);
 $scope.contactoEdit.tel_fijo=parseInt($scope.contactoEdit.tel_fijo);

 $scope.contactoOriginal.cc_contacto=parseInt($scope.contactoOriginal.cc_contacto);
 $scope.contactoOriginal.tel_cel=parseInt($scope.contactoOriginal.tel_cel);
 $scope.contactoOriginal.tel_fijo=parseInt($scope.contactoOriginal.tel_fijo);

 }
// console.log($scope.contactos[i].cc_contacto );
};
}


$('#dptoContacto3').click(function(e) {
  
  $scope.cargarComboDpto();
var cons= document.getElementById("dptoContacto3").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.contactoEdit.departamento){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
  
  }
  };
// console.log($scope.contactoEdit.ciudad);
});



$scope.updateContactos=function(){
// console.log("llego contactos")
$scope.hayCambios=false;


if($scope.contactoEdit.cc_contacto!=$scope.contactoOriginal.cc_contacto){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nombre_cont!=$scope.contactoOriginal.nombre_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.apellido_cont!=$scope.contactoOriginal.apellido_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.cargo_cont!= $scope.contactoOriginal.cargo_cont){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_ingreso_cargo!= $scope.contactoOriginal.fecha_ingreso_cargo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.fecha_nacimiento!= $scope.contactoOriginal.fecha_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.lugar_nacimiento!= $scope.contactoOriginal.lugar_nacimiento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.nivel_estudio!= $scope.contactoOriginal.nivel_estudio){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.direccion!= $scope.contactoOriginal.direccion){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_fijo!= $scope.contactoOriginal.tel_fijo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.tel_cel!= $scope.contactoOriginal.tel_cel){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.departamento!= $scope.contactoOriginal.departamento){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.ciudad!= $scope.contactoOriginal.ciudad){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.genero!= $scope.contactoOriginal.genero){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.correo!= $scope.contactoOriginal.correo){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.etnia!= $scope.contactoOriginal.etnia){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.desplazado!= $scope.contactoOriginal.desplazado){
  $scope.hayCambios=true;
}
if($scope.contactoEdit.discapacidad!= $scope.contactoOriginal.discapacidad){
  $scope.hayCambios=true;
}

if($scope.contactoEdit.notas!= $scope.contactoOriginal.notas){
  $scope.hayCambios=true;
}

if($scope.contactoEdit.cde!= $scope.contactoOriginal.cde){
  $scope.hayCambios=true;
}

if($scope.contactoEdit.recibir_correos!= $scope.contactoOriginal.recibir_correos){
  $scope.hayCambios=true;
}


$scope.updateContactos2();

 
}



$scope.updateContactos2=function(){



if($scope.hayCambios){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Asesor/actualizarContactoTotal.php', {
    
cedula: $scope.contactoEdit.cc_contacto,
nombres: $scope.contactoEdit.nombre_cont,
apellidos: $scope.contactoEdit.apellido_cont,
cargo: $scope.contactoEdit.cargo_cont,
antiguedadCargo: $scope.contactoEdit.fecha_ingreso_cargo,
fechaNacimiento: $scope.contactoEdit.fecha_nacimiento,
lugarNacimiento: $scope.contactoEdit.lugar_nacimiento,
nivelEstudios: $scope.contactoEdit.nivel_estudio,
direccion: $scope.contactoEdit.direccion,
telefonoF: $scope.contactoEdit.tel_fijo,
telefonoC: $scope.contactoEdit.tel_cel,
departamento: $scope.contactoEdit.departamento,
ciudad: $scope.contactoEdit.ciudad,
genero: $scope.contactoEdit.genero,
 correo: $scope.contactoEdit.correo,
grupoEtnico: $scope.contactoEdit.etnia,
condicionDesplazamiento: $scope.contactoEdit.desplazado,
discapacidad: $scope.contactoEdit.discapacidad,
notas: $scope.contactoEdit.notas,
cde: $scope.contactoEdit.cde,
recibirCorreos: $scope.contactoEdit.recibir_correos
         
    }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "El contacto se modificó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           
        //  location.reload();

        $scope.mostrarContactos();
        })
      
      }else{
        

        if(data==2){
        swal(
            'Error',
           'El contacto no fue modificada, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        // console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        // console.log(err);

    }); 
} else{
  swal(
            'AVISO',
           'No se detectaron cambios en los datos.',
            'info'
           );
          }
}


/////////////////////////////////////////////////////////BORRAR EMPRESA Y CONTACTOOO//////////////////////////////////

$scope.eliminarEmpresaYContacto=function(empresaCorreo, empresaContacto_cc, tipo){
swal({
  title: '¿Eliminar Empresa?',
  text: "¿Está seguro de eliminar esta empresa? De hacerlo tambien se eliminará toda la información del contacto asociado a la misma",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#388E3C',
  cancelButtonColor: '#a09f9f',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText:'Cancelar'
}).then(function() {
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Asesor/eliminarEmpresaYContacto.php', {         
          
            ccContacto: empresaContacto_cc,
            correoEmp: empresaCorreo,
            tipo: tipo                       
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La empresa y el contacto asociado se eliminaron exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           
          //location.reload();

          $scope.mostrarEmpre();
           $scope.mostrarEmpreT();
           $scope.mostrarContactos();
        }).done();
      
      }else{
        

        if(data==2){
        swal(
            'Error',
           'La empresa y el contacto asociado no fueron eliminados, Vuelva a intentarlo',
            'error'
           );
          }
          if(data==3){
        swal(
            'Error',
           'La empresa y el contacto asociado no fueron eliminados, consulte al Administrador de Base de Datos',
            'error'
           );
          }
          if(data==4){
        swal(
            'Error',
           'El contacto asociado a la empresa no fue eliminado, consulte al Administrador de Base de Datos',
            'error'
           );
          }
       
     }
        // console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        // console.log(err);

    }); 

}).done();



}

}]).filter('startFromGrid', function() {

   return function(input, start) {
   	if(input!=undefined){
		 start =+ start;
        return input.slice(start);
	}
   
    }
});


app.controller('controllerEmpresaE_Asesor', ['$scope', '$http', 'cerrarSesion', 'localStorageService', 'usSpinnerService', '$location', 'upload', 'cargar3CombosFiltros', '$timeout', 'tam',  function($scope, $http, cerrarSesion, localStorageService, usSpinnerService, $location, upload, cargar3CombosFiltros, $timeout, tam){
var tama=0;
$scope.auxiliar= new Object();
$scope.CurrentDate = new Date();

$scope.requerido=false;
var datos_usuarios=localStorageService.get("usuarioActual");
if(localStorageService.get("miEmpresa")!=undefined){
	 $scope.emp=localStorageService.get("miEmpresa");

	 tama=Object.keys(localStorageService.get("miEmpresa")).length;

	 if($scope.emp.numRegistro=="" && $scope.emp.anoRenova=="" && tama==2){
	 	tama=0;
	 	// console.log("if")
	 }else{
	 	
	 	// console.log("else")
	 }
	 
}else{
	tama=0;
}


cargar3CombosFiltros.cargarCombos();

$timeout(function() {
          
          $scope.combosLeidos=tam.tam;
          if($scope.combosLeidos==0){
      swal({
      title: 'Error al cargar los filtros de busqueda...',
      text: 'Error al cargar datos de los combos... Vuelva a recargar la pagina y verifique su velocidad de internet',
      type: 'warning',
      timer: 2000
    });
          }
          // console.log($scope.combosLeidos);
          $scope.llenar2Combos();

    }, 4000);

$scope.llenar2Combos=function(){
  
   $scope.combo1= new Array();

  $scope.combo3= new Array();
  for (var i = 0; i < $scope.combosLeidos.length; i++) {
    if($scope.combosLeidos[i].combo_padre=="1"){
      $scope.combo1.push($scope.combosLeidos[i]);
    }
   
    else if($scope.combosLeidos[i].combo_padre=="3"){
      $scope.combo3.push($scope.combosLeidos[i]);
    }
  };
 
}


// console.log(tama);
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
              // console.log(data);

              if(data!=0){
              	 $scope.dptosCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
            });
}
$scope.cargarComboDpto();


$scope.cargarComboCiudad=function(){
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
				dpto_select:$scope.id_dpto_seleccionado
			}).success(function(data) {
              // console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
            });
}

$scope.cargarComboCiudad2=function(){
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
				dpto_select:$scope.id_dpto_seleccionado2
			}).success(function(data) {
              // console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo2=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
            });
}

//en caso de que seleccione empresa formal el campo nit se vuelve requerido
$scope.$watch('clasificacion', function(newVal, oldVal){
 // console.log("clasificacion changed to:"+newVal);
    
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
                       // console.log("Search was changed to:"+newVal);
    
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
 	//// console.log(obj);
 	 if((obj=="" || obj==undefined)){
 		cant++;
 		//// console.log("vacios "+(cant))
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
 	// console.log(obj);
 	cant++;
 }
 if(cant<=39){
 		
 		// console.log("vacios "+(cant))
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
      if($scope.auxiliar.constitucion2==""){
         $scope.auxiliar.constitucion2=undefined;
      }
      $scope.constitucion=$scope.auxiliar.constitucion2;
//alert("$scope.constitucion "+$scope.constitucion);

     }
     
     if($scope.tipoEm=="Otra"){
      //alert("tipoEm "+$scope.tipoEm);
      if($scope.auxiliar.tipoEm2==""){
         $scope.auxiliar.tipoEm2=undefined;
      }
      $scope.tipoEm=$scope.auxiliar.tipoEm2;
      //alert("tipoEm "+$scope.tipoEm);
     }
     if($scope.tipoEm=="Comercial"){
      //alert("tipoEm "+$scope.tipoEm);
      if($scope.auxiliar.tipoEm3==""){
         $scope.auxiliar.tipoEm3=undefined;
      }
      $scope.tipoEm=$scope.auxiliar.tipoEm3;
      //alert("tipoEm "+$scope.tipoEm);
     } 
     if($scope.medioCde=="Otro"){
      //alert("medio cde "+$scope.medioCde);

      if($scope.auxiliar.medioCde2==""){
      //alert("es vacio el cde2") 
      $scope.auxiliar.medioCde2=undefined;

      }
      $scope.medioCde=$scope.auxiliar.medioCde2;
     
     }

$scope.hayCamposVacios=false;

if($scope.clasificacion==undefined){
  swal(
            'Campos Vacios',
           'El campo Clasificación Cliente Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}
else if($scope.cedula==undefined){
  swal(
            'Campos Vacios',
           'El campo Cédula de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}
else if($scope.nombres==undefined){
  swal(
            'Campos Vacios',
           'El campo Nombres de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.apellidos==undefined){
  swal(
            'Campos Vacios',
           'El campo Apellidos de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.cargo==undefined){
  swal(
            'Campos Vacios',
           'El campo Cargo de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.antiguedad==undefined){
  swal(
            'Campos Vacios',
           'El campo Fecha en que obtuvo el cargo de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.fechaN==undefined){
  swal(
            'Campos Vacios',
           'El campo Fecha de Nacimiento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.lugarN==undefined){
  swal(
            'Campos Vacios',
           'El campo Lugar de Nacimiento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.nivelEstudio==undefined){
  swal(
            'Campos Vacios',
           'El campo Nivel de Estudio de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.direccion==undefined){
  swal(
            'Campos Vacios',
           'El campo Dirección de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoF==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Fijo de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoC==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Celular de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.departamento==undefined){
  swal(
            'Campos Vacios',
           'El campo Departamento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.ciudad==undefined){
  swal(
            'Campos Vacios',
           'El campo Ciudad de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.genero==undefined){
  swal(
            'Campos Vacios',
           'El campo Género de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.correo==undefined){
  swal(
            'Campos Vacios',
           'El campo Correo Eléctronico de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.grupoE==undefined){
  swal(
            'Campos Vacios',
           'El campo Grupo Étnico de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.condicionD==undefined){
  swal(
            'Campos Vacios',
           'El campo Condición de Desplazamiento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.discapacidad==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo de Discapacidad de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.nombreE==undefined){
  swal(
            'Campos Vacios',
           'El campo Nombre Empresa de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.constitucion==undefined){
  swal(
            'Campos Vacios',
           'El campo Constitución Legal de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.fechaC==undefined){
  swal(
            'Campos Vacios',
           'El campo Fecha Inicio Labores de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.direccionEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Dirección Empresa de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.ciudadEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Ciudad de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.dptoEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Departamento de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoFijo==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Fijo de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoCelular==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Celular de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.correoEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Correo Empresa de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.sitioWeb==undefined){
  swal(
            'Campos Vacios',
           'El campo Sitio Web de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.tipoEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo de Empresa de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.registroM==undefined){
  swal(
            'Campos Vacios',
           'El campo Registro Mercantil Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.auxiliar.numRegistro==undefined){
  swal(
            'Campos Vacios',
           'El campo Número de Registro Mercantil de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.auxiliar.anoRenova==undefined){
  swal(
            'Campos Vacios',
           'El campo Año de Renovación de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.serviciosEmpre==undefined){
  swal(
            'Campos Vacios',
           'El campo Productos y Servicios que ofrece la empresa de Información de Empresa Emprendedora Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.medioCde==undefined){
  swal(
            'Campos Vacios',
           'El campo Medio por el cual se entero del CDE de Información de Empresa Emprendedora Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.urlLogo==undefined){
  swal(
            'Campos Vacios',
           'El campo Logo de Empresa de Información de Empresa Emprendedora Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.auxiliar.medioCde2==undefined){
  swal(
            'Campos Vacios',
           'El campo Medio por el cual se entero del CDE 2 de Información de Empresa Emprendedora Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}





if($scope.nit==undefined){
  
              $scope.nit="";
  // console.log("entro ppor $scope.nit")
} if($scope.nombreR==undefined){
  
              $scope.nombreR="";
  // console.log("entro ppor $scope.nombreR")
} if($scope.tc==undefined){
  
              $scope.tc="";
  // console.log("entro ppor $scope.tc")
} if($scope.mt==undefined){
  
              $scope.mt="";
  // console.log("entro ppor $scope.mt")
} if($scope.directos==undefined){
  
              $scope.directos="";
  // console.log("entro ppor $scope.directos")
} if($scope.indirectos==undefined){
  
              $scope.indirectos="";
  // console.log("entro ppor $scope.indirectos")
} if($scope.ciiu==undefined){
  
              $scope.ciiu="";
  // console.log("entro ppor $scope.ciiu")
} if($scope.actividadI==undefined){
  
              $scope.actividadI="";
  // console.log("entro ppor $scope.actividadI")
} if($scope.paisesCome==undefined){
  
              $scope.paisesCome="";
  // console.log("entro ppor $scope.paisesCome")
} if($scope.neg_internet==undefined){
  
              $scope.neg_internet="";
  // console.log("entro ppor $scope.neg_internet")
} if($scope.observaciones==undefined){
  
              $scope.observaciones="";
  // console.log("entro ppor $scope.observaciones")
}



if(!$scope.hayCamposVacios){

  usSpinnerService.spin('spinner-1');
     $http.post("Modelo/servicesMincit/Asesor/registrarEmpresaE.php",
      {
        //Clasificacion de clientes
      'clasificacion':$scope.clasificacion,   
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
          // console.log(data);
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
           // console.log(err);

    });
}
   

		
	
	}




		$scope.buscarContacto=function(){
		usSpinnerService.spin('spinner-1');
		$http.post("Modelo/servicesMincit/Asesor/buscarContacto.php",{'cedula':$scope.cedula})
		.success(function(data){
			// console.log(data);
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
        // console.log(err);

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
  // console.log("tipo "+$scope.tipo[1]);
});


$scope.subirLogo=function(){

	if($scope.tam>500){
			swal({
  				title: 'Error Peso Exedido',
  				text: 'El peso de la imagen seleccionada supera los 500 KB',
  				type: 'warning',
 				 timer: 2000
				})	
				return false;			
		}else{
			
				var name = $scope.nombreE;
				var file = $scope.file;
				
				upload.uploadFile(file, name).then(function(res)
				{
					// console.log(res);
					if(res.data==1){
						// console.log("es 1. salio bien");
						// console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
						$scope.urlLogo=name+"."+$scope.tipo[1];
						$scope.registrarEmpresa2(true);
					}else{
						$scope.urlLogo="nologo.jpg";
						$scope.registrarEmpresa2(false);

						// console.log("es 0. Algo salio mal o No desea subir logo");
					}
				})
		 return true;
		}
		
}

$scope.borrarLogo=function(){

// console.log($scope.nombreE);	
// console.log("borrando...");
$http.post("Modelo/servicesMincit/ArchivosSubidos/borrarArchivo.php",{
	nombre: $scope.nombreE,
	tipo: $scope.tipo[1]
}).success(function(data){
		// console.log(data);

})

}	
}])

app.controller('controllerEmpresaT_Asesor', ['$scope', '$http', 'cerrarSesion', 'localStorageService', 'usSpinnerService', '$location', 'upload', 'cargar3CombosFiltros', '$timeout', 'tam', function($scope, $http, cerrarSesion, localStorageService, usSpinnerService, $location, upload, cargar3CombosFiltros, $timeout, tam){

$scope.CurrentDate = new Date();
var tama=0;
$scope.auxiliar= new Object();
var datos_usuarios=localStorageService.get("usuarioActual");
if(localStorageService.get("miEmpresaT")!=undefined){
	 $scope.emp=localStorageService.get("miEmpresaT");

	 tama=Object.keys(localStorageService.get("miEmpresaT")).length;

	 if($scope.emp.numRegistro=="" && $scope.emp.anoRenova=="" && tama==2){
	 	tama=0;
	 	// console.log("if")
	 }else{
	 	
	 	// console.log("else")
	 }
	 
}else{
	tama=0;
}
// console.log(tama);
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


cargar3CombosFiltros.cargarCombos();

$timeout(function() {
          
          $scope.combosLeidos=tam.tam;
          if($scope.combosLeidos==0){
      swal({
      title: 'Error al cargar los filtros de busqueda...',
      text: 'Error al cargar datos de los combos... Vuelva a recargar la pagina y verifique su velocidad de internet',
      type: 'warning',
      timer: 2000
    });
          }
          // console.log($scope.combosLeidos);
          $scope.llenar2Combos();

    }, 4000);

$scope.llenar2Combos=function(){
  
   $scope.combo1= new Array();

  $scope.combo3= new Array();
  for (var i = 0; i < $scope.combosLeidos.length; i++) {
    if($scope.combosLeidos[i].combo_padre=="1"){
      $scope.combo1.push($scope.combosLeidos[i]);
    }
   
    else if($scope.combosLeidos[i].combo_padre=="3"){
      $scope.combo3.push($scope.combosLeidos[i]);
    }
  };
 
}


$scope.cargarComboDpto=function(){
	$http.get('Modelo/servicesMincit/Asesor/cargaCombo_Dptos.php')

		.success(function(data) {
              // console.log(data);

              if(data!=0){
              	 $scope.dptosCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
            });
}
$scope.cargarComboDpto();


$scope.cargarComboCiudad=function(){
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
				dpto_select:$scope.id_dpto_seleccionado
			}).success(function(data) {
              // console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
            });
}

$scope.cargarComboCiudad2=function(){
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
				dpto_select:$scope.id_dpto_seleccionado2
			}).success(function(data) {
              // console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo2=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
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
// console.log("Search was changed to:"+newVal);

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
 // console.log("Search was changed to:"+newVal);
    
 if($scope.seguro=="si"){
	$scope.seguro_cual=true;

	}else{
		$scope.seguro_cual=false;
		
	}
});

//lo hace siempre por si el dato quedo guardado se muestre correctamente
$scope.$watch('sostenibilidad', function(newVal, oldVal){
 // console.log("Search was changed to:"+newVal);
    
 if($scope.sostenibilidad=="Si" || $scope.sostenibilidad=="Parcial" || $scope.sostenibilidad=="General" || $scope.sostenibilidad=="NTS"){
	$scope.sostenibilidad_cual=true;

	}else{
		$scope.sostenibilidad_cual=false;
		
	}
});

$scope.$watch('tipo_tur_desarrolla', function(newVal, oldVal){
 // console.log("Search was changed to:"+newVal);
    
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
 		// console.log("vacios "+(cant))
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



//Validaciones campos con opcion "Otro" o "Cual"
      if($scope.constitucion=="Otra"){
      if($scope.auxiliar.constitucion2==""){
         $scope.auxiliar.constitucion2=undefined;
      }
      $scope.constitucion=$scope.auxiliar.constitucion2;
//alert("$scope.constitucion "+$scope.constitucion);

     }

     if($scope.seguro=="si"){
     	//alert("$scope.seguro "+$scope.seguro);
       if($scope.auxiliar.seguro2==""){
         $scope.auxiliar.seguro2=undefined;
      }
     	$scope.seguro=$scope.auxiliar.seguro2;
     	//alert("$scope.seguro "+$scope.seguro);
     }

     if($scope.sostenibilidad!="No"){
     	alert("$scope.sostenibilidad "+$scope.sostenibilidad);
      if($scope.auxiliar.sostenibilidad2==""){
         $scope.auxiliar.sostenibilidad2=undefined;
         alert("if de if")
      }
     	$scope.sostenibilidad=$scope.auxiliar.sostenibilidad2;
     alert("$scope.sostenibilidad "+$scope.sostenibilidad);
     }

     if($scope.tipo_tur_desarrolla=="Otro"){
     	//alert("$scope.tipo_tur_desarrolla "+$scope.tipo_tur_desarrolla);
     if($scope.auxiliar.tipo_tur_desarrolla2==""){
         $scope.auxiliar.tipo_tur_desarrolla2=undefined;
      }
     
     	$scope.tipo_tur_desarrolla=$scope.auxiliar.tipo_tur_desarrolla2;
     	//alert("$scope.tipo_tur_desarrolla "+$scope.tipo_tur_desarrolla);
     }
  


$scope.hayCamposVacios=false;

if($scope.clasificacion==undefined){
  swal(
            'Campos Vacios',
           'El campo Clasificación Cliente Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}
else if($scope.cedula==undefined){
  swal(
            'Campos Vacios',
           'El campo Cédula de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}
else if($scope.nombres==undefined){
  swal(
            'Campos Vacios',
           'El campo Nombres de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.apellidos==undefined){
  swal(
            'Campos Vacios',
           'El campo Apellidos de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.cargo==undefined){
  swal(
            'Campos Vacios',
           'El campo Cargo de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.antiguedad==undefined){
  swal(
            'Campos Vacios',
           'El campo Fecha en que obtuvo el cargo de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.fechaN==undefined){
  swal(
            'Campos Vacios',
           'El campo Fecha de Nacimiento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.lugarN==undefined){
  swal(
            'Campos Vacios',
           'El campo Lugar de Nacimiento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.nivelEstudio==undefined){
  swal(
            'Campos Vacios',
           'El campo Nivel de Estudio de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.direccion==undefined){
  swal(
            'Campos Vacios',
           'El campo Dirección de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoF==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Fijo de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoC==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Celular de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.departamento==undefined){
  swal(
            'Campos Vacios',
           'El campo Departamento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.ciudad==undefined){
  swal(
            'Campos Vacios',
           'El campo Ciudad de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.genero==undefined){
  swal(
            'Campos Vacios',
           'El campo Género de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.correo==undefined){
  swal(
            'Campos Vacios',
           'El campo Correo Eléctronico de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.grupoE==undefined){
  swal(
            'Campos Vacios',
           'El campo Grupo Étnico de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.condicionD==undefined){
  swal(
            'Campos Vacios',
           'El campo Condición de Desplazamiento de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.discapacidad==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo de Discapacidad de Datos Contacto Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.nombreE==undefined){
  swal(
            'Campos Vacios',
           'El campo Nombre Empresa de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.constitucion==undefined){
  swal(
            'Campos Vacios',
           'El campo Constitución Legal de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.fechaC==undefined){
  swal(
            'Campos Vacios',
           'El campo Fecha Inicio Labores de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.direccionEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Dirección Empresa de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.ciudadEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Ciudad de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.dptoEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Departamento de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoFijo==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Fijo de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.telefonoCelular==undefined){
  swal(
            'Campos Vacios',
           'El campo Teléfono Celular de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.correoEm==undefined){
  swal(
            'Campos Vacios',
           'El campo Correo Empresa de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.sitioWeb==undefined){
  swal(
            'Campos Vacios',
           'El campo Sitio Web de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.registroM==undefined){
  swal(
            'Campos Vacios',
           'El campo Registro Mercantil Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.auxiliar.numRegistro==undefined){
  swal(
            'Campos Vacios',
           'El campo Número de Registro Mercantil de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.auxiliar.anoRenova==undefined){
  swal(
            'Campos Vacios',
           'El campo Año de Renovación de Información de Empresa Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.serviciosEmpre==undefined){
  swal(
            'Campos Vacios',
           'El campo Productos y Servicios que ofrece la empresa de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.urlLogo==undefined){
  swal(
            'Campos Vacios',
           'El campo Logo de Empresa de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}












else if($scope.registroN==undefined){
  swal(
            'Campos Vacios',
           'El campo Registro Nacional de Turismo de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.poliza==undefined){
  swal(
            'Campos Vacios',
           'El campo Póliza de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.seguro==undefined){
  swal(
            'Campos Vacios',
           'El campo Seguro de Viaje de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.registroExp==undefined){
  swal(
            'Campos Vacios',
           'El campo Registro como Exportador de Servicios RUT de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.sostenibilidad==undefined){
  swal(
            'Campos Vacios',
           'El campo Certificados de Sostenibilidad de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.grupoEt==undefined){
  swal(
            'Campos Vacios',
           'El campo Grupo Étnico del Empresario de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.libro_mig_col==undefined){
  swal(
            'Campos Vacios',
           'El campo Libro de Migración de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.impuesto==undefined){
  swal(
            'Campos Vacios',
           'El campo Paga Impuesto al Turismo de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.codigoE==undefined){
  swal(
            'Campos Vacios',
           'El campo Código de Etica de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.cedulaEx==undefined){
  swal(
            'Campos Vacios',
           'El campo Cédula Extranjeria de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.tipo_empresa_turistica==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo de Empresa Turística de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.tipo_alojamiento==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo de Alojamiento de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}else if($scope.tipo_tur_desarrolla==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo Turismo que Desarrolla de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}
else if($scope.tipo_tur_desarrolla==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo Turismo que Desarrolla de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}
else if($scope.tipo_tur_desarrolla==undefined){
  swal(
            'Campos Vacios',
           'El campo Tipo Turismo que Desarrolla de Información de Empresa Turística Se encuentra vacio y es obligatorio',
            'warning'
           );
  $scope.hayCamposVacios=true;
}




    

 


if($scope.nit==undefined){
  
              $scope.nit="";
  // console.log("entro ppor $scope.nit")
} if($scope.nombreR==undefined){
  
              $scope.nombreR="";
  // console.log("entro ppor $scope.nombreR")
} if($scope.tc==undefined){
  
              $scope.tc="";
  // console.log("entro ppor $scope.tc")
} if($scope.mt==undefined){
  
              $scope.mt="";
  // console.log("entro ppor $scope.mt")
} if($scope.directos==undefined){
  
              $scope.directos="";
  // console.log("entro ppor $scope.directos")
} if($scope.indirectos==undefined){
  
              $scope.indirectos="";
  // console.log("entro ppor $scope.indirectos")
}  if($scope.observaciones==undefined){
  
              $scope.observaciones="";
  // console.log("entro ppor $scope.observaciones")
}



if(!$scope.hayCamposVacios){

	usSpinnerService.spin('spinner-1');
     $http.post("Modelo/servicesMincit/Asesor/registrarEmpresaT.php",
     	{
     		//Clasificacion de clientes
     	'clasificacion':$scope.clasificacion,       //Datos de contacto
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

		    	// console.log(data);
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
           // console.log(err);

    });
	
	}
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
  // console.log("tipo "+$scope.tipo[1]);

  
});


  $scope.subirLogo=function(){

	if($scope.tam>500){
			swal({
  				title: 'Error Peso Exedido',
  				text: 'El peso de la imagen seleccionada supera los 500 KB',
  				type: 'warning',
 				 timer: 2000
				})	
						
		}else{
			
				var name = $scope.nombreE;
				var file = $scope.file;
				
				upload.uploadFile(file, name).then(function(res) //http://sandbox1.ufps.edu.co/~ufps_11/LogosEmpresas/
				{
					// console.log(res);
					if(res.data==1){
						// console.log("es 1. salio bien");
						// console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
						$scope.urlLogo=name+"."+$scope.tipo[1];
						// console.log("el escope logo "+$scope.urlLogo);
						$scope.registrarEmpresa2(true);
						
					}else{
						$scope.urlLogo="nologo.jpg";
						$scope.registrarEmpresa2(false);

						// console.log("es 0. Algo salio mal o No desea subir logo");
					}
				})
		 
		}
		
}

$scope.borrarLogo=function(){

// console.log("borrando...");
$http.post("Modelo/servicesMincit/ArchivosSubidos/borrarArchivo.php",{
	nombre: $scope.nombreE,
	tipo: $scope.tipo[1]
}).success(function(data){
		// console.log(data);

})

}
}])



app.controller('controllerContacto_Asesor', ['$scope', '$http', 'cerrarSesion', 'localStorageService', '$location', 'usSpinnerService', function($scope, $http, cerrarSesion, localStorageService, $location, usSpinnerService){
$scope.CurrentDate = new Date();
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
              // console.log(data);

              if(data!=0){
              	 $scope.dptosCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
            });
}
$scope.cargarComboDpto();


$scope.cargarComboCiudad=function(){
	$http.post('Modelo/servicesMincit/Asesor/cargaCombo_Ciudades.php',{
				dpto_select:$scope.id_dpto_seleccionado
			}).success(function(data) {
              // console.log(data);

              if(data!=0){
              	 $scope.ciudadesCombo=data;
              	
              }       
                   
             })
            .error(function(data) {
                    // console.log('Error: ' + data);
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
			// console.log(err);
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
      // console.log(data)
      $scope.entidades=data
      $scope.configPages();
    })
  }
   
  $scope.mostrarEntidades();

   $scope.mostrarServiciosLogrosEntidad=function(){
    usSpinnerService.spin('spinner-1');

    $http.get("Modelo/servicesMincit/Administrador/listarServicioLogroEntidad.php")
    .success(function(data){
   usSpinnerService.stop('spinner-1');
      // console.log(data)
      $scope.SLE=data;

    })

  }

$scope.mostrarServiciosLogrosEntidad();


$scope.verMas=function(nitLlega){
$scope.SLEmostrar = new Array();

  for (var i = 0; i < $scope.entidades.length; i++) {
    if($scope.entidades[i].nit_entidad==nitLlega){
      $scope.entidadVerMas=$scope.entidades[i];
    }
  };
  
  for (var i = 0; i < $scope.SLE.length; i++) {
    if($scope.SLE[i].nit==nitLlega){
      
      $scope.SLEmostrar.push($scope.SLE[i]);
      // console.log($scope.SLEmostrar); 
    }
  };
  
  // console.log( $scope.entidadVerMas);

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


$scope.cambio=function(v){
if(v==1 && $scope.visibilidad1=="password" ){
    $scope.visibilidad1="text";

  }else if(v==1 && $scope.visibilidad1=="text"){
    $scope.visibilidad1="password"; 

  }
  else if(v==2 && $scope.visibilidad2=="password"){
    $scope.visibilidad2="text";
  }else if(v==2 && $scope.visibilidad2=="text"){
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
           // console.log(err);

    });
}

$scope.obtenerClaveActual=function(){

	usSpinnerService.spin('spinner-1');
	$http.post('Modelo/servicesMincit/Configuraciones/cambiarClave.php',{
			'val':2,
			'id_user':datos_usuarios.id_usuario

	}).success(function(data){
		// console.log(data[0].clave);

		usSpinnerService.stop('spinner-1');
		if(data[0].clave!=2){
			$scope.claveActualConsultada=data[0].clave;
			if($scope.claveActualConsultada==$scope.claveActual){
				// console.log("clave digitada "+$scope.claveActual+" clave consultada "+$scope.claveActualConsultada);

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
           // console.log(err);

    });
}
*/
  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
  }])
