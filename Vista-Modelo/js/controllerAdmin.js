var app=angular.module('mincit.controllersAdmin',['angularSpinner']);


//Controller inicio

app.run([ "CONFIG", "$http", "$rootScope", function(CONFIG, $http, $rootScope)
{

  var sesion;
function verificar(){

  $http.get('Modelo/servicesMincit/Sesiones/verificaSession.php')
            .success(function(data) {
              console.log(data);
                    sesion=data;
                    if(data=="ad"){
                       CONFIG.ROL_CURRENT_USER= 1;
                        $rootScope.rolInicio="Administrador";
                        }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });



}
verificar();

}])

app.controller('controllerInicio_Admin', ['$scope', 'usSpinnerService', '$http', 'cerrarSesion', 'pendientes', 'localStorageService', '$timeout', 'cargar3CombosFiltros', 'tam', function($scope, usSpinnerService, $http, cerrarSesion, pendientes, localStorageService, $timeout, cargar3CombosFiltros, tam){

$scope.currentPage = 0;
$scope.pageSize = 3; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];

cargar3CombosFiltros.cargarCombos();

$timeout(function() {
          $scope.cant_pendientes=localStorageService.get("notificaciones");
          $scope.combosLeidos=tam.tam;
    if($scope.combosLeidos==0){
      swal({
      title: 'Error al cargar los filtros de busqueda...',
      text: 'Error al cargar datos de los combos... Vuelva a recargar la pagina y verifique su velocidad de internet',
      type: 'warning',
      timer: 2000
    });
          }
          console.log($scope.combosLeidos);
          $scope.llenar3Combos();

    }, 3000);

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

		$http.get("Modelo/servicesMincit/Administrador/listarEmpresas.php")
		.success(function(data){
   usSpinnerService.stop('spinner-1');
			console.log(data)
						
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
    $http.get("Modelo/servicesMincit/Administrador/listarEmpresasE.php")
    .success(function(data){
      usSpinnerService.stop('spinner-1');
      $scope.empresasE=data

      console.log("Empresas Emprendedoras "+$scope.empresasE);

      

    })
  }
   
  $scope.mostrarEmpreE();

  $scope.mostrarEmpreT=function(){
  usSpinnerService.spin('spinner-1');
    $http.get("Modelo/servicesMincit/Administrador/listarEmpresasT.php")
    .success(function(data){
      usSpinnerService.stop('spinner-1');
      $scope.empresasT=data

     
      console.log("Empresas Turisticas "+$scope.empresasT);


    })
  }
   
  $scope.mostrarEmpreT();


  $scope.mostrarContactos=function(){
usSpinnerService.spin('spinner-1');
  $http.get("Modelo/servicesMincit/Administrador/listarContactos.php")
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

   $scope.nombreEmpFilter="";
   $scope.NitEmpFilter="";
   $scope.constitucionFilter="";
   $scope.tipoEmpFilter="";
   $scope.clasificFilter="";
   $scope.dptoFilter="";
   $scope.ciudadFilter="";
}


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
})


app.controller('controllerRegistrarEntidad_Admin', ['$scope','$http', 'usSpinnerService', 'cerrarSesion', 'localStorageService', 'upload', 'tam', 'uploadExcel', '$location', function($scope, $http, usSpinnerService, cerrarSesion, localStorageService,  upload, tam, uploadExcel, $location){
var datos_usuarios=localStorageService.get("usuarioActual");

$scope.cant_pendientes=localStorageService.get("notificaciones");


$scope.registrarEntidad=function(){
if($scope.claveUsuario!=$scope.claveUsuario2){
  swal(
            'Aviso',
           'Las contraseñas suministradas no coinciden, verifique e intente nuevamente',
            'info'
           );
}else{
   $scope.subirLogo();
}

 
}
$scope.registrarEntidad2=function(haylogo){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/registrarEntidad.php', {
            id_usuario_registro: datos_usuarios.id_usuario,
            nombre: $scope.nombreEntidad,
            correo: $scope.correoEntidad,
            descrip: $scope.descripEntidad,
            telefono: $scope.telefonoEntidad,
            direccion: $scope.direccionEntidad,
            nit: $scope.nitEntidad,
            url_logo: $scope.urlLogo,
            correoUser: $scope.correoUsuario,
            claveUser: $scope.claveUsuario          
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La entidad se registro exitosamente",
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
           'La entidad no fue registrada, Vuelva a intentarlo',
            'error'
           );
          }
        else if(data==3){
          swal(
            'Error',
           'La entidad no fue registrada, Puesto que ya existe en el sistema',
            'error'
           );
        }
        else if(data==4){
          swal(
            'Error',
           'La entidad fue registrada,pero el Usuario presentó problemas. Contacte al Administrador de la base de datos',
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
      
        var name = $scope.nombreEntidad;
        var file = $scope.file;
        
        upload.uploadFile(file, name).then(function(res)
        {
          console.log(res);
          if(res.data==1){
            console.log("es 1. salio bien");
            console.log("La ruta de la img es: "+name+"."+$scope.tipo[1])
            $scope.urlLogo=name+"."+$scope.tipo[1];
            $scope.registrarEntidad2(true);
          }else{
            $scope.urlLogo="nologo.jpg";
            $scope.registrarEntidad2(false);

            console.log("es 0. Algo salio mal o No desea subir logo");
          }
        })
     return true;
    }
    
}

$scope.borrarLogo=function(){

console.log($scope.$scope.nombreEntidad);  
console.log("borrando...");
$http.post("Modelo/servicesMincit/ArchivosSubidos/borrarArchivo.php",{
  nombre: $scope.$scope.nombreEntidad,
  tipo: $scope.tipo[1]
}).success(function(data){
    console.log(data);

})

}

////////////////////////// REGISTRO DE ENTIDADES POR SUBIDA DE EXCEL /////////////////////////////////
$scope.registrarEntidadPorExcel=function(){
usSpinnerService.spin('spinner-1');
    $scope.subirExcel();
}


$('#excel').bind('change', function() {

 $scope.tamExcel=(this.files[0].size)/1000;

});



    $scope.subirExcel=function(){
       if($scope.tamExcel>500){
      swal({
          title: 'Error Peso Exedido',
          text: 'El peso del archivo Excel seleccionado supera los 500 KB',
          type: 'warning',
         timer: 2000
        })  
        return false;     
    }else{
      var idUsuarioRegistro= datos_usuarios.id_usuario;
        var name = "archivoExcel";
        var file = $scope.file;
        
        uploadExcel.uploadFile(file, name, idUsuarioRegistro).then(function(res)
        {
          usSpinnerService.stop('spinner-1');
          console.log(res);
        
          
            var r=res.data.split(",");
            console.log(r);

            if(r[1]=="11" && r[2]=="10"){ // si es 11 el archivo se subio correctamente
                console.log("es 1. salio bien");
          swal({
          title: 'Exito',
          text: "El archivo se subio exitosamente al sistema. y todas las entidades fueron registradas...",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
          //location.reload();
          $location.path("/Admin_verEntidad");
        })
      }else{
       

        if(r[2]=="20"){
        swal(
            'Error',
           'Una o varias entidades no fueron registradas, Pero el archivo fue subido exitosamente',
            'error'
           );
          }
      
        else if(r[1]=="40"){
          swal(
            'Error',
           'No se registro un usuario asociado a una entidad correctamente...Consulte a su Administrador del Sistema ',
            'error'
           );
        }
        else if(r[1]=="4005"){
          swal(
            'Error',
           'El formato de archivo que intenta subir no es corrrecto. Recuerde que debe ser Excel .xlsx o .xls',
            'error'
           );
        }
         else if(r[1]=="303"){
          swal(
            'Error',
           'El archivo excel que esta intentando subir ya existe en el sistema. Si su contenido es diferente cambie el nombre e intentelo de nuevo',
            'error'
           );
          
        }
         else if(r[1]=="4040"){
          swal(
            'Error',
           'No se logro subir el archivo al sistema... Revisa tu conexión a internet e intentalo nuevamente',
            'error'
           );
        }  
     }
        console.log(res.data);

       
      })
     return true;
   }
}




$scope.registrarEntidadPorExcel2=function(){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/subirExcelEntidad.php', {
            idUsuarioRegistro: datos_usuarios.id_usuario,
                    
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      
    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 


}




 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }

}])

app.controller('controllerVerEntidad_Admin', ['$scope', 'cerrarSesion', 'usSpinnerService', '$http', 'upload', 'localStorageService', function($scope, cerrarSesion, usSpinnerService, $http, upload, localStorageService){

$scope.currentPage = 0;
$scope.pageSize = 5; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];
$scope.cant_pendientes=localStorageService.get("notificaciones");



  $scope.mostrarEntidades=function(){
    usSpinnerService.spin('spinner-1');

    $http.get("Modelo/servicesMincit/Administrador/listarEntidades.php")
    .success(function(data){
   usSpinnerService.stop('spinner-1');
      console.log(data)
      $scope.entidades=new Array();
      $scope.entidadesCompletas=data
      for (var i = 0; i < $scope.entidadesCompletas.length; i++) {
        if($scope.entidadesCompletas[i].estado_actual=="1"){
          $scope.entidades.push($scope.entidadesCompletas[i]);
        
        }
      };

            $scope.configPages();
    })
  }
   
  $scope.mostrarEntidades();

  $scope.mostrarServiciosLogrosEntidad=function(){
    usSpinnerService.spin('spinner-1');

    $http.get("Modelo/servicesMincit/Administrador/listarServicioLogroEntidad.php")
    .success(function(data){
   usSpinnerService.stop('spinner-1');
      console.log(data)
      $scope.SLE=data;

    })

  }

$scope.mostrarServiciosLogrosEntidad();


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


$scope.editarEntidad=function(nit){
  $scope.hayCambioLogo=false;
  $scope.SLEmostrar = new Array();
  
  for (var i = 0; i < $scope.entidades.length; i++) {
    if($scope.entidades[i].nit_entidad==nit){
         $scope.entidadEdit=clone($scope.entidades[i]);
         $scope.entidadOriginal = new Array();
      $scope.entidadOriginal=clone($scope.entidades[i]);
        }
  };

  for (var i = 0; i < $scope.SLE.length; i++) {
    if($scope.SLE[i].nit==nit){
      
      $scope.SLEmostrar.push($scope.SLE[i]);
      console.log($scope.SLEmostrar); 
    }
  };
 
  console.log( $scope.entidadEdit);
 

}

$scope.updateEntidad=function(){
console.log("llego update1")
   $scope.subirLogo(); 
}

$scope.updateEntidad2=function(hayLogo){
  if(!hayLogo && $scope.entidadEdit.url_logo!="nologo.jpg"){
    $scope.urlLogo=$scope.entidadEdit.url_logo;
    console.log("sii");
  }
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/actualizarEntidad.php', {
            
            nombre: $scope.entidadEdit.nombre_entidad,
            correo: $scope.entidadEdit.correo_entidad,
            descrip: $scope.entidadEdit.descrip_entidad,
            telefono: $scope.entidadEdit.tel_entidad,
            direccion: $scope.entidadEdit.direccion,
            nit: $scope.entidadEdit.nit_entidad,
            url_logo: $scope.urlLogo,
            operacion: 1,                 
               
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
           
          //location.reload();
          $scope.mostrarEntidades();
          
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
   var nitBandera=$scope.entidadEdit.nit_entidad;
  
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
  }
    console.log("no hizo cambios "+hizoCambios)
 
}


$scope.eliminar=function(nitRecibo){

swal({
  title: '¿Eliminar Entidad?',
  text: "¿Está seguro de eliminar esta entidad? De hacerlo debera consultarla en entidades inactivas del Mincit",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#388E3C',
  cancelButtonColor: '#a09f9f',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText:'Cancelar'
}).then(function() {
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/eliminarEntidad.php', {         
          
            nit:nitRecibo                      
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La entidad se eliminó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           $scope.mostrarEntidades();
          //location.reload();
        }).done();
      
      }else{
        /*if(hayLogo){
          $scope.borrarLogo();
        }*/ 

        if(data==2){
        swal(
            'Error',
           'La entidad no fue eliminada, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 

}).done();
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

  ////////////////////////////////////////////////////Entidades desabilitadas///////////////////////////

$scope.verDesabilitadas=function(){
    $scope.entidadesDesabilitadas=new Array();
      
      for (var i = 0; i < $scope.entidadesCompletas.length; i++) {
        if($scope.entidadesCompletas[i].estado_actual=="0"){
          $scope.entidadesDesabilitadas.push($scope.entidadesCompletas[i]);
       
        }
      };
}

$scope.habilitarEntidad=function(index){
  var idEntid=$scope.entidadesDesabilitadas[index].nit_entidad;
  usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/actualizarEntidad.php', {
            
            operacion: 2,
            nit: idEntid                             
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La entidad se habilitó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           $scope.mostrarEntidades();
          //location.reload();
        })
      
      }else{
        

        if(data==2){
        swal(
            'Error',
           'La entidad no fue habilitada, Vuelva a intentarlo',
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



}]).filter('startFromGrid', function() {

   return function(input, start) {
    if(input!=undefined){
     start =+ start;
        return input.slice(start);
  }
   
    }
});

app.controller('controllerAsociar_Admin',['$scope', 'cerrarSesion', '$http', 'usSpinnerService', 'localStorageService', function($scope, cerrarSesion, $http, usSpinnerService, localStorageService){

$scope.currentPage = 0;
$scope.pageSize = 3; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];

$scope.cant_pendientes=localStorageService.get("notificaciones");

$scope.mostrarServiciosPendientes=function(){
usSpinnerService.spin('spinner-1');
$http.get('Modelo/servicesMincit/Administrador/serviciosPendientes.php')

.success(function (data) {
      usSpinnerService.stop('spinner-1');
      console.log(data);    
      $scope.serviciosPendientes=data;
       localStorageService.set("notificaciones",$scope.serviciosPendientes.length);
       $scope.cant_pendientes=localStorageService.get("notificaciones");
      $scope.configPages();

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 

}
$scope.mostrarServiciosPendientes();

$scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.serviciosPendientes.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.serviciosPendientes.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.serviciosPendientes.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.serviciosPendientes.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.serviciosPendientes.length / $scope.pageSize);
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

$scope.cargarLogros=function(){
  usSpinnerService.spin('spinner-1');

    $http.get("Modelo/servicesMincit/Administrador/listarLogros.php")
    .success(function(data){
   usSpinnerService.stop('spinner-1');
      console.log(data)     
      
      $scope.logros=data
      
    }).error(function(data) {
            usSpinnerService.stop('spinner-1');
            console.log('Error: ' + data);
    });

}
$scope.cargarLogros();



$scope.val = new Object();
$scope.values={}


$scope.guardar=function(index){
  usSpinnerService.spin('spinner-1');
 console.log($scope.serviciosPendientes[index]);

  console.log("valor "+$scope.values["field_"+index]);
  $http.post("Modelo/servicesMincit/Administrador/registrarServicioLogro.php",{
    
    nit: $scope.serviciosPendientes[index].nit,
    id_servicio: $scope.serviciosPendientes[index].id_servicio,
    id_logro: $scope.values["field_"+index]

    }).success(function(data){
      console.log(data);
      if(data==1){
          swal({
          title: 'Exito',
          text: "El servicio se asoció al logro exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
          //location.reload();
          $scope.mostrarServiciosPendientes();
        })
         $scope.serviciosPendientes.splice(index, 1);
      }else{
         swal(
            'Error',
           'El logro no se pudo asociar al servicio, Vuelva a intentarlo',
            'error'
           );
      }
      usSpinnerService.stop('spinner-1');
    }).error(function(data){    
      usSpinnerService.stop('spinner-1');
       console.log('Error: ' + data);

    })
}

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
})


app.controller('controllerLogros_Admin', ['$scope', 'cerrarSesion', 'usSpinnerService', '$http', 'localStorageService',  function($scope, cerrarSesion, usSpinnerService, $http, localStorageService){

$scope.currentPage = 0;
$scope.pageSize = 10; // Esta la cantidad de registros que deseamos mostrar por página
$scope.pages = [];
$scope.cant_pendientes=localStorageService.get("notificaciones");

$scope.cargarLogros=function(){
  usSpinnerService.spin('spinner-1');

    $http.get("Modelo/servicesMincit/Administrador/listarLogros.php")
    .success(function(data){
   usSpinnerService.stop('spinner-1');
      console.log(data)     
      
      $scope.logros=data
      $scope.configPages();
    }).error(function(data) {
            usSpinnerService.stop('spinner-1');
            console.log('Error: ' + data);
    });

}
$scope.cargarLogros();


$scope.registrarLogro=function(){
    usSpinnerService.spin('spinner-1');
  $http.post("Modelo/servicesMincit/Administrador/registrarLogro.php", {
    nombre:$scope.nombreLogro,
    descrip:$scope.descripLogro,
    

  }).success(function(data){
      usSpinnerService.stop('spinner-1');
    console.log(data)
    if(data==1){
      swal({
          title: 'Exito',
          text: "El logro se registro exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
          //location.reload();
          $scope.cargarLogros();

        })
        

    }else if(data==2){
        swal(
            'Error',
           'El logro no fue registrado, Vuelva a intentarlo',
            'error'
           );
    } 

  }).error(function(data){
    usSpinnerService.stop('spinner-1');

  })

}

$scope.editarLogro=function(id_logro){
   
for (var i = 0; i < $scope.logros.length; i++) {
     if($scope.logros[i].id_logro==id_logro){

        $scope.logroEdit=clone($scope.logros[i]);
        $scope.logroOriginal = new Array();
        $scope.logroOriginal=clone($scope.logros[i]);
        }
   };   

console.log( $scope.logroEdit);


}


$scope.updateLogro=function(){
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/actualizarLogro.php', {
            
            nombre: $scope.logroEdit.nombre_logro,           
            descrip: $scope.logroEdit.descrip_logro,
            id_logro: $scope.logroEdit.id_logro
                
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "El logro se modificó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           $scope.cargarLogros();

          //location.reload();
        })
      
      }else{
        if(data==2){
        swal(
            'Error',
           'El logro no fue modificada, Vuelva a intentarlo',
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
      return temp;
}

$scope.guardoDatos=function(){
  console.log("guardoDatos")
   
   var hizoCambios=false;

    if ($scope.logroOriginal.nombre_logro!=$scope.logroEdit.nombre_logro) {
        hizoCambios=true;
    };
    if ($scope.logroOriginal.descrip_logro!=$scope.logroEdit.descrip_logro) {
      hizoCambios=true;
    };

  
  if(hizoCambios){
    console.log("hizo cambios")
   $scope.updateLogro();
  }
    console.log("no hizo cambios "+hizoCambios)
 
}


$scope.configPages = function() {
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
            ini = 1;
            if (Math.ceil($scope.logros.length / $scope.pageSize) > 10)
                fin = 10;
            else
                fin = Math.ceil($scope.logros.length / $scope.pageSize);
        }
        else {
            if (ini >= Math.ceil($scope.logros.length / $scope.pageSize) - 10) {
                ini = Math.ceil($scope.logros.length / $scope.pageSize) - 10;
                fin = Math.ceil($scope.logros.length / $scope.pageSize);
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

$scope.editar=function(){
	
}


$scope.eliminar=function(){
swal({
  title: '¿Esta seguro de eliminar este logro?',
  text: "Si elimina este logro las empresas que lo hayan obtenido lo perderan",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText:'Cancelar'
}).then(function() {
  swal(
    'Eliminado',
    'Logro eliminado de la base de datos',
    'success'
  );
})
}


 $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }
}])



app.controller('controllerConfiguraciones_Admin', ['$scope', 'cerrarSesion', '$http', 'localStorageService', 'usSpinnerService', '$location','cambiarClaveService', 'tam', function($scope, cerrarSesion, $http, localStorageService, usSpinnerService, $location, cambiarClaveService, tam){
var datos_usuarios=localStorageService.get("usuarioActual");
$scope.visibilidad1="password";
$scope.visibilidad2="password";
$scope.cant_pendientes=localStorageService.get("notificaciones");


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

  $scope.cerrarSesion=function(){
    
   cerrarSesion.cerrar();
  }

 $scope.combosActuales=function(){
   
    usSpinnerService.spin('spinner-1');
  $http.get('Modelo/servicesMincit/ServiciosCompartidos/cargar3CombosFiltros.php')

    .success(function(data) {
      usSpinnerService.stop('spinner-1');
              console.log(data);

              if(data!=0){
                $scope.combos=data;
                for (var i = 0; i < $scope.combos.length; i++) {
                  if($scope.combos[i].combo_padre=="1"){
                      $scope.combos[i].combo_padre="Constitución Legal"
                  }
                  else if($scope.combos[i].combo_padre=="2"){
                      $scope.combos[i].combo_padre="Tipo Empresa"
                  }
                  else if($scope.combos[i].combo_padre=="3"){
                    $scope.combos[i].combo_padre="Tipo Cliente"
                  }

                };
                
              }       
                   
             })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
}

  $scope.combosActuales();

  $scope.registrarCombo=function(){
  
    usSpinnerService.spin('spinner-1');
  $http.post("Modelo/servicesMincit/Administrador/registrarCombo.php", {
    nombre:$scope.nombreCombo,
    padre:$scope.comboPadre,
    

  }).success(function(data){
      usSpinnerService.stop('spinner-1');
    console.log(data)
    if(data==1){
      swal({
          title: 'Exito',
          text: "La opción de combo se registro exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
          //location.reload();
          $scope.combosActuales();

        })
        

    }else if(data==2){
        swal(
            'Error',
           'La opción del combo no fue registrada, Vuelva a intentarlo',
            'error'
           );
    } 

  }).error(function(data){
    usSpinnerService.stop('spinner-1');

  })
}

$scope.eliminar=function(id){

swal({
  title: '¿Eliminar Opción del Combo?',
  text: "¿Está seguro de eliminar esta opción del combo?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#388E3C',
  cancelButtonColor: '#a09f9f',
  confirmButtonText: 'Si, eliminar',
  cancelButtonText:'Cancelar'
}).then(function() {
usSpinnerService.spin('spinner-1');
$http.post('Modelo/servicesMincit/Administrador/eliminarCombo.php', {         
          
            id:$scope.combos[id].id                        
               
        }
    ).success(function (data) {
      usSpinnerService.stop('spinner-1');
      if(data==1){
          swal({
          title: 'Exito',
          text: "La opción de combo se eliminó exitosamente",
          type: 'success',         
          confirmButtonColor: '#388E3C'          
          }).then(function() {
           $scope.combosActuales();
          //location.reload();
        }).done();
      
      }else{
        

        if(data==2){
        swal(
            'Error',
           'La opción del combo no fue eliminada, Vuelva a intentarlo',
            'error'
           );
          }
       
     }
        console.log(data);    

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 

}).done();
}
  }])


