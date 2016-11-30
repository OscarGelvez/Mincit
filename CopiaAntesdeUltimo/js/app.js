var app=angular.module('mincit', ['ngRoute', 'mincit.controllersLogin', 'mincit.controllersAdmin', 'mincit.controllersAsesor'])



 
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

    }
 
 return rta;
}


    $routeProvider
        .when('/inicio', {
      templateUrl : 'login.html',
            controller  : 'loginCtrl'
        })

        .when('/recuperar_clave', {
          templateUrl : 'recuperarC.html',
            controller  : 'loginCtrl'
        })

        //Enrutamiento vistas Administrador/////////////////////////////////////////////////////


         .when('/Admin_inicio', {
          templateUrl : 'administrador/inicio.html',
            controller  : 'controllerInicio_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
           
        })
         .when('/Admin_registrarEntidad', {
          templateUrl : 'administrador/registrarEntidad.html',
            controller  : 'controllerRegistrarEntidad_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })
         .when('/Admin_verEntidad', {
          templateUrl : 'administrador/visualizarEntidad.html',
            controller  : 'controllerVerEntidad_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })
         .when('/Admin_logros', {
          templateUrl : 'administrador/logros.html',
            controller  : 'controllerLogros_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })

         .when('/Admin_servicios', {
          templateUrl : 'administrador/servicios.html',
            controller  : 'controllerServicios_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })

          .when('/Admin_configuraciones', {
          templateUrl : 'administrador/configuraciones.html',
            controller  : 'controllerConfiguraciones_Admin',
            data: {
            authorized: [ROLES.ADMIN.ROL]
            }
        })
      

      //Enrutamiento Vistas ASESOR////////////////////////////////////////////////////////////

      .when('/Asesor_inicio', {
          templateUrl : 'asesor/inicio.html',
            controller  : 'controllerInicio_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_registrarContacto', {
          templateUrl : 'asesor/registrarContacto.html',
            controller  : 'controllerContacto_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_registrarEmpresaEmprendedora', {
          templateUrl : 'asesor/registrarEmpresaE.html',
            controller  : 'controllerEmpresaE_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_registrarEmpresaTuristica', {
          templateUrl : 'asesor/registrarEmpresaT.html',
            controller  : 'controllerEmpresaT_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
            }
        })

        .when('/Asesor_configuraciones', {
          templateUrl : 'asesor/configuraciones.html',
            controller  : 'controllerConfiguraciones_Asesor',
            data: {
            authorized: [ROLES.ASESOR.ROL]
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
function verificar(){

  $http.get('servicesMincit/verificaSession.php')
            .success(function(data) {
              console.log(data);
                    sesion=data;
                    a();
                       console.log(sesion);           
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });


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
      event.preventDefault();
       //$location.path(ROLES.ASESOR.PATH);
     }
     else if(CONFIG.ROL_CURRENT_USER == 3)
     {
      event.preventDefault();
       //$location.path(ROLES.GUEST.PATH);
     }
     
     

   }
 }
});




}
 
}])




  .service('cerrarSesion', ['$http', function($http){
        this.cerrar= function() {

          $http.get('servicesMincit/cerrarSession.php')
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

 
  
  // if none of the above states are matched, use this as the fallback



