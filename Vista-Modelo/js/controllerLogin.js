var app=angular.module('mincit.controllersLogin',['LocalStorageModule']);

app.constant('CONFIG', {
 TEMPLATE_DIR:"",
 
})

app.controller('loginCtrl', ['$scope', '$http', 'usSpinnerService', 'CONFIG', '$location', 'localStorageService', function($scope, $http, usSpinnerService, CONFIG, $location, localStorageService){
 //localStorageServiceProvider.setStorageType('sessionStorage');
//alert("Asesor: usuario: o2@mail.com contraseña: 123 y Administrador: usuario o@mail.com contraseña: 123");
$scope.iniciar=function(){
	 usSpinnerService.spin('spinner-1');
	$http.post('Modelo/servicesMincit/Sesiones/login.php', {
            usuario: $scope.user,
            clave: $scope.pass  
          
               
        }
    ).success(function (data) {
      console.log(data);
      usSpinnerService.stop('spinner-1');
      if(data.id_usuario==undefined){
       swal({
         title: 'Error de acceso',
         text: 'Verifique su conexión a internet', 
         type: 'info',
            timer: 2000
    })
      }
      if(data==0){
      	swal({
 				 title: 'Error',
 				 text: 'Usuario o contraseña incorrecta', 
 				 type: 'error',
  				  timer: 2000
		})
      }

      else{
      
      if(data==-1){
        swal({
         title: 'Imposible Acceder',
         text: 'Ya ha iniciado sesión previamente. Cierre esa sesión e intente nuevamente.', 
         type: 'info',
            timer: 2000
    })
      }
        else{
          console.log(data.privilegio);

          var usuario= new Object();
                   usuario.id_usuario=data.id_usuario;
                   usuario.nombre_usuario=data.nombre_usuario;
                   usuario.correo_usuario=data.correo;
                   usuario.privilegio_usuario=data.privilegio;

          if(data.privilegio=="ad"){ 

                   CONFIG.ROL_CURRENT_USER= 1;
                   $location.path("/Admin_inicio");
                    location.reload();

              }else if(data.privilegio=="as"){
            
                         CONFIG.ROL_CURRENT_USER= 2;
                         $location.path("/Asesor_inicio");
                          location.reload();

            }else if(data.privilegio=="en"){
              
                        CONFIG.ROL_CURRENT_USER= 3;
                        $location.path("/Entidad_inicio");
                          location.reload();
            }

            localStorageService.set("usuarioActual",usuario);
         }


      }
        
    

    }).error(function(err){
    	 usSpinnerService.stop('spinner-1');
        console.log(err);

    });
}



	$scope.irAdmin=function(){
		window.location.href='#Admin_inicio';
	}

			$scope.irAsesor=function(){
		window.location.href='#Asesor_inicio';
	}
	

		$scope.irRecuperar=function(){
			window.location.href='#recuperar_clave';
		}


		$scope.irInicio=function(){
			window.location.href='#inicio';
		}
}])
