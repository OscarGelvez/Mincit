var app=angular.module('mincit', ['ngRoute', 'mincit.controllersLogin', 'mincit.controllersAdmin', 'mincit.controllersAsesor', 'mincit.controllersEntidad'])



 
.constant('ROLES', {
 ADMIN: {
 ROL:1,
 PATH: "/Admin_inicio"
 },
 ASESOR: {
 ROL:2,
 PATH:"/asesor"
 },
 ENTIDAD: {
 ROL:3,
 PATH:"/entidad"
 }
})


.factory('urlActual', function(){
return{
   url:""
};
  
})




app.config(['$routeProvider', 'CONFIG', 'ROLES', function($routeProvider, CONFIG, ROLES) {

function actualURL(){
  var rta;
  var x = location.href;
  var url = x.split("#");
  var aux = url[1]+"";
  var url2=aux.split("_");

 console.log(url2[0]);
    if(url2[0]=="/Admin"){

         rta="/Admin_inicio";

    }else if(url2[0]=="/Asesor"){

        rta="/Asesor_inicio";

    }else if(url2[0]=="/Entidad"){

        rta="/Entidad_inicio";

    }

 
 return rta;
}


    $routeProvider
        .when('/inicio', {
      templateUrl : 'Vista/login.html',
            controller  : 'loginCtrl'
        })

        .when('/', {
      templateUrl : 'Vista/login.html',
            controller  : 'loginCtrl'
        })

        .when('/recuperar_clave', {
          templateUrl : 'Vista/recuperarC.html',
            controller  : 'loginCtrl'
        })

        //Enrutamiento vistas Administrador/////////////////////////////////////////////////////


         .when('/Admin_inicio', {
          templateUrl : 'Vista/administrador/inicio.html',
            controller  : 'controllerInicio_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
           
        })
         .when('/Admin_registrarEntidad', {
          templateUrl : 'Vista/administrador/registrarEntidad.html',
            controller  : 'controllerRegistrarEntidad_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })
         .when('/Admin_verEntidad', {
          templateUrl : 'Vista/administrador/visualizarEntidad.html',
            controller  : 'controllerVerEntidad_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })
         .when('/Admin_logros', {
          templateUrl : 'Vista/administrador/logros.html',
            controller  : 'controllerLogros_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })

         .when('/Admin_asociar', {
          templateUrl : 'Vista/administrador/asociar.html',
            controller  : 'controllerAsociar_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })

          .when('/Admin_configuraciones', {
          templateUrl : 'Vista/administrador/configuraciones.html',
            controller  : 'controllerConfiguraciones_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })
      

      //Enrutamiento Vistas ASESOR////////////////////////////////////////////////////////////

      .when('/Asesor_inicio', {
          templateUrl : 'Vista/asesor/inicio.html',
            controller  : 'controllerInicio_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_registrarContacto', {
          templateUrl : 'Vista/asesor/registrarContacto.html',
            controller  : 'controllerContacto_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_registrarEmpresaEmprendedora', {
          templateUrl : 'Vista/asesor/registrarEmpresaE.html',
            controller  : 'controllerEmpresaE_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_registrarEmpresaTuristica', {
          templateUrl : 'Vista/asesor/registrarEmpresaT.html',
            controller  : 'controllerEmpresaT_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_consultarEntidades', {
          templateUrl : 'Vista/asesor/consultarEntidades.html',
            controller  : 'controllerConsultarEntidades_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })
        .when('/Asesor_consultarLogroServicio', {
          templateUrl : 'Vista/asesor/consultarLogroServicio.html',
            controller  : 'controllerConsultarLogroServicio_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })
        .when('/Asesor_configuraciones', {
          templateUrl : 'Vista/asesor/configuraciones.html',
            controller  : 'controllerConfiguraciones_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })
      
  //Enrutamiento Vistas ENTIDAD////////////////////////////////////////////////////////////

      .when('/Entidad_inicio', {
          templateUrl : 'Vista/entidad/inicio.html',
            controller  : 'controllerInicio_Entidad',
            data: {
            authorized: [ROLES.ENTIDAD.ROL]
            }
        })

        .when('/Entidad_registrarContacto', {
          templateUrl : 'Vista/entidad/registrarContacto.html',
            controller  : 'controllerContacto_Entidad',
            data: {
            authorized: [ROLES.ENTIDAD.ROL]
            }
        })

        .when('/Entidad_verMisContactos', {
          templateUrl : 'Vista/entidad/verMisContactos.html',
            controller  : 'controllerVerMisContactos_Entidad',
            data: {
            authorized: [ROLES.ENTIDAD.ROL]
            }
        })

       
        .when('/Entidad_modificarEntidad', {
          templateUrl : 'Vista/entidad/modificarEntidad.html',
            controller  : 'controllerModificar_Entidad',
            data: {
            authorized: [ROLES.ENTIDAD.ROL]
            }
        })
         .when('/Entidad_modificarServicios', {
          templateUrl : 'Vista/entidad/modificarServicios.html',
            controller  : 'controllerModificar_ServiciosEntidad',
            data: {
            authorized: [ROLES.ENTIDAD.ROL]
            }
        })
         .when('/Entidad_configuraciones', {
          templateUrl : 'Vista/entidad/configuraciones.html',
            controller  : 'controllerConfiguraciones_Entidad',
            data: {
            authorized: [ROLES.ENTIDAD.ROL]
            }
        })
        .otherwise({
            redirectTo: ''+actualURL() // inicio es el mismo login  
        });
}])
//window.location.href

.run(["$rootScope", "$location", "CONFIG", "ROLES", "$http", "urlActual", function($rootScope, $location, CONFIG, ROLES, $http, urlActual)
{
  console.log("por run")
  var sesion="false";
  $rootScope.sesion=sesion;

function verificar(){

  $http.get('Modelo/servicesMincit/Sesiones/verificaSession.php')
            .success(function(data) {
              console.log(data);
                    sesion=data;
                    $rootScope.sesion=sesion;
                      $rootScope.$watch('sesion', function(newVal, oldVal){
                       console.log("Search was changed to:"+newVal);
    
                                  $rootScope.ver();
    
                                  $rootScope.watch =$rootScope.ver;
       
                        });

                    a();
                       console.log(sesion);           
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });


}
$rootScope.ver=function(){
    if(sesion=="false"){
    $location.path("/inicio");
  }else{

        var x = location.href;
        var url = x.split("#");
        var aux = url[1]+"";
        console.log(aux);
      if((sesion=="ad" && aux=="/inicio") || (sesion=="ad" && aux=="/")){
      $location.path("/Admin_inicio");
    }
 else if((sesion=="as" && aux=="/inicio") || (sesion=="as" && aux=="/")){
      $location.path("/Asesor_inicio");
    }
 else if((sesion=="en" && aux=="/inicio") || (sesion=="en" && aux=="/")){
        $location.path("/Entidad_inicio");
      }


  }
    

}
 
verificar();

//

function a(){


$rootScope.$on('$routeChangeStart', function (event, next) 
 {
  if (next.data !== undefined) 
  {
    if(next.data.authorized.indexOf(CONFIG.ROL_CURRENT_USER) !== -1)
    {
     console.log("entra");
     var x = location.href;
     urlActual.url=x;
     console.log(x);
  
   }
   else
   { 

    
     console.log("no entra ");
      if(sesion=="false" || sesion==undefined){
         console.log("la sesion es "+sesion);
        console.log("else");
       $location.path("/inicio");

      }  

     else if(CONFIG.ROL_CURRENT_USER == 1) 
     {
     console.log("la sesion es "+sesion);

      
        console.log("if prevent");
        event.preventDefault();
      
      

     }
     else if(CONFIG.ROL_CURRENT_USER == 2)

     {
       console.log("la sesion es "+sesion);

      
        console.log("if prevent");
      event.preventDefault();
       //$location.path(ROLES.ASESOR.PATH);
     }
     else if(CONFIG.ROL_CURRENT_USER == 3)
     {
      console.log("la sesion es "+sesion);

      
        console.log("if prevent");
      event.preventDefault();
       //$location.path(ROLES.GUEST.PATH);
     }
     
     

   }
 }
});




}
 
}])

/*
.service('verificarSesion', ['$http', function($http){
        this.verificar= function(rol) {

           $http.get('Modelo/servicesMincit/Sesiones/verificaSession.php')
            .success(function(data) {
              console.log(data);
                    sesion=data;
                    if(data==rol){
                       return true;
                       
                        }else{
                          return false;
                        }
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
        }
     }])
*/


  .service('cerrarSesion', ['$http', function($http){
        this.cerrar= function() {

          $http.get('Modelo/servicesMincit/Sesiones/cerrarSession.php')
            .success(function(data) {
              window.location.href='#inicio';
              location.reload();
              console.log(data);
                    
                                   
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
        }
     }])

 
  
.directive('uploaderModel', ["$parse", function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs) 
    {
      iElement.on("change", function(e)
      {
        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
      });
    }
  };
}])

.service('upload', ["$http", "$q", function ($http, $q) 
{
  this.uploadFile = function(file, name)
  {
    var deferred = $q.defer();
    var formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    return $http.post("Modelo/servicesMincit/Asesor/subirLogo.php", formData, {
      headers: {
        "Content-type": undefined
      },
      transformRequest: angular.identity
    })
    .success(function(res)
    {
      deferred.resolve(res);
    })
    .error(function(msg, code)
    {
      deferred.reject(msg);
    })
    return deferred.promise;
  } 
}])


.service('cambiarClaveService', ['$http', 'usSpinnerService', '$location', function($http, usSpinnerService, $location){

this.cambiar=function(claveActual, claveNueva, claveNueva2, id_usuario){
cambiarClave(claveNueva, claveNueva2, claveActual, id_usuario);
}

function cambiarClave(claveNueva, claveNueva2, claveActual, id_usuario){
  if(claveNueva==claveNueva2){
    obtenerClaveActual(id_usuario, claveActual, claveNueva);

    
  }else{swal(
            'Error',
           'Las contraseñas ingresadas no coinciden, verifique e intente nuevamente',
            'error'
           );
}

}

function cambiarClave2(claveNueva, id_usuario){
  usSpinnerService.spin('spinner-1');
    $http.post('Modelo/servicesMincit/Configuraciones/cambiarClave.php', {
    'claveNueva': claveNueva,
    'id_user': id_usuario,
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

function obtenerClaveActual(id_usuario, claveActual, claveNueva){

  usSpinnerService.spin('spinner-1');
  $http.post('Modelo/servicesMincit/Configuraciones/cambiarClave.php',{
      'val':2,
      'id_user':id_usuario

  }).success(function(data){
    console.log(data[0].clave);

    usSpinnerService.stop('spinner-1');
    if(data[0].clave!=2){
      var claveActualConsultada=data[0].clave;
      if(claveActualConsultada==claveActual){
        console.log("clave digitada "+claveActual+" clave consultada "+claveActualConsultada);

          if(claveActual!=claveNueva){
            cambiarClave2(claveNueva, id_usuario);
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


}])
.factory('tam', function(){
return{
   tam:0
};

})

.service('pendientes', ['$http', 'usSpinnerService', 'tam', 'localStorageService', function($http, usSpinnerService, tam, localStorageService){


mostrarServiciosPendientes();


function mostrarServiciosPendientes(){
 
usSpinnerService.spin('spinner-1');
$http.get('Modelo/servicesMincit/Administrador/serviciosPendientes.php')

.success(function (data) {
      usSpinnerService.stop('spinner-1');
      console.log(data);    
      var serviciosPendientes=data;
    
     //tam.tam=serviciosPendientes.length;
      localStorageService.set("notificaciones",serviciosPendientes.length);

    }).error(function(err){
      usSpinnerService.stop('spinner-1');
        console.log(err);

    }); 
    
}


}])


