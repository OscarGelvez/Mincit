var app=angular.module('mincit.controllersEntidad',['angularSpinner']);


app.run([ "CONFIG", "$http", function(CONFIG, $http)
{

  var sesion;
function verificar(){

  $http.get('Modelo/servicesMincit/Sesiones/verificaSession.php')
            .success(function(data) {
              console.log(data);
                    sesion=data;
                    if(data=="en"){
                       CONFIG.ROL_CURRENT_USER= 3;
                       
                        }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}
verificar();

}])

app.controller('controllerInicio_Entidad', ['$scope', 'usSpinnerService', '$http', 'cerrarSesion', 'upload', function($scope, usSpinnerService, $http, cerrarSesion, upload){
$scope.tipo_busqueda_inicio="Empresas";
$scope.tipo_filter=true; //Si es true por defecto carga los filtros para empresa
$scope.currentPage = 0;
$scope.pageSize = 3; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];
$scope.filtro= new Object();
$scope.paginacionDinamica="empresas";

$scope.mostrarEmpre=function(){
  usSpinnerService.spin('spinner-1');
    $http.get("Modelo/servicesMincit/Entidad/listarEmpresas.php")
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
      console.log($scope.empresas);

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

      console.log("Empresas Emprendedoras "+$scope.empresasE);

      

    })
  }
   
  $scope.mostrarEmpreE();

  $scope.mostrarEmpreT=function(){
  usSpinnerService.spin('spinner-1');
    $http.get("Modelo/servicesMincit/Entidad/listarEmpresasT.php")
    .success(function(data){
      usSpinnerService.stop('spinner-1');
      $scope.empresasT=data

     console.log("Empresas Turisticas ");

      console.log($scope.empresasT);


    })
  }
   
  $scope.mostrarEmpreT();

  $scope.mostrarContactos=function(){
usSpinnerService.spin('spinner-1');
  $http.get("Modelo/servicesMincit/Entidad/listarContactos.php")
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
  $http.get('Modelo/servicesMincit/Entidad/cargaCombo_Dptos.php')

    .success(function(data) {
              console.log("departamentos "+data);

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
    $scope.paginacionDinamica="contactos";  
  }
});
$scope.cargarComboCiudad=function(){

  $http.post('Modelo/servicesMincit/Entidad/cargaCombo_Ciudades.php',{
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




//&//////////////////////////Edicion y eliminacion de Empresas y contactos////////////////////////////////////



function clone( obj ) {
  
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }
  console.log(temp);
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

console.log("contacto seleccionado")
console.log($scope.contactoEdit);
 $scope.contactoEdit.cc_contacto=parseInt($scope.contactoEdit.cc_contacto);
 $scope.contactoEdit.tel_cel=parseInt($scope.contactoEdit.tel_cel);
 $scope.contactoEdit.tel_fijo=parseInt($scope.contactoEdit.tel_fijo);

 $scope.contactoOriginal.cc_contacto=parseInt($scope.contactoOriginal.cc_contacto);
 $scope.contactoOriginal.tel_cel=parseInt($scope.contactoOriginal.tel_cel);
 $scope.contactoOriginal.tel_fijo=parseInt($scope.contactoOriginal.tel_fijo);

 }
console.log($scope.contactos[i].cc_contacto);
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
console.log("info de Emprendedora");
    console.log($scope.EmpEditEmprend);
  }
};
}else if(tipo=="Turística"){
  for (var i = 0; i < $scope.empresasT.length; i++) {
  
  if(correo_emp==$scope.empresasT[i].correo_emp){

    $scope.EmpEditTuristica=clone($scope.empresasT[i]);
    $scope.EmpOriginalTuristica=clone($scope.empresasT[i]);
$scope.EmpEditTuristica.cc_extranj_opc=parseInt($scope.EmpEditTuristica.cc_extranj_opc);
$scope.EmpOriginalTuristica.cc_extranj_opc=parseInt($scope.EmpOriginalTuristica.cc_extranj_opc);
    

console.log("info de turistica");
console.log($scope.EmpEditTuristica);
  }
};
}

//$scope.EmpOriginal=clone($scope.empresas[index]);
console.log($scope.EmpEdit);
}










}]).filter('startFromGrid', function() {

   return function(input, start) {
    if(input!=undefined){
     start =+ start;
        return input.slice(start);
  }
   
    }



});

app.controller('controllerContacto_Entidad', ['$scope', '$http', 'cerrarSesion', 'localStorageService', '$location', 'usSpinnerService', function($scope, $http, cerrarSesion, localStorageService, $location, usSpinnerService){
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
   // var miEmpresaT= new Object();
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
  $http.get('Modelo/servicesMincit/Entidad/cargaCombo_Dptos.php')

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
  $http.post('Modelo/servicesMincit/Entidad/cargaCombo_Ciudades.php',{
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
  
    $http.post("Modelo/servicesMincit/Entidad/registrarContacto.php",
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


app.controller('controllerVerMisContactos_Entidad', ['$scope', 'usSpinnerService', '$http', 'cerrarSesion', 'upload', 'localStorageService', function($scope, usSpinnerService, $http, cerrarSesion, upload, localStorageService){
$scope.tipo_busqueda_inicio="Empresas";
$scope.tipo_filter=false; //Si es true por defecto carga los filtros para empresa
$scope.currentPage = 0;
$scope.pageSize = 3; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];
$scope.filtro= new Object();

var datos_usuarios=localStorageService.get("usuarioActual");
console.log(datos_usuarios);
console.log(datos_usuarios.id_usuario);

  $scope.mostrarContactos=function(){
usSpinnerService.spin('spinner-1');
  $http.get("Modelo/servicesMincit/Entidad/listarContactos.php")
  .success(function(data){
    usSpinnerService.stop('spinner-1');
    $scope.contactos=data 

    
    for (var i = 0; i < $scope.contactos.length; i++) {
        if($scope.contactos[i].cde==""){
          $scope.contactos[i].cde="Pendiente Actualizar" // indica que el contacto fue registrado directamente desde el reg. empresa y no existia con anterioridad
        }
      };



for (var i = 0; i < $scope.contactos.length; i++) {
        if($scope.contactos[i].id_usuario_registro==datos_usuarios.id_usuario){
          
            $scope.contactos=$scope.contactos[i];
           }
      };
 
 // entra ya q al ser undefined no tiene mas de dos posiciones. y solo se encontro un dato. entonces, para q el ng-repeat 
 // funciones debo recorrer un array, por lo q creo el array y en la posicion uno le meto el unico dato q llego.
 if($scope.contactos.length==undefined){ 
  $scope.contactosAux=$scope.contactos;
  $scope.contactos= new Array()
  $scope.contactos.push($scope.contactosAux);
  console.log($scope.contactos);
 }
     
    $scope.configPages($scope.contactos);
    

  })
}
   
  $scope.mostrarContactos();


$scope.cargarComboDpto=function(){
  $http.get('Modelo/servicesMincit/Entidad/cargaCombo_Dptos.php')

    .success(function(data) {
              console.log("departamentos "+data);

              if(data!=0){
                 $scope.dptosCombo=data;
                
              }       
                   
             })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
}
$scope.cargarComboDpto();

$('#dptoEmpFilter').click(function(e) {

var cons= document.getElementById("dptoEmpFilter").value;
for (var i = 0; i < $scope.dptosCombo.length; i++) {
  if($scope.dptosCombo[i].nombre==$scope.dptoFilter){
    $scope.id_dpto_seleccionado=$scope.dptosCombo[i].id;
    $scope.cargarComboCiudad();
  }
  
};


});


$scope.cargarComboCiudad=function(){

  $http.post('Modelo/servicesMincit/Entidad/cargaCombo_Ciudades.php',{
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
   
  
    $scope.filtro.nombreContFilter="";
    $scope.filtro.cedulaContFilter="";
    $scope.filtro.cdeFilter="";   
   $scope.dptoFilter="";
   $scope.ciudadFilter="";
}




function clone( obj ) {
  
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }
  console.log(temp);
    return temp;
}

 
$scope.verMasContacto=function(contacto){
  

for (var i = 0; i < $scope.contactos.length; i++) {
 if($scope.contactos[i].cc_contacto==contacto){
  $scope.contactoEdit=clone($scope.contactos[i]);
  $scope.contactoOriginal=clone($scope.contactos[i]);

console.log("contacto seleccionado")
console.log($scope.contactoEdit);
 $scope.contactoEdit.cc_contacto=parseInt($scope.contactoEdit.cc_contacto);
 $scope.contactoEdit.tel_cel=parseInt($scope.contactoEdit.tel_cel);
 $scope.contactoEdit.tel_fijo=parseInt($scope.contactoEdit.tel_fijo);

 $scope.contactoOriginal.cc_contacto=parseInt($scope.contactoOriginal.cc_contacto);
 $scope.contactoOriginal.tel_cel=parseInt($scope.contactoOriginal.tel_cel);
 $scope.contactoOriginal.tel_fijo=parseInt($scope.contactoOriginal.tel_fijo);

 }
console.log($scope.contactos[i].cc_contacto);
};



//$scope.EmpOriginal=clone($scope.empresas[index]);

}



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

app.controller('controllerModificar_Entidad', ['$scope', 'usSpinnerService', '$http', 'cerrarSesion', 'localStorageService', 'upload', function($scope, usSpinnerService, $http, cerrarSesion, localStorageService, upload){
 var datos_usuarios=localStorageService.get("usuarioActual");
$scope.esEditable=false;
$scope.textoBtn="Editar"

 $scope.cargarMiInformacion=function(){
    usSpinnerService.spin('spinner-1');

    $http.post("Modelo/servicesMincit/Entidad/listarMiEntidad.php",{

            correo_usuario_asociado: datos_usuarios.correo_usuario
    }).success(function(data){
   usSpinnerService.stop('spinner-1');
      console.log(data)
      $scope.miInfo=data[0];
      $scope.miInfo.nit_entidad=parseInt(data[0].nit_entidad);
      
 
    })
  }

  $scope.cargarMiInformacion();

$scope.hacerEditable=function(){

  if($scope.esEditable){
$scope.esEditable=false;
  $scope.textoBtn="Editar"
  }else{
    $scope.editarEntidad();
    $scope.esEditable=true;
  $scope.textoBtn="Cancelar"
  }
  
}

$scope.editarEntidad=function(){
$scope.hayCambioLogo=false;
  
$scope.entidadEdit=$scope.miInfo;
console.log( $scope.entidadEdit);
$scope.entidadOriginal = new Array();
$scope.entidadOriginal=clone($scope.miInfo);
$scope.veces=1;
}

$scope.updateEntidad=function(){
console.log("llego update1")
   $scope.subirLogo(); 
}

$scope.updateEntidad2=function(hayLogo){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/actualizarEntidad.php', {
            
            nombre: $scope.entidadEdit.nombre_entidad,
            correo: $scope.entidadEdit.correo_entidad,
            descrip: $scope.entidadEdit.descrip_entidad,
            telefono: $scope.entidadEdit.tel_entidad,
            direccion: $scope.entidadEdit.direccion,
            nit: $scope.entidadEdit.nit_entidad,
            url_logo: $scope.urlLogo                 
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La entidad se modificó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           
          location.reload();
        })
      
      }else{
        if(hayLogo){
          $scope.borrarLogo();
        }

        if(data==2){
        swal(
            'Error',
           'La entidad no fue modificada, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 


}

function clone( obj ) {
  
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }
  console.log(temp);
    return temp;
}

$scope.guardoDatos=function(){
  console.log("guardoDatos")
  
  
   var hizoCambios=false;

console.log("entidad original "+$scope.entidadOriginal.url_logo+" entidad edit "+$scope.entidadEdit.url_logo);


    if ($scope.entidadOriginal.nombre_entidad!=$scope.entidadEdit.nombre_entidad) {
        hizoCambios=true;
    };
    if ($scope.entidadOriginal.correo_entidad!=$scope.entidadEdit.correo_entidad) {
      hizoCambios=true;
    };
    if ($scope.entidadOriginal.tel_entidad!=$scope.entidadEdit.tel_entidad) {
      hizoCambios=true;
    };
    if ($scope.entidadOriginal.direccion!=$scope.entidadEdit.direccion) {
      hizoCambios=true;
    };
    if ($scope.entidadOriginal.descrip_entidad!=$scope.entidadEdit.descrip_entidad) {
      hizoCambios=true;
    };

    if ($scope.hayCambioLogo) {
      hizoCambios=true;
       $scope.borrarLogoAnterior();
    };

   console.log( $scope.entidadEdit);
  
  if(hizoCambios){
    console.log("hizo cambios")
   $scope.updateEntidad();
  }else{
   
   console.log($scope.veces);
   if($scope.veces<=0){
     swal(
            'Información',
           'No se registra ningun cambio en la Información',
            'info'
           );
   }
     $scope.veces--;     
  }
    console.log("no hizo cambios "+hizoCambios)
 
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
  console.log("tipo "+$scope.tipo[1]);
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
      
        var name = $scope.entidadEdit.nombre_entidad;
        var file = $scope.file;
        
        upload.uploadFile(file, name).then(function(res)
        {
          console.log(res);
          if(res.data==1){
            console.log("es 1. salio bien");
            console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
            $scope.urlLogo=name+"."+$scope.tipo[1];
            $scope.updateEntidad2(true);
          }else{
            $scope.urlLogo="nologo.jpg";
            $scope.updateEntidad2(false);

            console.log("es 0. Algo salio mal o No desea subir logo");
          }

        })
     return true;
    }
    
}

$scope.borrarLogo=function(){

console.log($scope.entidadEdit.nombre_entidad);  
console.log("borrando...");
$http.post("Modelo/servicesMincit/ArchivosSubidos/borrarArchivo.php",{
  nombre: $scope.entidadEdit.nombre_entidad,
  tipo: $scope.tipo[1]
}).success(function(data){
    console.log(data);

})

}

$scope.borrarLogoAnterior=function(){

console.log("borrando...");
$http.post("Modelo/servicesMincit/ArchivosSubidos/borrarArchivo.php",{
  nombre: $scope.entidadOriginal.url_logo,
  tipo: "vacio"
}).success(function(data){
    console.log(data);

})

}

  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])

app.controller('controllerModificar_ServiciosEntidad', ['$scope', 'usSpinnerService', '$http', 'cerrarSesion', 'localStorageService', 'upload', function($scope, usSpinnerService, $http, cerrarSesion, localStorageService, upload){
var datos_usuarios=localStorageService.get("usuarioActual");
console.log(datos_usuarios)
var cont=1;

 $scope.servicios= new Object(); 




$scope.agregarServicio=function(){
var dom = $("#area1");
var dom2 = $("#area2");


var ed1=   "<div class='form-group col-xs-6>";
                   
var ed2= "<label class='acomodarL'>NOMBRE SERVICIO</label>";
                   
var ed3= "<input type='text' class='form-controlP' ng-model='servicios.nombre"+cont+"' placeholder='Nombre entidad' required> <br><br><br><br>" ;           
var ed4 = "</div>";


var ed5="<label class='acomodarL'>DESCRIPCIÓN</label>";
var ed6="<textarea class='form-control' name='observaciones' rows='3' id='descripcion1' required></textarea><br> "

dom.append(ed2);
dom.append(ed3);

dom2.append(ed5);
dom2.append(ed6);

cont++;

}


$scope.mostrarServicios=function(){
    usSpinnerService.spin('spinner-1');

    $http.post("Modelo/servicesMincit/Entidad/listarServicios.php",{
        user: datos_usuarios.correo_usuario

    }).success(function(data){
   usSpinnerService.stop('spinner-1');
      console.log(data)
            
      $scope.servicios=data
     
     // $scope.configPages();
    })
  }
   
  $scope.mostrarServicios();
  



$scope.guardarServicios=function(){

usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Entidad/registrarServicios.php', {
            
            nombre: $scope.nombre,
            descripcion: $scope.descripcion,
            user: datos_usuarios.correo_usuario
                        
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "El servicio fue guardado exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           
          location.reload();
        })
      
      }else{
        if(data==2){
        swal(
            'Error',
           'El servicio no fue registrado, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 


}

 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])
app.controller('controllerConfiguraciones_Entidad', ['$scope', 'usSpinnerService', '$http', 'cerrarSesion', 'localStorageService',  '$location','cambiarClaveService', function($scope, usSpinnerService, $http, cerrarSesion, localStorageService, $location, cambiarClaveService){
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

  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])
